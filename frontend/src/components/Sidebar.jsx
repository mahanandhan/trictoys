import React from "react";

const Sidebar = () => {
  return (
    <aside className="h-full w-60 bg-[#151823] text-slate-100 flex flex-col">
      <div className="h-16 flex items-center px-5 border-b border-white/5">
        <span className="text-pink-300 font-semibold text-lg">
          TricToys
        </span>
      </div>

      <nav className="flex-1 py-4 text-sm">
        <button className="w-full flex items-center gap-3 px-5 py-3 bg-white/10 text-white">
          <span>🏠</span>
          <span>Categories</span>
        </button>

        <button className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5">
          <span>🏷️</span>
          <span>Brands</span>
        </button>

        <button className="w-full flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-white/5">
          <span>🎁</span>
          <span>Promotions</span>
        </button>
      </nav>

      <div className="px-5 py-4 text-xs text-slate-400 border-t border-white/5">
        © 2025 TricToys
      </div>
    </aside>
  );
};

export default Sidebar;
