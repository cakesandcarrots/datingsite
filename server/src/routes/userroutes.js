import express from 'express';
import multer from 'multer';
import { getDashboardData, updateUserStatus, getCurrentUser, getUserById, updateUser } from '../controllers/usercontroller.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png and .jpeg format allowed!'), false);
    }
  }
});

router.get('/dashboard', getDashboardData);
router.put('/:userId/status', updateUserStatus);
router.get('/current', getCurrentUser);
router.get('/:userId', getUserById);
router.put('/:userId', upload.single('profilePicture'), updateUser);

export default router;