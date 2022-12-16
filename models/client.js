const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const addClientSchema = new Schema(
  {
    clientName: {
      type: String,
      trim: true,
      required: true,
    },
    clientFax: {
      type: String,
      trim: true,
    },
    clientPhone: {
      type: String,
      trim: true,
    },
    accountName: {
      type: String,
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: String,
      trim: true,
    },
    accountManager: {
      type: String,
      trim: true,
    },
    BDM: {
      type: String,
      trim: true,
    },
    billingAddress: {
      type: String,
      trim: true,
    },
    billingPO: {
      type: String,
      trim: true,
    },
    billingCity: {
      type: String,
      trim: true,
    },
    billingState: {
      type: String,
      trim: true,
    },
    billingCountry: {
      type: String,
      trim: true,
    },
    billingCode: {
      type: String,
      trim: true,
    },
    // clientDescription: {
    //   type: String,
    //   trim: true,
    // },
    // otherEmail: {
    //   type: String,
    //   trim: true,
    // },
    // sicCode: {
    //   type: String,
    //   trim: true,
    // },
    // employees: {
    //   type: String,
    //   trim: true,
    // },
    // annualRevenue: {
    //   type: String,
    //   trim: true,
    // },
    // ownership: {
    //   type: String,
    //   trim: true,
    // },
    // industry: {
    //   type: String,
    //   trim: true,
    // },
    // parentCompany: {
    //   type: String,
    //   trim: true,
    // },
    
    createdBy: { type: ObjectId, ref: "User" },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
      },

  },
  { timestamps: true }
);

addClientSchema.index({ "clientName": 1, "accountName": 1}, { "unique": true });


module.exports = mongoose.model("Client", addClientSchema);
