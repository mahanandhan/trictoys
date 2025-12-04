import React from "react";

const ViewDetails = () => {
  // later you can get this from props / route params / API
  const product = {
    name: "Remote Control Car",
    price: 1299,
    description:
      "High‑speed remote control car with soft rubber wheels, LED lights, and durable body. Perfect for indoor and outdoor play.",
    image: "/toy-rc-car.png", // replace with your actual image path
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-sky-50 to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Left: product image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full aspect-square bg-sky-50 rounded-3xl flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          </div>
        </div>

        {/* Right: details */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
            {product.name}
          </h1>

          <p className="text-sm text-slate-500 mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-emerald-500">
              ₹{product.price}
            </span>
            <span className="text-xs text-slate-400">incl. all taxes</span>
          </div>

          {/* Quantity + actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-slate-200 rounded-full overflow-hidden text-sm">
              <button className="px-3 py-2 text-slate-600 hover:bg-slate-100">
                −
              </button>
              <span className="px-4 py-2 border-x border-slate-200">
                1
              </span>
              <button className="px-3 py-2 text-slate-600 hover:bg-slate-100">
                +
              </button>
            </div>

            <button className="flex-1 py-3 rounded-full bg-lime-400 text-slate-900 font-semibold text-sm hover:brightness-110 shadow-[0_0_20px_rgba(190,242,100,0.7)]">
              Add to Cart
            </button>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <p>• Free delivery on orders above ₹999.</p>
            <p>• 7‑day return policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
