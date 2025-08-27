const express = require("express");
const router = express.Router();
const ChangeLog = require("../models/changeLog");
const Blog = require("../models/Blog");

router.delete("/:email", async (req, res) => {
  try {
    console.log("Editor summary delete route called with email:", req.params.email);
    const { email } = req.params;
    
    const changeLogs = await ChangeLog.find({
      $or: [
        { editorEmail: email },
        { "editorDetails.email": email }
      ]
    });
    
    console.log("Found change logs:", changeLogs.length);
    
    const blogIds = [...new Set(changeLogs
      .filter(log => log.blogId)
      .map(log => log.blogId.toString())
    )];
    
    console.log("Found unique blog IDs:", blogIds);
    
    let blogsDeleted = 0;
    if (blogIds.length > 0) {
      const blogDeleteResult = await Blog.deleteMany({
        _id: { $in: blogIds }
      });
      blogsDeleted = blogDeleteResult.deletedCount;
      console.log("Blogs deleted:", blogsDeleted);
    }
    
    const changeLogResult = await ChangeLog.deleteMany({
      $or: [
        { editorEmail: email },
        { "editorDetails.email": email }
      ]
    });

    console.log("Change logs deleted:", changeLogResult.deletedCount);

    const totalDeleted = blogsDeleted + changeLogResult.deletedCount;
    
    if (totalDeleted === 0) {
      console.log("No editor summary found for email:", email);
      return res.status(404).json({ message: "No editor summary found for this email" });
    }

    console.log("Successfully deleted", totalDeleted, "items for email:", email);
    res.json({ 
      message: "Editor summary and associated blogs deleted successfully", 
      blogsDeleted: blogsDeleted,
      changeLogsDeleted: changeLogResult.deletedCount,
      totalDeleted: totalDeleted
    });
  } catch (error) {
    console.error("Error deleting editor summary:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
