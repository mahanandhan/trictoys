import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://trictoys.onrender.com/api/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log(res.data);

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="
        h-dvh w-full          
        overflow-hidden       
        bg-[url('/trictoysloginbg.png')]
        bg-cover bg-center bg-no-repeat
        flex items-center justify-center
      "
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-4xl shadow-2xl px-10 py-10 border border-white/70">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-7">
          Welcome to <span className="text-lime-500">TricToys</span>
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-3 shadow-sm">
            <span className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm outline-none border-none placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-3 shadow-sm">
            <span className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M16.5 10.5V8.25a4.5 4.5 0 10-9 0v2.25M6.75 10.5h10.5v8.25H6.75z" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm outline-none border-none placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-[#b7ff2a] hover:bg-[#a5f020] text-black font-semibold py-3 shadow-lg shadow-lime-300 transition cursor-pointer"
          >
            Login
          </button>

          <div className="mt-4 flex items-center justify-end text-sm text-gray-600">
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="font-medium hover:text-lime-500 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
