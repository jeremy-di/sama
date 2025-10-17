
import SecretaryFiles from "../models/secretaryFiles.model.js"
import secretaryFilesValidation from "../validations/secretaryFiles.validation.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createSecretaryFiles = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            if(req.file){fs.unlinkSync("./secretary_files/"+req.file.filename)}
            return res.status(400).json({message: "No data in the request"})
        }
        if(req.file){
            body.name = req.protocol+'://'+req.get("host")+'/secretary_files/'+req.file.filename
        }
        const {error} = secretaryFilesValidation(body).secretaryFilesCreate
        if(error){
            if(req.file){fs.unlinkSync("./secretary_files/"+req.file.filename)}
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const secretaryFiles = new SecretaryFiles(body)
        const newSecretaryFiles = await secretaryFiles.save()
        return res.status(201).json(newSecretaryFiles)        
    } catch (error) {
        console.log(error)
        if(req.file){fs.unlinkSync("./secretary_files/"+req.file.filename)}
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllSecretaryFiless = async(req, res) => {
    try {
        const secretaryFiless = await SecretaryFiles.find().populate("secretary", "login").populate("patient", "lastname firstname")
        return res.status(200).json(secretaryFiless)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getSecretaryFilesByPatientId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing patient id" });
    }

    const files = await SecretaryFiles.find({ patient: id }).populate("secretary", "login").populate("patient", "lastname firstname")
      .sort({ createdAt: -1 });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "Aucun fichier trouvé pour ce patient" });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSecretaryFilesById = async(req,res) => {
    try {
        const secretaryFiles = await SecretaryFiles.findById(req.params.id)
        if(!secretaryFiles){
            return res.status(404).json({message: "secretaryFiles doesn't exist"})
        }
        return res.status(200).json(secretaryFiles)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteSecretaryFiles = async(req, res) => {
    try {
        const secretaryFiles = await SecretaryFiles.findById(req.params.id)
        if(!secretaryFiles){
            return res.status(404).json({message: "secretaryFiles doesn't exist"})
        }
        if(secretaryFiles.name){
            const oldPath = path.join(__dirname, '../secretary_files/', secretaryFiles.name.split('/').at(-1))
            if(fs.existsSync(oldPath)) {fs.unlinkSync(oldPath)}
        }
        await secretaryFiles.deleteOne()
        return res.status(200).json({message: "secretaryFiles has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createSecretaryFiles, getAllSecretaryFiless, getSecretaryFilesByPatientId, getSecretaryFilesById, deleteSecretaryFiles }