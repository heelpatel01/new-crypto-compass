const User = require("../models/user.models");
const Transaction = require("../models/transaction.models");
const Holding = require("../models/holding.model");

async function handleBuy(req, res) {
  const userId = req.cookies.userId;
  const { type, coinId, quantityOfCoins, priceAtTransaction } = req.body;

  if (!userId || !coinId || !quantityOfCoins || !priceAtTransaction) {
    return res.status(400).json({
      successful: false,
      message: "Missing required fields in the request",
    });
  }

  const paidAmount = quantityOfCoins * priceAtTransaction;

  try {
    // Get the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        successful: false,
        message: "User not found",
      });
    }

    // Check if the user has enough investable balance
    if (user.investableBalance < paidAmount) {
      return res.status(400).json({
        successful: false,
        message: "Insufficient investable balance to purchase coins",
      });
    }

    // Deduct the paid amount from the user's investable balance
    user.investableBalance -= paidAmount;
    user.investedBalance += paidAmount;
    await user.save(); // Save the updated user balance

    // Create a new transaction
    const transaction = await Transaction.create({
      userId,
      type,
      coinId,
      quantityOfCoins,
      priceAtTransaction,
      paidAmount,
    });

    if (!transaction) {
      return res.status(500).json({
        successful: false,
        message: "Failed to create transaction",
      });
    }

    // Find the user's existing holding for the coin
    let holdings = await Holding.findOne({ userId, coinId });

    if (!holdings) {
      // Create a new holding if none exists
      const newHolding = await Holding.create({
        userId,
        coinId,
        quantityOfCoins,
        averageBuyingPrice: priceAtTransaction,
      });

      return res.status(200).json({
        successful: true,
        message: "New holding created successfully",
        newHolding,
        transaction,
      });
    }

    // Update the existing holding
    const totalCoins = holdings.quantityOfCoins + quantityOfCoins;
    holdings.averageBuyingPrice =
      (holdings.averageBuyingPrice * holdings.quantityOfCoins +
        priceAtTransaction * quantityOfCoins) /
      totalCoins;
    holdings.quantityOfCoins = totalCoins;

    await holdings.save(); // Save the updated holding

    return res.status(200).json({
      successful: true,
      message: "Transaction and holdings updated successfully",
      transaction,
      holdings,
    });
  } catch (error) {
    console.log("Error while processing transaction:", error);
    return res.status(500).json({
      successful: false,
      message: `Transaction failed: ${error.message}`,
    });
  }
}

async function handleSell(req, res) {
  //Coin ID, User ID, Type, QuantityOfCoin , CurrentPrice of coin, Payle Amount=CurrentPrice*QuntityOCoinS

  const userId = req.cookies.userId;
  const { coinId, type, quantityOfCoins, priceAtTransaction } = req.body;

  //find edge cases like its having all things or not
  if (!coinId || !type || !quantityOfCoins || !priceAtTransaction) {
    return res.status(400).json({
      successful: false,
      message: "Missing Required Fields!!!",
    });
  }

  if (!userId) {
    return res.status(404).json({
      successful: false,
      message: "Please Provide UserId!",
    });
  }

  //find coin and all in Holdings,if it is there and with more or equal amount then make a order

  const holding = await Holding.findOne({ userId: userId, coinId: coinId });

  if (!holding) {
    return res.status(404).json({
      successful: false,
      message: "You have not balance for this coin.",
    });
  }

  if (holding.quantityOfCoins < quantityOfCoins) {
    return res.status(400).json({
      successful: false,
      message: "You have not enough holdings to sell coins! be Honest plz",
    });
  }

  const currentValue = quantityOfCoins * priceAtTransaction;
  holding.quantityOfCoins = holding.quantityOfCoins - quantityOfCoins;
  holding.save();

  //update users investable amount and invested amount accordingly.
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      successful: false,
      message: "User Not Found!",
    });
  }
  user.investableBalance += currentValue;
  user.investedBalance -= currentValue;

  //store this stuff in transaction..
  const transaction = await Transaction.create({
    userId,
    type,
    coinId,
    quantityOfCoins,
    priceAtTransaction,
    paidAmount: currentValue,
  });

  if (transaction) {
    return res.status(200).json({
      successful: true,
      message: "Yo! Coin sold successfully!",
      transaction,
      holding,
      user,
    });
  }
}

module.exports = {
  handleBuy,
  handleSell,
};
