import express from 'express';
import { getUserProfile, login, logout, signup } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();
router.get('/profile', protectRoute, getUserProfile)
router.post('/signup', signup)
router.post('/login', login);
router.post('/logout', logout)
export default router;