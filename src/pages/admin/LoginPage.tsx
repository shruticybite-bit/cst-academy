import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Already logged in redirect
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://cst-acadmay-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Success:", response.data);

      // ✅ Save admin token
      localStorage.setItem("adminToken", response.data.token);

      // ✅ Redirect to admin dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/90"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            CST <span className="text-blue-500">Academy</span>
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-white font-semibold shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
