import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddProductPage = () => {
  const [form, setForm] = useState({
    productname: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        form,
        { withCredentials: true }
      );
      console.log("Product saved:", res.data);
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#EEF3FB]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-8 py-6">
          <div className="flex gap-6 h-full">
            <div className="flex-1 bg-white rounded-3xl shadow-2xl px-6 md:px-10 py-8">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                Add Product
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productname"
                    value={form.productname}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write a short description..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.png"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-3 rounded-full bg-[#0F7BFF] text-white font-semibold hover:brightness-110 transition"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;
