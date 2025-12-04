import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

export default Product;