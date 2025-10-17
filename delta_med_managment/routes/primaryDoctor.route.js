
import { Router } from "express";
import { createPrimaryDoctor, getAllPrimaryDoctors, getPrimaryDoctorById, updatePrimaryDoctor, deletePrimaryDoctor } from "../controllers/primaryDoctor.controller.js"
import auth from "../middlewares/auth.js"

const router = Router()

router.post('/new', auth, createPrimaryDoctor)
router.get('/all', getAllPrimaryDoctors)
router.get('/:id', getPrimaryDoctorById)
router.put('/:id', updatePrimaryDoctor)
router.delete('/:id', deletePrimaryDoctor)

export default router