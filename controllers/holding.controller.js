const Holding = require("../models/holding.model");
const User = require("../models/user.models");
const http = require("https");

async function handlePortfolio(req, res) {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(500).json({
      successful: false,
      message: "User ID not received for handlePortfolio...",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User Not Found");
      return;
    } else {
      console.log(user);
    }

    if (!user) {
      return res.status(404).json({
        successful: false,
        message: "User Not Found",
      });
    }
    const holdings = await Holding.find({ userId });

    if (holdings.length === 0) {
      return res.status(200).json({
        successful: true,
        message: "User has no holdings.",
        holdings: [],
      });
    }

    const coinName = "tron";

    const options = {
      method: "GET",
      hostname: "api.coingecko.com",
      port: null,
      path: "/api/v3/simple/price?ids=bitcoin&vs_currencies=INR&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2",
      headers: {
        accept: "application/json",
      },
    };

    const holdingMap = holdings.map((holding) => ({
      coinId: holding.coinId,
      quantity: holding.quantityOfCoins,
      averageBuyingPrice: holding.averageBuyingPrice,
      investedInr: holding.quantityOfCoins * holding.averageBuyingPrice,
    }));

    return res.status(200).json({
      successful: true,
      holdings: holdingMap,
      investedBalance: user.investedBalance,
      investableBalance: user.investableBalance,
      totalBalance: user.investableBalance + user.investedBalance,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({
      successful: false,
      message: "Error fetching portfolio.",
    });
  }
}

module.exports = {
  handlePortfolio,
};
