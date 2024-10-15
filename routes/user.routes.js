const router = require("express").Router();
const {
  handleSignup,
  handleLogin,
  handleBalanceFetching,
  handleLogout,
  handleIsLoggedin,
} = require("../controllers/user.controller.js");

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/isloggedin", handleIsLoggedin);
router.get("/balance", handleBalanceFetching);

module.exports = router;
