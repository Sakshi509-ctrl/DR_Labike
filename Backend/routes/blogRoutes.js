const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const cloudinary = require('../config/cloudinary');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tempDir = path.join(__dirname, '..', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.png';
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.get('/test-cloudinary', async (req, res) => {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Config check:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
    });
    
    const result = await cloudinary.api.ping();
    console.log('Cloudinary ping result:', result);
    
    res.json({ 
      message: 'Cloudinary connection successful',
      result: result
    });
  } catch (err) {
    console.error('Cloudinary test failed:', err);
    res.status(500).json({ 
      error: 'Cloudinary test failed',
      details: err.message 
    });
  }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Upload route hit, file:', req.file);
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials missing:', {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET
      });
      return res.status(500).json({ error: 'Cloudinary configuration missing' });
    }

    console.log('Uploading to Cloudinary...');
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'drlabike-blogs'
    });

    console.log('Cloudinary upload successful:', result);

    fs.unlinkSync(req.file.path);

    return res.json({ 
      image: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

  } catch (err) {
    console.error('Upload error details:', err);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    return res.status(500).json({ 
      error: 'Failed to upload image',
      details: err.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newBlog = new Blog({ title, content, image });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
