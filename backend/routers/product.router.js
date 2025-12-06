import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/allproducts', getAllProducts);
productRouter.get("/:productId", getProductById);
productRouter.post('/add', protectRoute, addProduct)
productRouter.put("/update/:productId", protectRoute, updateProduct);
productRouter.delete('/delete/:productId', protectRoute, deleteProduct);
export default productRouter