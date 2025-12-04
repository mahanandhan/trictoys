import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { productname, description, price, imageUrl, stock } = req.body;
        if(!productname || !description || !price || !stock){
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = new Product({
            productname,
            description,
            price,
            imageUrl,
            stock
        })
        const isExisting = await Product.findOne({ productname });
        if(isExisting){
            return  res.status(400).json({ message: 'Product already exists' });
        }
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}