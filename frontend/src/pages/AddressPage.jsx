import React, { useState } from "react";
import axios from "axios";

const AddressPage = () => {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    mobilenumber: "",
    pincode: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "https://trictoys.onrender.com/api/address/addAddress",
        form,
        { withCredentials: true }
      );

      setMessage("Address saved successfully!");
      console.log("API Response:", res.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to save address");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-pink-50 px-4">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-4xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Form section */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center md:text-left mb-4">
            Add Address
          </h1>

          {message && (
            <p
              className={`mb-4 text-sm font-semibold text-center ${
                message.includes("success")
                  ? "text-emerald-500"
                  : "text-rose-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile number */}
            <div>
              <input
                type="tel"
                name="mobilenumber"
                value={form.mobilenumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="w-full px-5 py-3.5 rounded-full bg-white/70 border border-sky-100 shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="w-full px-5 py-3.5 rounded-full bg-white/70 border border-sky-100 shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            {/* City + State row */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full px-5 py-3.5 rounded-full bg-white/70 border border-sky-100 shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="w-full px-5 py-3.5 rounded-full bg-white/70 border border-sky-100 shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            {/* Pincode + button row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-2">
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
                className="w-full md:flex-1 px-5 py-3.5 rounded-full bg-white/70 border border-sky-100 shadow-inner text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 rounded-full bg-sky-500 text-white font-semibold shadow-[0_10px_25px_rgba(56,189,248,0.6)] hover:brightness-110 active:translate-y-px transition"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>

        {/* Robot illustration placeholder (right side) */}
        <div className="hidden md:flex items-end justify-center md:w-1/3">
          {/* Replace with your actual illustration */}
          <div className="h-52 w-40 bg-linear-to-br from-sky-200 to-sky-400 rounded-4xl flex items-center justify-center text-5xl">
            🤖
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
