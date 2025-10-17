
import User from "../models/user.model.js"
import userValidation from "../validations/user.validation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }
        const {error} = userValidation(body).userCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const searchUser = await User.findOne({login: body.login})
        if(searchUser){
            return res.status(401).json({message: "user already exists"})
        }
        const user = new User(body)
        const newUser = await user.save()
        return res.status(201).json(newUser)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const login = async(req, res) => {
    try {
        const {login, password } = req.body
        const { error } = userValidation(req.body).userLogin
    
        if(error){
            return res.status(401).json(error.details[0].message)
        }

        const user = await User.findOne({ login: login})
        if(!user){
            return res.status(400).json({message: "invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"})
        }
        res.status(200).json({
            message: user.login+" is connected",
            token: jwt.sign({ id: user._id, login:  user.login }, process.env.SECRET_KEY, { expiresIn: "12h" }),
            role: user.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getUserById = async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateUser = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = userValidation(body).userUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedUser){
            res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({message: "user doesn't exist"})
        }
        return res.status(200).json({message: "user a été supprimé"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateMyPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        const userId = req.user?.id
        if (!userId) {
        return res.status(400).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId).select("+password");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "L'ancien mot de passe est incorrect" });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Le mot de passe à bien été modifié" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
}

export { register, login, getAllUsers, getUserById, updateUser, deleteUser, updateMyPassword, getMe }