import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { addAddress, getAddress } from '../controllers/address.controller.js';

const addressRouter = express.Router();
addressRouter.get('/getAddress', protectRoute, getAddress);
addressRouter.post('/addAddress', protectRoute, addAddress);
export default addressRouter;