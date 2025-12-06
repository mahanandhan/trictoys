import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForBuy, setSelectedForBuy] = useState([]);

  const navigate = useNavigate();

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://trictoys.onrender.com/api/cart", {
          withCredentials: true,
        });

        const backendItems = res.data.products.map((item) => ({
          id: item.product,
          name: item.name,
          price: item.price,
          image: item.imageUrl || "/placeholder.jpg",
          qty: item.quantity > 0 ? item.quantity : 1, // ALWAYS MIN 1
        }));

        setItems(backendItems);
        setSelectedForBuy(backendItems); // default select all
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Increase/Decrease Quantity Logic
  const changeQty = async (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.qty + delta;

    try {
      if (newQty <= 0) {
        // Remove item from cart
        await axios.post(
          "https://trictoys.onrender.com/api/cart/remove",
          { productId: id },
          { withCredentials: true }
        );

        setItems((prev) => prev.filter((it) => it.id !== id));
        setSelectedForBuy((prev) => prev.filter((it) => it.id !== id));
        return;
      }

      // Update in backend
      await axios.post(
        "https://trictoys.onrender.com/api/cart/update",
        { productId: id, quantity: newQty },
        { withCredentials: true }
      );

      // Update UI
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty: newQty } : it))
      );

      // Update buy list
      setSelectedForBuy((prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty: newQty } : it))
      );
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading)
    return <div className="p-10 text-center">Loading cart...</div>;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-sky-50 to-slate-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        
        {/* LEFT CART LIST */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
            Cart
          </h1>

          {items.length === 0 ? (
            <p className="text-slate-400 text-sm">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 md:gap-6 border border-slate-100 rounded-2xl p-4 bg-slate-50/60"
                >
                  <div className="h-20 w-20 rounded-2xl bg-sky-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-sm md:text-base font-semibold text-slate-900">
                      {item.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      ₹{item.price} per item
                    </p>
                  </div>

                  {/* Qty */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-semibold text-emerald-500">
                      ₹{item.price * item.qty}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-lg"
                      >
                        −
                      </button>

                      <span className="w-8 text-center text-sm font-semibold text-slate-800">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <aside className="w-full lg:w-80 bg-white rounded-3xl shadow-lg p-6 md:p-7 h-fit">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Items total</span>
              <span className="font-medium text-slate-800">₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Delivery</span>
              <span className="font-medium text-emerald-500">Free</span>
            </div>
          </div>

          <div className="my-4 border-t border-slate-100" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-900">Total</span>
            <span className="text-xl font-bold text-emerald-500">
              ₹{subtotal}
            </span>
          </div>

          <button
            onClick={() =>
              navigate("/payment", { state: { products: selectedForBuy } })
            }
            disabled={selectedForBuy.length === 0}
            className={`w-full py-3 rounded-full text-sm font-semibold ${
              selectedForBuy.length === 0
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-sky-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(56,189,248,0.6)]"
            }`}
          >
            Buy All
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
