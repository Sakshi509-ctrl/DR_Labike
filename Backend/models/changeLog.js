const mongoose = require("mongoose");

const changeLogSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  action: { 
    type: String, 
    enum: ["CREATE", "UPDATE", "DELETE", "APPROVE", "REJECT"], 
    required: true 
  },
  editorName: { type: String, required: true },  
  editorEmail: { type: String, required: true }, 
  editorDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  changes: { type: Object },  
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ChangeLog || mongoose.model("ChangeLog", changeLogSchema);
