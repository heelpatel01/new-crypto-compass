const Transaction = require("../models/transaction.models");
const User = require("../models/user.models");

async function handleSignup(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.json({
      success: false,
      message: "Fill all the fields to signup!",
    });
  }

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    user.save();

    if (user) {
      res.cookie("userId", user._id, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        user,
      });
    }
  } catch (error) {
    console.log("Error while signup!");
    return res.status(500).json({
      success: false,
      message: "Server Side Error While Signup " + error,
    });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields!",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (password != user.password) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct password!",
      });
    }

    res.cookie("userId", user._id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "User loggedin successfully.",
      user,
    });
  } catch (error) {
    console.log("LN-85 Error while login");
    return res.status(500).json({
      success: false,
      message: "Error while login",
    });
  }
}

async function handleLogout(req, res) {
  if (req.cookies.userId) {
    return res.clearCookie("userId").json({
      success: true,
      message: "User loggedout successfully!",
    });
  } else {
    return res.clearCookie("userId").json({
      success: true,
      message: "User already loggedout!",
    });
  }
}

async function handleBalanceFetching(req, res) {
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User Not Found For Balance!",
      });
    }

    const totalBalance = user.investableBalance + user.investedBalance;

    return res.status(200).json({
      success: true,
      investableBalance: user.investableBalance,
      investedBalance: user.investedBalance,
      totalBalance: totalBalance,
    });
  } catch (error) {
    console.log("Error fetching balance:", error);
    return res.status(500).json({
      success: false,
      message: "Server Side Error While Fetching Balance",
    });
  }
}

async function handleIsLoggedin(req, res) {
  console.log("hii");
  const userId = req.cookies.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User is not loggedin!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User is exist!",
  });
}

// async function handleTransactionVisible(req, res) {
//   const userId = req.cookies.userId;
//   const { coinId } = req.body;

//   const transactions = await Transaction.find({
//     userId: userId,
//     coinId: coinId,
//   });

//   if (!transactions) {
//     return res.status(404).json({
//       successful: false,
//       message: "You have not made any trade in this coin!",
//     });
//   }

//   const serializedTransactions = transactions.map((transaction) => ({
//     type: transaction.type,
//     quantity: transaction.quantityOfCoins,
//     priceAtTransaction: transaction.priceAtTransaction,
//     paidAmount: transaction.paidAmount,
//   }));

//   return res.status(200).json({
//     successful: true,
//     content: serializedTransactions,
//   });
// }

async function handleTransactionVisible(req, res) {
  const userId = req.cookies.userId;
  const { coinId } = req.query;

  // Find the transactions
  console.log("User ID:" + userId);
  const transactions = await Transaction.find({
    userId: userId,
    coinId: coinId,
  });

  // Check if no transactions were found (empty array)
  if (!transactions || transactions.length === 0) {
    return res.status(404).json({
      successful: false,
      message: "You have not made any trade in this coin!",
    });
  }

  // Serialize the transactions to send only the necessary fields
  // console.log("Tansaction Data: "+transactions)
  const serializedTransactions = transactions.map((transaction) => ({
    type: transaction.type,
    quantity: transaction.quantityOfCoins,
    priceAtTransaction: transaction.priceAtTransaction,
    paidAmount: transaction.paidAmount,
    // userId:transaction.userId == "66ec67985a13e918e81334cc"
  }));

  // Return the transactions in the response
  return res.status(200).json({
    successful: true,
    content: serializedTransactions,
  });
}

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
  handleBalanceFetching,
  handleIsLoggedin,
  handleTransactionVisible,
};
