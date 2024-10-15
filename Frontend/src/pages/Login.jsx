import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/AuthProvider";
import axiosInstance from "../Utils/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email id to login!");
      return;
    }
    if (!password) {
      setError("Please enter your password to login!");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      if (response.data && response.data.success) {
        setError("");
        navigate("/");
        console.log(response.data.message);
        authState.setUniversalLoggedin(true);
        return;
      }
    } catch (error) {
      console.log("error while login:" + error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* <Header /> */}

      {/* <AuthProvider>
        <Header />
      </AuthProvider> */}
      <div className="flex items-center justify-center py-10">
        <div className="bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Login Header */}
          <h2 className="p-1 text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-8">
            Login
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg transition-colors"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don`t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
