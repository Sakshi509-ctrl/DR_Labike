const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  readMoreContent: { type: String, default: '' },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  
  createdBy: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  adminFeedback: { type: String, default: '' },
  approvedBy: { 
    name: { type: String },
    email: { type: String },
    date: { type: Date }
  },
  rejectedBy: { 
    name: { type: String },
    email: { type: String },
    date: { type: Date },
    reason: { type: String }
  }
});

module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
