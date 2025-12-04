import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/allproducts", { withCredentials: true });
        // If your backend returns products in res.data.products, adjust accordingly
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-linear-to-br from-sky-50 to-slate-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Toys</h1>
              <p className="text-xs text-slate-500 mt-1">
                Choose from our latest collection of professional toys.
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <button className="px-4 py-2 rounded-full bg-sky-500 text-white font-semibold">
                All
              </button>
              <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600">
                Cars
              </button>
              <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600">
                Plush
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading products...</p>
          ) : (
            <section className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
