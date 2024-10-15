import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../Utils/AxiosInstance";
import { AuthContext, AuthProvider } from "../contexts/AuthProvider";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      setError("Please enter your name!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setError("");

    try {
      console.log(userName, email, password);
      const response = await AxiosInstance.post("/user/signup", {
        userName,
        email,
        password,
      });

      if (response.data && response.data.success) {
        console.log(response.data.user);
        authState.setUniversalLoggedin(true);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Line 45 while signup", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* <Header /> */}

      {/* <Header /> */}

      <div className="flex items-center justify-center py-10">
        <div className="bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-8">
            Create Account
          </h2>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-400">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="Enter your username"
                required
              />
            </div>

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

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
