const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      default: "Guest",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isAccountManager: {
      type: Boolean,
      default: false,
    },
    isVendor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    // reportsTo: { 
    //   type: ObjectId, 
    //   ref: "User" 
    // },

     reportsTo: { 
      type: String, 
      default: "<>" 
    },
    resetCode: "",
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
