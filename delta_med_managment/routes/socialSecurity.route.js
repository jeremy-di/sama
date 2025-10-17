
import { Router } from "express";
import { createSocialSecurity, getAllSocialSecuritys, getSocialSecurityById, updateSocialSecurity, deleteSocialSecurity } from "../controllers/socialSecurity.controller.js"
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/new', auth, createSocialSecurity)
router.get('/all', getAllSocialSecuritys)
router.get('/:id', getSocialSecurityById)
router.put('/:id', updateSocialSecurity)
router.delete('/:id', deleteSocialSecurity)

export default router