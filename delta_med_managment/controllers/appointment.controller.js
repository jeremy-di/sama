import Appointment from "../models/appointment.model.js"
import appointmentValidation from "../validations/appointment.validation.js"

const createAppointment = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = appointmentValidation(body).appointmentCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const appointment = new Appointment(body)
        const newAppointment = await appointment.save()
        return res.status(201).json(newAppointment)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllAppointments = async(req, res) => {
    try {
        const appointments = await Appointment.find().populate("patient", "lastname firstname").populate("doctor", "lastname firstname").populate("secretary", "login")
        return res.status(200).json(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getAppointmentById = async(req,res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate("patient", "lastname firstname").populate("doctor", "lastname firstname")
        if(!appointment){
            return res.status(404).json({message: "appointment doesn't exist"})
        }
        return res.status(200).json(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateAppointment = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = appointmentValidation(body).appointmentUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedAppointment){
            res.status(404).json({message: "appointment doesn't exist"})
        }
        return res.status(200).json(updatedAppointment)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id)
        if(!appointment){
            return res.status(404).json({message: "appointment doesn't exist"})
        }
        return res.status(200).json({message: "appointment has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment }