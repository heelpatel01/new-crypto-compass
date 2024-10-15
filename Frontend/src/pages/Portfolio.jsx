import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/AxiosInstance.js";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthProvider";

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [investedBalance, setInvestedBalance] = useState(0);
  const [investableBalance, setInvestableBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    // Fetch portfolio data from backend API
    axiosInstance
      .get("/holding/portfolio")
      .then((response) => {
        const { holdings, investedBalance, investableBalance, totalBalance } =
          response.data;
        setPortfolioData(holdings);
        setInvestedBalance(investedBalance);
        setInvestableBalance(investableBalance);
        setTotalBalance(totalBalance);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header */}

      {/* <Header /> */}

      {/* Portfolio Overview Section */}
      <div className="container mx-auto py-10 px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-8">
            Portfolio Overview
          </h2>

          {/* Balances Overview */}
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Investable Balance
              </h3>
              <p className="text-2xl font-bold">
                ₹{investableBalance.toFixed(2)}
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Invested Balance
              </h3>
              <p className="text-2xl font-bold">
                ₹{investedBalance.toFixed(2)}
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                Total Balance
              </h3>
              <p className="text-2xl font-bold">₹{totalBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            Current Holdings
          </h3>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">Coin Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Invested INR</th>
                <th className="px-6 py-3 text-left">Average Buying Price</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((coin, index) => {
                return (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-6 py-4 capitalize">{coin.coinId}</td>
                    <td className="px-6 py-4">{coin.quantity}</td>
                    <td className="px-6 py-4">
                      ₹{coin.investedInr.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      ₹{coin.averageBuyingPrice.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
