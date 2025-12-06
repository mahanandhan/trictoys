import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routers/user.router.js';
import cors from 'cors';
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import addressRouter from './routers/address.router.js';
import orderRouter from './routers/order.router.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://trictoys.vercel.app", "https://trictoys-admin.vercel.app"], // your frontend origin
    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', router);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req, res) => {
  res.send('TricToys Backend is running');
});

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port 5000');
});