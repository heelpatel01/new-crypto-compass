// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import axiosInstance from "../Utils/AxiosInstance";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function TradeModal({ coin, onClose }) {
//   const [quantity, setQuantity] = useState(1);
//   const [chartData, setChartData] = useState(null);
//   const [tradeType, setTradeType] = useState();
//   const [currentPrice, setCurrentPrice] = useState(coin.current_price);
//   const [error, setError] = useState(null);

//   const handleBuy = async (e) => {
//     if (!quantity || quantity * currentPrice < 100) {
//       setError("Please Select More Quntity!");
//       onClose();
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/transaction/buy", {
//         type: "buy",
//         coinId: coin.name,
//         quantityOfCoins: quantity,
//         priceAtTransaction: currentPrice,
//       });

//       if (response.data && response.data.successful) {
//         setError("");
//         onClose();
//         return;
//       }
//     } catch (error) {
//       setError("Error while buy!" + error);
//       return;
//     }
//   };

//   const handleSell = async (e) => {
//     if (!quantity || quantity * currentPrice < 100) {
//       setError("Minimum should 100!");
//       onClose();
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/transaction/sell", {
//         coinId: coin.name,
//         type: "sell",
//         quantityOfCoins: quantity,
//         priceAtTransaction: currentPrice,
//       });

//       if (response.data && response.data.successful) {
//         setError("");
//         onClose();
//         return;
//       }
//       setError("Not got response of selling!");
//       return;
//     } catch (error) {
//       console.log("Error While Selling Coin:" + error);
//       setError(error);
//       return;
//     }
//   };

//   const fetchTransaction=async()=>{
//     if(!coin.name){
//       setError("Please Select Error!");
//       return;
//     }

//     const response=await axiosInstance.get("/transaction/showtransactions")
//   }

//   // Fetch historical data for the selected coin (last 7 days)
//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
//         );
//         const data = await response.json();

//         // Prepare data for the chart
//         const prices = data.prices.map((price) => price[1]); // price[1] is the price at each timestamp
//         const timestamps = data.prices.map((price) =>
//           new Date(price[0]).toLocaleDateString()
//         );

//         setChartData({
//           labels: timestamps,
//           datasets: [
//             {
//               label: `${coin.name} Price (INR)`,
//               data: prices,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               fill: true,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchChartData();
//   }, [coin]);

//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//   };

//   const totalPrice = (coin.current_price * quantity).toFixed(2);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{coin.name}</h2>
//           <button onClick={onClose} className="text-red-500 font-bold">
//             X
//           </button>
//         </div>

//         <div className="my-4 flex items-center">
//           <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-2" />
//           <p className="text-lg">₹{coin.current_price.toLocaleString()}</p>
//         </div>

//         {/* Quantity and Total Price */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Quantity
//           </label>
//           <input
//             type="number"
//             className="border rounded-lg w-full px-3 py-2"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="1"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Total Price (USD)
//           </label>
//           <input
//             type="text"
//             className="border rounded-lg w-full px-3 py-2"
//             value={totalPrice}
//             readOnly
//           />
//         </div>

//         {/* Line Chart */}
//         <div className="mb-4">
//           {chartData ? (
//             <Line data={chartData} options={{ responsive: true }} />
//           ) : (
//             <p>Loading chart...</p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           <button
//             className="bg-green-500 text-white py-2 px-4 rounded-lg"
//             onClick={handleBuy}
//           >
//             Buy
//           </button>
//           <button
//             className="bg-red-500 text-white py-2 px-4 rounded-lg"
//             onClick={handleSell}
//           >
//             Sell
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TradeModal;