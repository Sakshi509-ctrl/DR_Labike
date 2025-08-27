import mongoose from "mongoose";

const blogHistorySchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  title: String,
  content: String,
  image: String,
  action: { type: String, enum: ["created", "updated", "deleted"], required: true },
  changedBy: {
    username: String,
    email: String,
    phone: String,
  },
  changedAt: { type: Date, default: Date.now },
});

export default mongoose.model("BlogHistory", blogHistorySchema);
