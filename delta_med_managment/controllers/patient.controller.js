import Patient from "../models/patient.model.js"
import patientValidation from "../validations/patient.validation.js"

const createPatient = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = patientValidation(body).patientCreate
        if(error){
            return res.status(400).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const patient = new Patient(body)
        const newPatient = await patient.save()
        return res.status(201).json(newPatient)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllPatients = async(req, res) => {
    try {
        const patients = await Patient.find().populate("socialSecurity", "name").populate("healthInsurance", "name").populate("secretary", "login").populate("primaryDoctor", "lastname firstname")
        return res.status(200).json(patients)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getPatientById = async(req,res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate("socialSecurity", "name").populate("healthInsurance", "name").populate("secretary", "login").populate("primaryDoctor", "lastname firstname")
        if(!patient){
            return res.status(404).json({message: "patient doesn't exist"})
        }
        return res.status(200).json(patient)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updatePatient = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = patientValidation(body).patientUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedPatient){
            res.status(404).json({message: "patient doesn't exist"})
        }
        return res.status(200).json(updatedPatient)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deletePatient = async(req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id)
        if(!patient){
            return res.status(404).json({message: "patient doesn't exist"})
        }
        return res.status(200).json({message: "patient has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient }