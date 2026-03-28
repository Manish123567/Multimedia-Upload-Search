import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String,
  tags: [String],
  views: { type: Number, default: 0 },
  size: {type: Number},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("File", fileSchema);