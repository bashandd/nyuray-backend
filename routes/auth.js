const express = require("express");

const router = express.Router();

// middleware
import {
  requireSignin,
  isAdmin,
  isSpoc,
  isVendor,
  isGuest,
} from "../middlewares";

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
  getAllUsers,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "Node Server API is running on port 8000",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/current-admin", requireSignin, isAdmin, currentUser);
router.get("/current-spoc", requireSignin, isSpoc, currentUser);
router.get("/current-vendor", requireSignin, isVendor, currentUser);
router.get("/current-guest", requireSignin, isGuest, currentUser);
//router.get("/get-all-users", requireSignin, isAdmin, getAllUsers);

module.exports = router;
