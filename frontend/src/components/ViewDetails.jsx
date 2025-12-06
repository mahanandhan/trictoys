import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://trictoys.onrender.com/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!product) return <div className="text-center p-10">Product not found</div>;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-sky-50 to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-10">
        
        {/* Left: Product Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full aspect-square bg-sky-50 rounded-3xl flex items-center justify-center">
            <img
              src={product.imageUrl || "/placeholder.jpg"}
              alt={product.productname}
              className="max-h-80 object-contain"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">
            {product.productname}
          </h1>

          {/* Price */}
          <div className="text-2xl font-bold text-emerald-500 mb-2">
            ₹{product.price}
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className="font-bold text-slate-700">
              Stock: {product.stock}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Description
            </h2>
            <p className="text-sm text-slate-500">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Info */}
          <div className="text-xs text-slate-500 space-y-1">
            <p>• Free delivery for orders any order</p>
            <p>• No Return Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
