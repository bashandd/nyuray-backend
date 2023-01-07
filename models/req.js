const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const addReqSchema = new Schema(
  {
    reqName: {
      type: String,
      trim: true,
      required: true,
    },
    closingDate: {
      type: String,
      trim: true,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
      // required: true,
    },
    noOfPositions: {
      type: Number,
      required: true,
    },
    maxCtc: {
      type: Number,
      required: true,
    },
    reqType: {
      type: String,
      required: true,
    },
    reqLocation: {
      type: String,
      required: true,
    },
    expRangeMin: {
      type: String,
      required: true,
    },
    expRangeMax: {
      type: String,
      required: true,
    },
    jobCode: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    expectedCVs: {
      type: Number,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    rgmSpoc: {
      type: String,
      required: true,
    },
    assignedUserName: {
      type: [String],
      default: [],
    },
    assignedUserEmail: {
      type: [String],
      default: [],
    },

    createdBy: { type: ObjectId, ref: "User" },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  
  },
  { timestamps: true, strict: false }
);

addReqSchema.index({ jobCode: 1, client: 1 }, { unique: true });

addReqSchema.plugin(AutoIncrement, {inc_field: 'reqID', start_seq: '1'});

module.exports = mongoose.model("Req", addReqSchema);
