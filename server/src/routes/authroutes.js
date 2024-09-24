import express from 'express';
import { register, login, logout, checkAuth } from '../controllers/authcontroller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', checkAuth);

export default router;