const express = require('express');
const router = express.Router();
const createBlog = require('../controller/blogC');
const Blog = require('../models/blogM');

router.post('/', createBlog);

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ timestamp: -1 });
        res.status(200).json({ data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;