import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://trictoys.onrender.com/api/orders/myorders",
        { withCredentials: true }
      );
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch orders failed", err);
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;

    try {
      await axios.delete(
        `https://trictoys.onrender.com/api/orders/remove/${id}`,
        { withCredentials: true }
      );
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusClass = (status) => {
    if (status === "Delivered")
      return "bg-emerald-500 text-white";
    if (status === "Pending")
      return "bg-orange-400 text-white";
    if (status === "Cancelled")
      return "bg-red-500 text-white";
    return "bg-slate-300 text-slate-800";
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-linear-to-br from-sky-400 via-sky-200 to-sky-500 px-4 py-8">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-4xl shadow-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">
          Past Toy Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-sm text-slate-600">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between gap-4 bg-white rounded-3xl shadow-sm px-4 md:px-6 py-4"
              >
                {/* Left: toy icon + basic info */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl">
                    🚗
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-slate-900">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {order.products
                        .map((p) => `${p.name} × ${p.quantity}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                {/* Middle: total price */}
                <div className="hidden md:block text-right">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{order.totalAmount}
                  </p>
                </div>

                {/* Right: status + cancel */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={
                      "px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold " +
                      statusClass(order.status)
                    }
                  >
                    {order.status}
                  </span>

                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="px-3 py-1 rounded-full text-xs md:text-sm bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
