import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { handleLogin } from '../controllers/authController.js';

const router = express.Router();

// create user profile on first login
router.post('/sign-up', authMiddleware, handleLogin);

export default router;