import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <header className="h-16 w-full bg-white/90 backdrop-blur flex items-center justify-between px-8 border-b border-slate-200">
      {/* Left: logo + main nav */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold">
            PT
          </div>
          <span className="font-semibold text-slate-900">
            TricToys
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button className="text-slate-900">Home</button>
          <button className="text-sky-500 border-b-2 border-sky-500 pb-1">
            Toys
          </button>
          <button className="text-slate-500 hover:text-slate-900">Sales</button>
          <button className="text-slate-500 hover:text-slate-900">
            Account
          </button>
        </nav>
      </div>

      {/* Right: icons + user */}
      <div className="flex items-center gap-4 text-slate-500">
        <button className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
          🔔
        </button>
        <button onClick={() => navigate('/cart')} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
          🛒
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <span className="text-sm font-medium text-slate-700">Viter</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
