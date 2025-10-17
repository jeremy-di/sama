import Notification from "../models/notification.model.js"
import notificationValidation from "../validations/notification.validation.js"

const createNotification = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = notificationValidation(body).notificationCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const notification = new Notification(body)
        const newNotification = await notification.save()
        return res.status(201).json(newNotification)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find().populate("secretary", "login").populate("appointment", "reason").populate("patient", "lastname firstname")
        return res.status(200).json(notifications)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getNotificationById = async(req,res) => {
    try {
        const notification = await Notification.findById(req.params.id).populate("secretary", "login").populate("appointment", "reason").populate("patient", "lastname firstname")
        if(!notification){
            return res.status(404).json({message: "notification doesn't exist"})
        }
        return res.status(200).json(notification)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateNotification = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = notificationValidation(body).notificationUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedNotification){
            res.status(404).json({message: "notification doesn't exist"})
        }
        return res.status(200).json(updatedNotification)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteNotification = async(req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id)
        if(!notification){
            return res.status(404).json({message: "notification doesn't exist"})
        }
        return res.status(200).json({message: "notification has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification }