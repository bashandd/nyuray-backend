import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const profilesSchema = new Schema(
  {
    url: String,
    fileName: String,
    postedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Profiles", profilesSchema);
