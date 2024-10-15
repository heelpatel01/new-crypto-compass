const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const holdingRouter = require("./routes/holding.routes");
const transactionRouter = require("./routes/transaction.routes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("Error While Connecting With DB:" + err));

const allowedOrigins = [
  "https://new-crypto-compass-f5lb.vercel.app/",
  "http://localhost:5173",
   // Add any other development origins if needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/holding", holdingRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.json({
    name: "Narendra Modi",
  });
});

app.listen(3000, () => {
  console.log("Server is running 🏃🏻‍♂️!");
});
