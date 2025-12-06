// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <aside className="hidden md:flex h-screen w-64 bg-[#F3313B] text-white flex-col">
      <div className="h-16 flex items-center px-6 text-lg font-semibold">
        Admin Dashboard
      </div>

      <nav className="flex-1 mt-4 text-sm space-y-1">
        <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-6 py-3 bg-white/15 rounded-r-full">
          <span>🏠</span>
          <span>Dashboard</span>
        </button>
        <button onClick={() => navigate("/productlist")} className="w-full flex items-center gap-3 px-6 py-3 opacity-80 hover:bg-white/10">
          <span>🧸</span>
          <span>Products</span>
        </button>
        <button onClick={() => navigate("/addproduct")} className="w-full flex items-center gap-3 px-6 py-3 opacity-80 hover:bg-white/10">
          <span>📦</span>
          <span>Add Product</span>
        </button>
        <button className="w-full flex items-center gap-3 px-6 py-3 opacity-80 hover:bg-white/10">
          <span>👤</span>
          <span>Users</span>
        </button>
        <button className="w-full flex items-center gap-3 px-6 py-3 opacity-80 hover:bg-white/10">
          <span>📊</span>
          <span>Reports</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
