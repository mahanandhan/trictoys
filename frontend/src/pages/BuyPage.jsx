import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BuyPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  const location = useLocation();
  const navigate = useNavigate();
  const buyProducts = location.state?.products || [];

  // FETCH USER ADDRESSES
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "https://trictoys.onrender.com/api/address/getAddress",
          {
            withCredentials: true,
          }
        );

        const list = Array.isArray(res.data) ? res.data : res.data.addresses;
        setAddresses(list || []);

        if (list && list.length > 0) {
          setSelectedAddressId(list[0]._id || list[0].id);
        }
      } catch (err) {
        console.error("Failed to load addresses:", err);
      }
    };

    fetchAddresses();
  }, []);

  // PLACE ORDER (logic unchanged)
  const handleBuy = async () => {
    try {
      const products = buyProducts.map((p) => ({
        productId: p.id,
        quantity: p.qty,
      }));

      const res = await axios.post(
        "https://trictoys.onrender.com/api/orders/place",
        {
          addressId: selectedAddressId,
          products,
        },
        { withCredentials: true }
      );

      console.log("ORDER SUCCESS:", res.data);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err);
      alert("Order failed!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-sky-300 via-sky-100 to-sky-400 px-4 py-8">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-4xl shadow-2xl p-6 md:p-10">
        {/* Steps bar */}
        <div className="flex justify-center gap-6 text-xs md:text-sm font-semibold text-white mb-6">
          <span>Step 1: Delivery Address</span>
          <span>•</span>
          <span className="underline underline-offset-4">
            Step 2: Order Summary
          </span>
          <span>•</span>
          <span>Step 3: Payment</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT: Address list UI */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Select Address
            </h2>

            {addresses.length === 0 ? (
              <p className="text-xs text-slate-500">
                No addresses found. Please add an address first.
              </p>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => {
                  const id = addr._id || addr.id;
                  const selected = id === selectedAddressId;

                  return (
                    <div
                      key={id}
                      className={`rounded-3xl border p-4 md:p-5 shadow-sm bg-white/80 flex flex-col gap-3 ${
                        selected
                          ? "border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.5)]"
                          : "border-slate-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Delivery Address
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {addr.name || addr.username || "Customer"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {addr.address || addr.line1}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(addr.city || "") +
                              (addr.state ? ", " + addr.state : "")}
                          </p>
                          <p className="text-xs text-slate-500">
                            {addr.pincode || addr.postalCode}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedAddressId(id)}
                          className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transition ${
                            selected
                              ? "bg-lime-400 text-slate-900"
                              : "bg-sky-100 text-slate-700 hover:bg-sky-200"
                          }`}
                        >
                          {selected ? "Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Order summary + payment + confirm */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Your Order
              </h3>

              {/* Order items */}
              <div className="mb-4 rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 text-sm text-slate-800 shadow-sm">
                {buyProducts.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No products selected.
                  </p>
                ) : (
                  buyProducts.map((p) => (
                    <p
                      key={p.id}
                      className="flex justify-between border-b last:border-b-0 py-1"
                    >
                      <span>
                        {p.name} × {p.qty}
                      </span>
                      <span>₹{p.price * p.qty}</span>
                    </p>
                  ))
                )}
              </div>

              <div className="border-t border-sky-100 my-4" />

              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Payment Methods
              </h3>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center text-lg ${
                    paymentMethod === "card"
                      ? "bg-sky-500 text-white shadow-md"
                      : "bg-white text-slate-500 border border-slate-100"
                  }`}
                >
                  💳
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center text-lg ${
                    paymentMethod === "upi"
                      ? "bg-sky-500 text-white shadow-md"
                      : "bg-white text-slate-500 border border-slate-100"
                  }`}
                >
                  📱
                </button>
                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center text-lg ${
                    paymentMethod === "wallet"
                      ? "bg-sky-500 text-white shadow-md"
                      : "bg-white text-slate-500 border border-slate-100"
                  }`}
                >
                  💰
                </button>
              </div>

              {/* Simple totals (you can compute from buyProducts if needed) */}
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {/* Example: real subtotal from products */}
                  ₹
                  {buyProducts.reduce(
                    (sum, p) => sum + p.price * p.qty,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-600">Delivery</span>
                <span className="font-semibold text-emerald-500">
                  Free
                </span>
              </div>

              <div className="flex justify-between items-center text-base font-bold text-slate-900 mt-3">
                <span>Total</span>
                <span>
                  ₹
                  {buyProducts.reduce(
                    (sum, p) => sum + p.price * p.qty,
                    0
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={!selectedAddressId || buyProducts.length === 0}
              className={`mt-6 w-full py-3.5 rounded-full font-semibold text-lg shadow-[0_12px_30px_rgba(30,64,175,0.55)] transition ${
                selectedAddressId && buyProducts.length > 0
                  ? "bg-sky-700 text-white hover:brightness-110 active:translate-y-px"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
