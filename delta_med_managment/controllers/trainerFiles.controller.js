
import TrainerFiles from "../models/trainerFiles.model.js"
import trainerFilesValidation from "../validations/trainerFiles.validation.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createTrainerFiles = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            if(req.file){fs.unlinkSync("./trainer_files/"+req.file.filename)}
            return res.status(400).json({message: "No data in the request"})
        }
        if(req.file){
            body.name = req.protocol+'://'+req.get("host")+'/trainer_files/'+req.file.filename
        }
        const {error} = trainerFilesValidation(body).trainerFilesCreate
        if(error){
            if(req.file){fs.unlinkSync("./trainer_files/"+req.file.filename)}
            return res.status(401).json(error.details[0].message)
        }
        const trainerFiles = new TrainerFiles(body)
        const newTrainerFiles = await trainerFiles.save()
        return res.status(201).json(newTrainerFiles)        
    } catch (error) {
        console.log(error)
        if(req.file){fs.unlinkSync("./trainer_files/"+req.file.filename)}
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllTrainerFiless = async(req, res) => {
    try {
        const trainerFiless = await TrainerFiles.find().populate("patient", "lastname firstname")
        return res.status(200).json(trainerFiless)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getTrainerFilesByPatientId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing patient id" });
    }

    const files = await TrainerFiles.find({ patient: id }).populate("patient", "lastname firstname")
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

const getTrainerFilesById = async(req,res) => {
    try {
        const trainerFiles = await TrainerFiles.findById(req.params.id)
        if(!trainerFiles){
            return res.status(404).json({message: "trainerFiles doesn't exist"}).populate("patient", "lastname firstname")
        }
        return res.status(200).json(trainerFiles)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteTrainerFiles = async(req, res) => {
    try {
        const trainerFiles = await TrainerFiles.findById(req.params.id)
        if(!trainerFiles){
            return res.status(404).json({message: "trainerFiles doesn't exist"})
        }
        if(trainerFiles.name){
            const oldPath = path.join(__dirname, '../trainer_files/', trainerFiles.name.split('/').at(-1))
            if(fs.existsSync(oldPath)) {fs.unlinkSync(oldPath)}
        }
        await trainerFiles.deleteOne()
        return res.status(200).json({message: "trainerFiles has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createTrainerFiles, getAllTrainerFiless, getTrainerFilesByPatientId, getTrainerFilesById, deleteTrainerFiles }