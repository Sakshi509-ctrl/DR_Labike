const Blog = require('../models/Blog');

app.put('/api/blogs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, image } = req.body;
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, image },
        { new: true }
      );
  
      if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
  
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: 'Error updating blog', error: err });
    }
  });
  