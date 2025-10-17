
import { Router } from "express";
import { createHealthInsurance, getAllHealthInsurances, getHealthInsuranceById, updateHealthInsurance, deleteHealthInsurance } from "../controllers/healthInsurance.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, createHealthInsurance)
router.get('/all', getAllHealthInsurances)
router.get('/:id', getHealthInsuranceById)
router.put('/:id', updateHealthInsurance)
router.delete('/:id', deleteHealthInsurance)

export default router