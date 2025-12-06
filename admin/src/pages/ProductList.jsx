import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [loading, setLoading] = useState(false);

    // Edit Modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        _id: "",
        productname: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
    });

    // ================================
    // FETCH ALL PRODUCTS
    // ================================
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/products/allproducts",
                { withCredentials: true }
            );
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ================================
    // SELECT / UNSELECT
    // ================================
    const toggleProductSelection = (id) => {
        const updated = new Set(selectedProducts);
        updated.has(id) ? updated.delete(id) : updated.add(id);
        setSelectedProducts(updated);
    };

    // ================================
    // DELETE ONE PRODUCT
    // ================================
    const deleteProduct = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/products/delete/${id}`,
                { withCredentials: true }
            );
            fetchProducts();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ================================
    // DELETE SELECTED
    // ================================
    const deleteSelectedProducts = async () => {
        for (let id of selectedProducts) {
            await axios.delete(
                `http://localhost:5000/api/products/delete/${id}`,
                { withCredentials: true }
            );
        }
        setSelectedProducts(new Set());
        fetchProducts();
    };

    // ================================
    // OPEN EDIT MODAL
    // ================================
    const openEditModal = (product) => {
        setEditData({
            _id: product._id,
            productname: product.productname,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl || ""
        });
        setEditModalOpen(true);
    };

    // ================================
    // UPDATE PRODUCT
    // ================================
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/products/update/${editData._id}`,
                editData,
                { withCredentials: true }
            );
            setEditModalOpen(false);
            fetchProducts();
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#EEF3FB]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                {loading && (
                    <p className="text-center text-lg mt-4">Loading products...</p>
                )}

                <main className="flex-1 px-4 md:px-8 py-6 flex justify-center">
                    <section className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h1 className="text-xl font-semibold">
                                Products ({products.length})
                            </h1>
                            <button
                                onClick={deleteSelectedProducts}
                                disabled={selectedProducts.size === 0}
                                className={`px-4 py-2 rounded-full text-white text-xs font-semibold transition 
                                    ${selectedProducts.size === 0 ? "bg-red-300" : "bg-red-500 hover:bg-red-600"}`}
                            >
                                Delete Selected ({selectedProducts.size})
                            </button>
                        </div>

                        {/* Products */}
                        <div className="divide-y divide-slate-100">
                            {products.map((p) => (
                                <div
                                    key={p._id}
                                    className="grid grid-cols-[50px_2fr_1.5fr_1fr_1fr_1.5fr_0.8fr_0.8fr] items-center px-4 py-3"
                                >
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.has(p._id)}
                                            onChange={() => toggleProductSelection(p._id)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 font-semibold">
                                        <img
                                            src={p.imageUrl || "https://placehold.co/60x60"}
                                            alt={p.productname}
                                            className="h-10 w-10 rounded-xl object-cover"
                                        />
                                        <span>{p.productname}</span>
                                    </div>

                                    <div>{p.category || "N/A"}</div>

                                    <div className="text-center">{p.stock}</div>

                                    <div className="text-right">₹{p.price}</div>

                                    <div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                p.stock === 0
                                                    ? "bg-red-200 text-red-700"
                                                    : "bg-green-200 text-green-700"
                                            }`}
                                        >
                                            {p.stock === 0 ? "Out of Stock" : "In Stock"}
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => openEditModal(p)}
                                            className="py-1 px-3 bg-slate-100 rounded-full hover:bg-slate-200 transition"
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => deleteProduct(p._id)}
                                            className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>

            {/* ================================
               BEAUTIFUL EDIT MODAL
            ================================= */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <form
                        onSubmit={handleUpdateProduct}
                        className="bg-white w-[400px] p-6 rounded-2xl shadow-2xl border border-slate-200 animate-fadeIn"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-5 text-center">
                            ✏️ Edit Product
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Product Name</label>
                                <input
                                    type="text"
                                    value={editData.productname}
                                    onChange={(e) => setEditData({ ...editData, productname: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-300 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-300 outline-none h-24 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                                <input
                                    type="number"
                                    value={editData.price}
                                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-300 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">Stock</label>
                                <input
                                    type="number"
                                    value={editData.stock}
                                    onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-300 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">Image URL</label>
                                <input
                                    type="text"
                                    value={editData.imageUrl}
                                    onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-300 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={() => setEditModalOpen(false)}
                                className="px-4 py-2 bg-slate-200 rounded-xl hover:bg-slate-300 font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
