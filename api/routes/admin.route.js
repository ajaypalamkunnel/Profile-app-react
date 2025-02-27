import express from 'express'
import { addNewProfile, dashboard, deleteUser, signin, signout, updateUser } from '../controllers/admin.controllers.js'


const router = express.Router()

router.post('/signin',signin)
router.get('/dashboard',dashboard)
router.put('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)
router.get('/signout/:id',signout)
router.post('/add-profile',addNewProfile)

export default router