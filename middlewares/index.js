import User from "../models/user";
import expressJwt from "express-jwt";

require("dotenv").config();
// req.user = _id
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user role : " + user.role);
    if (user.role !== "Admin") {
      return res.status(403).send("UnAuthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isSpoc = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    //  console.log("user role : " + user.role);

    if (user.role.match("SPoC" | "Admin")) {
      console.log("I am here isSpoc", user.role);
      return res.status(403).send("UnAuthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    //   console.log("user role : " + user.role);
    if (user.role.match("Vendor" | "Admin")) {
      return res.status(403).send("UnAuthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isGuest = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user role : " + user.role);
    // for guest page allow every user type
    next();
  } catch (err) {
    console.log(err);
  }
};

export const isRecruiter = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user role : " + user.role);
    // for guest page allow every user type
    next();
  } catch (err) {
    console.log(err);
  }
};

export const isReqsAllowed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role.match("Admin" | "Recruiter")) {
      console.log("Allowing for user role ", user.role);
      next();
    } else {
      return res.status(403).send("UnAuthorized");
    }
  } catch (err) {
    console.log(err);
  }
};
