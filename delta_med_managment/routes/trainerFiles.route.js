
import { Router } from "express";
import { createTrainerFiles, getAllTrainerFiless, getTrainerFilesByPatientId, getTrainerFilesById, deleteTrainerFiles } from "../controllers/trainerFiles.controller.js"
import { upload } from "../middlewares/multerTrainer.js"

const router = Router()

router.post('/new', upload.single('name'), createTrainerFiles)
router.get('/all', getAllTrainerFiless)
router.get('/all/:id', getTrainerFilesByPatientId)
router.get('/:id', getTrainerFilesById)
router.delete('/:id', deleteTrainerFiles)

export default router