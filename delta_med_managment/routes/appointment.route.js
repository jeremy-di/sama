
import { Router } from "express";
import { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment, getAppointmentsByPatientId } from "../controllers/appointment.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, createAppointment)
router.get('/all', getAllAppointments)
router.get('/all/:id', getAppointmentsByPatientId)
router.get('/:id', getAppointmentById)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

export default router