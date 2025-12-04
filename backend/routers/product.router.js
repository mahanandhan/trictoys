import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { addProduct, deleteProduct, getAllProducts } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/allproducts', getAllProducts);
productRouter.post('/add', protectRoute, addProduct)
productRouter.delete('/delete/:productId', protectRoute, deleteProduct);
export default productRouter