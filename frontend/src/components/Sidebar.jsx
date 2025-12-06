import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop sidebar (full height) */}
      <aside className="hidden md:flex h-screen w-60 bg-[#151823] text-slate-100 flex-col">
        <div className="h-16 flex items-center px-5 border-b border-white/5">
          <span className="text-pink-300 font-semibold text-lg">
            TricToys
          </span>
        </div>

        <nav className="flex-1 py-4 text-sm">
          <button
            className="w-full flex items-center gap-3 px-5 py-3 bg-white/10 text-white"
            onClick={() => navigate("/address")}
          >
            <span>🏠</span>
            <span>Address</span>
          </button>

          <button onClick={() => navigate('/orders')} className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5">
            <span>🛒</span>
            <span>orders</span>
          </button>

          <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5">
            <span>👤</span>
            <span>Profile</span>
          </button>

          {/* <button className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5">
            <span>🎁</span>
            <span>Promotions</span>
          </button> */}
        </nav>

        <div className="px-5 py-4 text-xs text-slate-400 border-t border-white/5">
          © 2025 TricToys
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex md:hidden bg-[#151823] text-slate-100 justify-around py-2 text-xs">
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => navigate("/dashboard")}
        >
          <span>🏠</span>
          <span>Home</span>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => navigate("/address")}
        >
          <span>📍</span>
          <span>Address</span>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => navigate("/cart")}
        >
          <span>🛒</span>
          <span>orders</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => navigate("/profile")}>
          <span>👤</span>
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
