const Blog = require('../models/blogM');

const createBlog = async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const blog = new Blog({ title, content, image });
        await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}   

module.exports = createBlog;
    