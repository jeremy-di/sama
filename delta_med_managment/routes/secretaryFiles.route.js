
import { Router } from "express";
import { createSecretaryFiles, getAllSecretaryFiless, getSecretaryFilesByPatientId, getSecretaryFilesById, deleteSecretaryFiles } from "../controllers/secretaryFiles.controller.js"
import { upload } from "../middlewares/multerSecretary.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, upload.single('name'), createSecretaryFiles)
router.get('/all', getAllSecretaryFiless)
router.get('/all/:id', getSecretaryFilesByPatientId)
router.get('/:id', getSecretaryFilesById)
router.delete('/:id', deleteSecretaryFiles)

export default router