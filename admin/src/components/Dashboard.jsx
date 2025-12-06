// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all", {
        withCredentials: true,
      });
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  // Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#EEF3FB]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-8 py-6 space-y-6">
          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#F3313B] text-white px-5 py-4 shadow-md">
              <p className="text-sm opacity-90">Total Orders</p>
              <p className="mt-2 text-2xl font-bold">{orders.length}</p>
            </div>

            <div className="rounded-2xl bg-[#0F7BFF] text-white px-5 py-4 shadow-md">
              <p className="text-sm opacity-90">Users</p>
              <p className="mt-2 text-2xl font-bold">
                {new Set(orders.map((o) => o.user.email)).size}
              </p>
            </div>

            <div className="rounded-2xl bg-[#1679F2] text-white px-5 py-4 shadow-md">
              <p className="text-sm opacity-90">Revenue</p>
              <p className="mt-2 text-2xl font-bold">
                ₹
                {orders
                  .reduce((total, o) => total + o.totalAmount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </section>

          {/* Orders Table */}
          <section className="bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Orders
              </h2>
              <button
                onClick={() => fetchOrders()}
                className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-slate-50"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="text-center py-6">Loading...</p>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#F3313B] text-white text-left">
                      <th className="px-6 py-3 w-12">#</th>
                      <th className="px-6 py-3">Products</th>
                      <th className="px-6 py-3">Qty</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Address</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="px-6 py-3">{index + 1}</td>

                        {/* Product Names */}
                        <td className="px-6 py-3">
                          {order.products.map((p) => p.name).join(", ")}
                        </td>

                        {/* Quantities */}
                        <td className="px-6 py-3">
                          {order.products.map((p) => p.quantity).join(", ")}
                        </td>

                        {/* User Email */}
                        <td className="px-6 py-3">{order.user.email}</td>

                        {/* Phone Number */}
                        <td className="px-6 py-3">
                          {order.address?.mobilenumber || "N/A"}
                        </td>

                        {/* Address */}
                        <td className="px-6 py-3">
                          {order.address
                            ? `${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
                            : "N/A"}
                        </td>

                        <td className="px-6 py-3">₹{order.totalAmount}</td>

                        {/* Status */}
                        <td
                          className={`px-6 py-3 font-semibold ${
                            order.status === "Completed"
                              ? "text-emerald-600"
                              : order.status === "Pending"
                              ? "text-orange-500"
                              : "text-blue-600"
                          }`}
                        >
                          {order.status}
                        </td>

                        {/* Status Dropdown */}
                        <td className="px-6 py-3">
                          <select
                            className="px-3 py-1 border rounded"
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
