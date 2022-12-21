const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const addCandidateSchema = new Schema(
  {
    jobCode: {
      type: String,
      trim: true,
      required: true,
    },
    resumePath: {
      type: String,
      trim: true,
      required: true,
    },
    candidateName: {
      type: String,
      trim: true,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    candidateEmail: {
      type: String,
      trim: true,
      required: true,
    },
    candidateLocation: {
      type: String,
      trim: true,
      required: true,
    },
    candidatePAN: {
      type: String,
      trim: true,
      required: true,
    },
    highestQualification: {
      type: String,
      trim: true,
      required: true,
    },
    passingYear: {
      type: String,
      trim: true,
      required: true,
    },
    primarySkills: {
      type: String,
      trim: true,
      required: true,
    },
    secondarySkills: {
      type: String,
      trim: true,
      required: true,
    },
    workLocation: {
      type: String,
      trim: true,
      required: true,
    },
    totalExp: {
      type: Number,
      trim: true,
      required: true,
    },
    relevantExp: {
      type: Number,
      trim: true,
      required: true,
    },
    currentCTC: {
      type: Number,
      trim: true,
      required: true,
    },
    expectedCTC: {
      type: Number,
      trim: true,
      required: true,
    },
    noticePeriod: {
      type: String,
      trim: true,
      required: true,
    },
    currentCompany: {
      type: String,
      trim: true,
      required: true,
    },
    durationFrom: {
      type: String,
      trim: true,
      required: true,
    },
    durationTo: {
      type: String,
      trim: true,
      required: true,
    },

    // createdBy: { type: ObjectId, ref: "User" },
    createdBy: { 
      type: String, 
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true, strict: false }
);

addCandidateSchema.index(
  { contactNumber: 1, candidateEmail: 1, candidatePAN: 1 },
  { unique: true }
);

module.exports = mongoose.model("Candidate", addCandidateSchema);
