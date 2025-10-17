
import { Router } from "express";
import { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } from "../controllers/notification.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, createNotification)
router.get('/all', getAllNotifications)
router.get('/:id', getNotificationById)
router.put('/:id', updateNotification)
router.delete('/:id', deleteNotification)

export default router