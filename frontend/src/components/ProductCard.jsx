import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if product is already in cart
  useEffect(() => {
    const checkCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });
        // res.data.products should be an array of products in cart
        const cartProducts = res.data.products || [];
        const exists = cartProducts.some((p) => p.product === product._id);
        setInCart(exists);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log("User not logged in, cannot fetch cart");
        } else {
          console.error("Failed to check cart:", err);
        }
      }
    };
    checkCart();
  }, [product._id]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      setInCart(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("You must be logged in to add items to cart.");
      } else {
        console.error("Failed to add to cart:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId: product._id },
        { withCredentials: true }
      );
      setInCart(false);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <div className="rounded-2xl h-40 mb-4 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl">{product.image || "🧸"}</span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900">{product.productname}</h3>
        <p className="text-xs text-slate-500 mt-1">₹{product.price}</p>
        <p className="text-xs text-slate-500 mt-1">{product.stock} in stock</p>
      </div>

      <div className="mt-4 flex gap-2">
        {inCart ? (
          <button
            onClick={handleRemoveFromCart}
            disabled={loading}
            className="flex-1 py-2 rounded-full bg-red-500 text-white text-xs font-semibold hover:brightness-110"
          >
            {loading ? "Removing..." : "Remove from Cart"}
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 py-2 rounded-full bg-teal-400 text-white text-xs font-semibold hover:brightness-110"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        )}

        <button
          onClick={() => navigate("/viewdetails")}
          className="flex-1 py-2 rounded-full border border-teal-300 text-teal-500 text-xs font-semibold bg-white hover:bg-teal-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
