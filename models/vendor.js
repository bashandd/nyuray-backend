const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = new Schema(
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
    company: {
      type: String,
      required: true,
    },
    resetCode: "",
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
