import PrimaryDoctor from "../models/primaryDoctor.model.js"
import primaryDoctorValidation from "../validations/primaryDoctor.validation.js"

const createPrimaryDoctor = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = primaryDoctorValidation(body).primaryDoctorCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const primaryDoctor = new PrimaryDoctor(body)
        const newPrimaryDoctor = await primaryDoctor.save()
        return res.status(201).json(newPrimaryDoctor)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllPrimaryDoctors = async(req, res) => {
    try {
        const primaryDoctors = await PrimaryDoctor.find().populate("secretary", "login")
        return res.status(200).json(primaryDoctors)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getPrimaryDoctorById = async(req,res) => {
    try {
        const primaryDoctor = await PrimaryDoctor.findById(req.params.id).populate("secretary", "login")
        if(!primaryDoctor){
            return res.status(404).json({message: "primaryDoctor doesn't exist"})
        }
        return res.status(200).json(primaryDoctor)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updatePrimaryDoctor = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = primaryDoctorValidation(body).primaryDoctorUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedPrimaryDoctor = await PrimaryDoctor.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedPrimaryDoctor){
            res.status(404).json({message: "primaryDoctor doesn't exist"})
        }
        return res.status(200).json(updatedPrimaryDoctor)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deletePrimaryDoctor = async(req, res) => {
    try {
        const primaryDoctor = await PrimaryDoctor.findByIdAndDelete(req.params.id)
        if(!primaryDoctor){
            return res.status(404).json({message: "primaryDoctor doesn't exist"})
        }
        return res.status(200).json({message: "primaryDoctor has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createPrimaryDoctor, getAllPrimaryDoctors, getPrimaryDoctorById, updatePrimaryDoctor, deletePrimaryDoctor }