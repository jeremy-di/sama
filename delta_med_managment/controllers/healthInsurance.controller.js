import HealthInsurance from "../models/healthInsurance.model.js"
import healthInsuranceValidation from "../validations/healthInsurance.validation.js"

const createHealthInsurance = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = healthInsuranceValidation(body).healthInsuranceCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const healthInsurance = new HealthInsurance(body)
        const newHealthInsurance = await healthInsurance.save()
        return res.status(201).json(newHealthInsurance)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllHealthInsurances = async(req, res) => {
    try {
        const healthInsurances = await HealthInsurance.find().populate("secretary", "login role")
        return res.status(200).json(healthInsurances)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getHealthInsuranceById = async(req,res) => {
    try {
        const healthInsurance = await HealthInsurance.findById(req.params.id).populate("secretary", "login role")
        if(!healthInsurance){
            return res.status(404).json({message: "healthInsurance doesn't exist"})
        }
        return res.status(200).json(healthInsurance)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateHealthInsurance = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = healthInsuranceValidation(body).healthInsuranceUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedHealthInsurance = await HealthInsurance.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedHealthInsurance){
            res.status(404).json({message: "healthInsurance doesn't exist"})
        }
        return res.status(200).json(updatedHealthInsurance)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteHealthInsurance = async(req, res) => {
    try {
        const healthInsurance = await HealthInsurance.findByIdAndDelete(req.params.id)
        if(!healthInsurance){
            return res.status(404).json({message: "healthInsurance doesn't exist"})
        }
        return res.status(200).json({message: "healthInsurance has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createHealthInsurance, getAllHealthInsurances, getHealthInsuranceById, updateHealthInsurance, deleteHealthInsurance }