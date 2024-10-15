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
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("Error While Connecting With DB:" + err));

// List of allowed origins including wildcard for Vercel subdomains
const allowedOrigins = [
  /https:\/\/.*\.vercel\.app$/, // Allow any Vercel subdomain
  "http://localhost:5173", // Allow local development origin
];

app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin is provided (e.g., for non-browser requests) or the origin matches an allowed pattern
      if (!origin || allowedOrigins.some((pattern) => pattern.test(origin))) {
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

// Define routes
app.use("/user", userRouter);
app.use("/holding", holdingRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is accessible!",
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running 🏃🏻‍♂️ on port 3000!");
});
