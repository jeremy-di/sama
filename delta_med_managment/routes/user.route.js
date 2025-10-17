
import { Router } from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser, updateMyPassword, getMe } from "../controllers/user.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/all', getAllUsers)
router.get('/profil/me', auth, getMe)
router.patch('/updatemypass', auth, updateMyPassword)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router