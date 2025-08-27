const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const ChangeLog = require("../models/changeLog");
const cloudinary = require('../config/cloudinary');
const { deleteBlogSection, approveBlog, rejectBlog, getPendingBlogs, getApprovedBlogs, getUserBlogs } = require('../controller/blogC');
const sendEmail = require('../utils/sendEmail');

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
    const result = await cloudinary.api.ping();
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
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: 'Cloudinary configuration missing' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'drlabike-blogs'
    });

    fs.unlinkSync(req.file.path);

    return res.json({ 
      image: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

  } catch (err) {
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

router.get("/change-logs", async (req, res) => {
  try {
    const logs = await ChangeLog.find()
      .populate('blogId', 'title')
      .sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch change logs" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ status: 'pending' })
      .sort({ createdAt: -1 });
    res.json(pendingBlogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending blogs" });
  }
});

router.get("/approved", async (req, res) => {
  try {
    const approvedBlogs = await Blog.find({ status: 'approved' })
      .sort({ updatedAt: -1 });
    res.json(approvedBlogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch approved blogs" });
  }
});

router.get("/user/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    console.log('Fetching blogs for user:', userEmail);
    
    const userBlogs = await Blog.find({ 
      'createdBy.email': userEmail 
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${userBlogs.length} blogs for user ${userEmail}`);
    res.json(userBlogs);
  } catch (err) {
    console.error('Error fetching user blogs:', err);
    res.status(500).json({ error: "Failed to fetch user blogs" });
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
    console.log('Received blog creation request:', req.body);
    const { title, content, readMoreContent, image, editorName, editorEmail } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ 
        message: "Title and content are required",
        error: "Missing required fields" 
      });
    }

    if (!editorEmail?.trim()) {
      return res.status(400).json({ 
        message: "Editor email is required",
        error: "Missing editor email" 
      });
    }

    const blogData = {
      title: title.trim(),
      content: content.trim(),
      readMoreContent: readMoreContent?.trim() || '',
      createdBy: {
        name: editorName?.trim() || 'Unknown',
        email: editorEmail.trim()
      }
    };

    if (image) {
      blogData.image = image;
      blogData.images = [{
        url: image,
        caption: '',
        contentSection: ''
      }];
    }

    const blog = new Blog(blogData);
    const savedBlog = await blog.save();

    await ChangeLog.create({
      blogId: savedBlog._id,
      action: "CREATE",
      editorName: editorName || "Unknown",
      editorEmail: editorEmail,
      editorDetails: {
        name: editorName || "Unknown",
        email: editorEmail,
        timestamp: new Date()
      },
      changes: {
        title,
        content,
        readMoreContent: readMoreContent || '',
        image: image || null
      }
    });

    console.log('Blog created successfully:', savedBlog);
    res.status(201).json({ 
      message: "Blog created successfully",
      blog: savedBlog
    });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ 
      message: "Error creating blog", 
      error: error.message || 'An unknown error occurred'
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, readMoreContent, image, editorName, editorEmail } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, readMoreContent, image, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await ChangeLog.create({
      blogId: updatedBlog._id,
      action: "UPDATE",
      editorName: editorName || "Unknown",
      editorEmail: editorEmail || "unknown@example.com",
      editorDetails: {
        name: editorName || "Unknown",
        email: editorEmail || "unknown@example.com",
        timestamp: new Date()
      },
      changes: { title, content, readMoreContent: readMoreContent || '', image }
    });

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const { adminName, adminEmail, feedback } = req.body;

    console.log('Approval request for blog ID:', id);
    console.log('Admin data:', { adminName, adminEmail, feedback });

    if (!adminName || !adminEmail) {
      return res.status(400).json({ message: "Admin information is required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      console.log('Blog not found with ID:', id);
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log('Found blog:', blog.title);

    blog.status = 'approved';
    blog.adminFeedback = feedback || '';
    blog.approvedBy = {
      name: adminName,
      email: adminEmail,
      date: new Date()
    };
    blog.updatedAt = new Date();

    const updatedBlog = await blog.save();
    console.log('Blog updated successfully');

    try {
      await ChangeLog.create({
        blogId: updatedBlog._id,
        action: "APPROVE",
        editorName: adminName,
        editorEmail: adminEmail,
        editorDetails: {
          name: adminName,
          email: adminEmail,
          timestamp: new Date()
        },
        changes: { 
          status: 'approved', 
          adminFeedback: feedback || '',
          approvedBy: { name: adminName, email: adminEmail }
        }
      });
      console.log('ChangeLog created successfully');
    } catch (changelogError) {
      console.error('Error creating changelog:', changelogError);
    }

    res.json({ 
      message: "Blog approved successfully", 
      blog: updatedBlog 
    });
  } catch (error) {
    console.error('Error in approval route:', error);
    res.status(500).json({ message: "Error approving blog", error: error.message });
  }
});

router.put("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const { adminName, adminEmail, reason } = req.body;

    console.log('Rejection request for blog ID:', id);
    console.log('Admin data:', { adminName, adminEmail, reason });

    if (!adminName || !adminEmail || !reason) {
      return res.status(400).json({ message: "Admin information and rejection reason are required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      console.log('Blog not found with ID:', id);
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log('Found blog:', blog.title);

    blog.status = 'rejected';
    blog.adminFeedback = reason;
    blog.rejectedBy = {
      name: adminName,
      email: adminEmail,
      date: new Date(),
      reason: reason
    };
    blog.updatedAt = new Date();

    const updatedBlog = await blog.save();
    console.log('Blog updated successfully');

    try {
      await ChangeLog.create({
        blogId: updatedBlog._id,
        action: "REJECT",
        editorName: adminName,
        editorEmail: adminEmail,
        editorDetails: {
          name: adminName,
          email: adminEmail,
          timestamp: new Date()
        },
        changes: { 
          status: 'rejected', 
          adminFeedback: reason,
          rejectedBy: { name: adminName, email: adminEmail, reason }
        }
      });
      console.log('ChangeLog created successfully');
    } catch (changelogError) {
      console.error('Error creating changelog:', changelogError);
    }

    res.json({ 
      message: "Blog rejected successfully", 
      blog: updatedBlog 
    });

    try {
      if (blog.createdBy && blog.createdBy.email) {
        const emailSubject = `Blog Rejected: ${blog.title}`;
        const emailMessage = `
Dear ${blog.createdBy.name || 'Blog Author'},

Your blog titled "${blog.title}" has been reviewed and unfortunately rejected.

Rejection Reason:
${reason}


        `;

        await sendEmail({
          email: blog.createdBy.email,
          subject: emailSubject,
          message: emailMessage
        });
        
        console.log('Rejection notification email sent to:', blog.createdBy.email);
      }
    } catch (emailError) {
      console.error('Error sending rejection email:', emailError);
    }
  } catch (error) {
    console.error('Error in rejection route:', error);
    res.status(500).json({ message: "Error rejecting blog", error: error.message });
  }
});

router.delete("/:blogId/sections/:sectionId", async (req, res) => {
  try {
    const { blogId, sectionId } = req.params;
    const { editorName, editorEmail } = req.body;

    if (!editorEmail) {
      return res.status(400).json({ 
        message: "Editor email is required",
        error: "Missing editor information" 
      });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      'createdBy.email': editorEmail
    });

    if (!blog) {
      return res.status(403).json({ 
        message: "You don't have permission to modify this blog",
        error: "Permission denied"
      });
    }

    await deleteBlogSection(req, res);

  } catch (error) {
    console.error('Error in delete section route:', error);
    res.status(500).json({ 
      message: "Error deleting section", 
      error: error.message || 'Unknown error occurred'
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { editorName, editorEmail } = req.body;
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await ChangeLog.create({
      blogId: deletedBlog._id,
      action: "DELETE",
      editorName: editorName || "Unknown",
      editorEmail: editorEmail || "unknown@example.com",
      editorDetails: {
        name: editorName || "Unknown",
        email: editorEmail || "unknown@example.com",
        timestamp: new Date()
      },
      changes: { title: deletedBlog.title, content: deletedBlog.content, image: deletedBlog.image }
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

module.exports = router;
