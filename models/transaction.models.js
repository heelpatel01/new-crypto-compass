const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    coinId: {
      type: String,
      required: true,
    },
    quantityOfCoins: {
      type: Number,
      required: true,
    },
    priceAtTransaction: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {}
);

const Transaction=mongoose.model("Transaction",transactionSchema);
module.exports=Transaction;