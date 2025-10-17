
import { Router } from "express";
import { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from "../controllers/patient.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, createPatient)
router.get('/all', getAllPatients)
router.get('/:id', getPatientById)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)

export default router