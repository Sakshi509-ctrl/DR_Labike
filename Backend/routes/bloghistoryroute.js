const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const history = await BlogHistory.find().sort({ changedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
});

module.exports = router;
