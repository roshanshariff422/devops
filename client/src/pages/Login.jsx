import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        const res = await axios.post("https://devops-c5cj.onrender.com/api/auth/signup", {
          name,
          email,
          password,
        });
        alert(res.data.message);
      } else {
        const res = await axios.post("https://devops-c5cj.onrender.com/api/auth/login", {
          email,
          password,
        });
        alert(res.data.message);
        console.log("LOGIN RESPONCE:", res.data);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/dashboard", { replace:
             true });
      },100);
    }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

 return (
  <div className="h-screen flex">

    {/* LEFT SIDE */}
    <div className="w-1/2 bg-gradient-to-br from-purple-700 via-blue-600 to-purple-500 text-white p-12 flex flex-col justify-center relative overflow-hidden">

  {/* Glow */}
  <div className="absolute w-96 h-96 bg-purple-400 opacity-30 blur-3xl top-[-100px] left-[-100px]"></div>
  <div className="absolute w-96 h-96 bg-blue-400 opacity-30 blur-3xl bottom-[-100px] right-[-100px]"></div>

  <h1 className="text-5xl font-extrabold mb-4 z-10">
    CampusCycle
  </h1>

  {/* 🔥 NEW SUBTITLE */}
  <p className="text-lg opacity-90 mb-6 z-10">
    Buy • Sell • Reuse smarter within your campus ecosystem
  </p>

  {/* 🔥 FEATURE POINTS */}
  <div className="space-y-3 text-sm opacity-90 z-10">
    <p>📦 Sell unused items easily</p>
    <p>💸 Get smart AI price suggestions</p>
    <p>⚡ Connect with buyers instantly</p>
    <p>🌱 Promote sustainable reuse culture</p>
  </div>

  {/* 🔥 EXTRA TAGLINE */}
  <p className="mt-8 text-sm opacity-70 z-10">
    Designed for students. Built for simplicity.
  </p>

  <div className="mt-8 text-5xl animate-bounce z-10">🚀</div>

</div>

    {/* RIGHT SIDE */}
    <div className="w-1/2 flex items-center justify-center bg-gray-100">

      <motion.div
        key={isSignup ? "signup" : "login"}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="bg-white/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-96 border border-white/30 
        hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition duration-300"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* NAME */}
        {isSignup && (
          <div className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-400">👤</span>
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 p-3 rounded-lg border 
              focus:ring-2 focus:ring-purple-500 
              focus:scale-[1.02] 
              hover:shadow-md 
              transition duration-200 outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-400">📧</span>
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 p-3 rounded-lg border 
            focus:ring-2 focus:ring-purple-500 
            focus:scale-[1.02] 
            hover:shadow-md 
            transition duration-200 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-3 rounded-lg border 
            focus:ring-2 focus:ring-purple-500 
            focus:scale-[1.02] 
            hover:shadow-md 
            transition duration-200 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-lg 
          hover:scale-105 active:scale-95 
          shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] 
          transition duration-300"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* TOGGLE */}
        <p
          className="mt-4 text-center text-sm cursor-pointer text-purple-600 hover:underline transition"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>

      </motion.div>
    </div>
  </div>
);
};

export default Login;