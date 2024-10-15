const express=require("express");
const router=express.Router();
const {handlePortfolio}=require("../controllers/holding.controller")

router.get("/portfolio",handlePortfolio)

module.exports=router;