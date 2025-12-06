import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://trictoys.onrender.com/api/auth/signup", {
        email,
        username,
        password
      }, { withCredentials: true });

      console.log(res.data);

      // Alert appears -> user clicks OK -> page redirects
      alert("Signup successful! Please login now.");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="
        h-screen w-full
        bg-[url('/trictoysloginbg.png')]
        bg-cover bg-no-repeat
        overflow-hidden
        flex items-center justify-center
      "
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-4xl shadow-2xl px-10 py-10 border border-white/70">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-7">
          Create <span className="text-lime-500">Account</span>
        </h1>

        <form className="space-y-4" onSubmit={handleSignup}>
          
          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-3 shadow-sm">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm outline-none border-none placeholder:text-gray-400"
              required
            />
          </div>

          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-sm outline-none border-none placeholder:text-gray-400"
              required
            />
          </div>

          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-3 shadow-sm">
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
            Sign Up
          </button>

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <button 
              type="button" 
              className="font-medium hover:text-lime-500 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              Already have an account?
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup;
