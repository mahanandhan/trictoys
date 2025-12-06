// Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 border-b border-slate-100 bg-white rounded-t-3xl">
      <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100">
        ☰
      </button>

      <div className="flex items-center gap-4 text-slate-500">
        <button className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
          🔔
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <span className="text-sm font-medium text-slate-800">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
