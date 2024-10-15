const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    averageBuyingPrice: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Holding = mongoose.model("Holding", holdingSchema);
module.exports = Holding;
