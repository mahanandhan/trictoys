import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String },
      quantity: { type: Number, required: true, min: 0, default: 0 } // <-- FIXED
    }
  ]
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
