import express from 'express'
import { test, updateUser,deleteUser } from '../controllers/user.controllers.js';
import { verfiyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test)
router.post('/update/:id',verfiyToken,updateUser)
router.delete('/delete/:id',verfiyToken,deleteUser)
export default router