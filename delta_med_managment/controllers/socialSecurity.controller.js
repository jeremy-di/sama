import SocialSecurity from "../models/socialSecurity.model.js"
import socialSecurityValidation from "../validations/socialSecurity.validation.js"

const createSocialSecurity = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = socialSecurityValidation(body).socialSecurityCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        body.secretary = req.user.id
        const socialSecurity = new SocialSecurity(body)
        const newSocialSecurity = await socialSecurity.save()
        return res.status(201).json(newSocialSecurity)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllSocialSecuritys = async(req, res) => {
    try {
        const socialSecuritys = await SocialSecurity.find().populate("secretary", "login role")
        return res.status(200).json(socialSecuritys)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getSocialSecurityById = async(req,res) => {
    try {
        const socialSecurity = await SocialSecurity.findById(req.params.id).populate("secretary", "login role")
        if(!socialSecurity){
            return res.status(404).json({message: "socialSecurity doesn't exist"})
        }
        return res.status(200).json(socialSecurity)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateSocialSecurity = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = socialSecurityValidation(body).socialSecurityUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedSocialSecurity = await SocialSecurity.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedSocialSecurity){
            res.status(404).json({message: "socialSecurity doesn't exist"})
        }
        return res.status(200).json(updatedSocialSecurity)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteSocialSecurity = async(req, res) => {
    try {
        const socialSecurity = await SocialSecurity.findByIdAndDelete(req.params.id)
        if(!socialSecurity){
            return res.status(404).json({message: "socialSecurity doesn't exist"})
        }
        return res.status(200).json({message: "socialSecurity has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createSocialSecurity, getAllSocialSecuritys, getSocialSecurityById, updateSocialSecurity, deleteSocialSecurity }