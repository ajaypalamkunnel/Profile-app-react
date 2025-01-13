import express from 'express'
import { dashboard, deleteUser, signin, updateUser } from '../controllers/admin.controllers.js'


const router = express.Router()

router.post('/signin',signin)
router.get('/dashboard',dashboard)
router.post('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)

export default router