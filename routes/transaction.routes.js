const express = require("express");
const router=express.Router()
const {
  handleBuy,
  handleSell,
} = require("../controllers/transaction.controller");

const {handleTransactionVisible}=require("../controllers/user.controller")

router.post("/buy", handleBuy);
router.post("/sell", handleSell);
router.get("/showtransactions", handleTransactionVisible);

module.exports = router;
