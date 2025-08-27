const Blog = require('../models/Blog');
const ChangeLog = require("../models/changeLog");
const cloudinary = require('../config/cloudinary');

const createBlog = async (req, res) => {
  try {
    const { title, content, readMoreContent, sections, editorName, editorEmail } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (!editorEmail) {
      return res.status(400).json({ message: "Editor email is required" });
    }

    let blogData = {
      title: title.trim(),
      content: content.trim(),
      readMoreContent: readMoreContent?.trim() || '',
      sections: sections?.map((section, index) => ({
        imageUrl: section.imageUrl,
        caption: section.caption || '',
        content: section.content || '',
        order: index
      })) || [],
      createdBy: {
        name: editorName?.trim() || 'Unknown',
        email: editorEmail.trim()
      },
      status: 'pending' 
    };

    const blog = new Blog(blogData);

    try {
      const savedBlog = await blog.save();
      
      await ChangeLog.create({
        blogId: savedBlog._id,
        action: "CREATE",
        editorName: editorName || "Unknown",
        editorEmail: editorEmail,
        changes: { title, content, readMoreContent, sections }
      });

      res.status(201).json({ 
        message: "Blog created successfully and sent for admin approval", 
        blog: savedBlog 
      });
    } catch (saveError) {
      console.error('Error saving blog:', saveError);
      return res.status(500).json({ 
        message: "Error saving blog", 
        error: saveError.message 
      });
    }
  } catch (err) {
    console.error('Blog creation error:', err);
    res.status(500).json({ 
      message: "Error creating blog", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};

const approveBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { adminName, adminEmail, feedback } = req.body;

    if (!adminName || !adminEmail) {
      return res.status(400).json({ message: "Admin information is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = 'approved';
    blog.adminFeedback = feedback || '';
    blog.approvedBy = {
      name: adminName,
      email: adminEmail,
      date: new Date()
    };
    blog.updatedAt = new Date();

    const updatedBlog = await blog.save();

    await ChangeLog.create({
      blogId: updatedBlog._id,
      action: "APPROVE",
      editorName: adminName,
      editorEmail: adminEmail,
      changes: { 
        status: 'approved', 
        adminFeedback: feedback || '',
        approvedBy: { name: adminName, email: adminEmail }
      }
    });

    res.json({ 
      message: "Blog approved successfully", 
      blog: updatedBlog 
    });
  } catch (err) {
    console.error('Blog approval error:', err);
    res.status(500).json({ 
      message: "Error approving blog", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};

const rejectBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { adminName, adminEmail, reason } = req.body;

    if (!adminName || !adminEmail || !reason) {
      return res.status(400).json({ message: "Admin information and rejection reason are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

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

    await ChangeLog.create({
      blogId: updatedBlog._id,
      action: "REJECT",
      editorName: adminName,
      editorEmail: adminEmail,
      changes: { 
        status: 'rejected', 
        adminFeedback: reason,
        rejectedBy: { name: adminName, email: adminEmail, reason }
      }
    });

    res.json({ 
      message: "Blog rejected successfully", 
      blog: updatedBlog 
    });
  } catch (err) {
    console.error('Blog rejection error:', err);
    res.status(500).json({ 
      message: "Error rejecting blog", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};

const getPendingBlogs = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ status: 'pending' })
      .sort({ createdAt: -1 });
    res.json(pendingBlogs);
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching pending blogs", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};

const getApprovedBlogs = async (req, res) => {
  try {
    const approvedBlogs = await Blog.find({ status: 'approved' })
      .sort({ updatedAt: -1 });
    res.json(approvedBlogs);
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching approved blogs", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const userBlogs = await Blog.find({ 
      'createdBy.email': userEmail 
    }).sort({ createdAt: -1 });
    res.json(userBlogs);
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching user blogs", 
      error: err.message || 'Unknown error occurred' 
    });
  }
};


  
    const updateBlog = async (req, res) => {
      try {
        const { blogId } = req.params;
        const { title, content, readMoreContent, image } = req.body;
    
        const updatedBlog = await Blog.findByIdAndUpdate(
          blogId,
          { title, content, readMoreContent, image },
          { new: true }
        );
    
      
        await ChangeLog.create({
          blogId: updatedBlog._id,
          action: "UPDATE",
          editorName: req.user?.name || "Unknown",
          editorEmail: req.user?.email || "No email",
          changes: { title, content, readMoreContent, image }
        });
    
        res.json(updatedBlog);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err });
  }
};

const deleteBlogSection = async (req, res) => {
  try {
    const { blogId, sectionId } = req.params;
    const { editorName, editorEmail } = req.body;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const sectionIndex = blog.sections.findIndex(
      section => section._id.toString() === sectionId
    );
    
    if (sectionIndex === -1) {
      return res.status(404).json({ message: "Section not found in blog" });
    }

    const deletedSection = blog.sections[sectionIndex];

    if (deletedSection.imageUrl && deletedSection.imageUrl.includes('cloudinary')) {
      try {
        const publicId = deletedSection.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
      }
    }

    blog.sections.splice(sectionIndex, 1);

    blog.sections = blog.sections.map((section, index) => ({
      ...section,
      order: index
    }));
    
    await blog.save();

    await ChangeLog.create({
      blogId: blog._id,
      action: "DELETE_SECTION",
      editorName: editorName || "Unknown",
      editorEmail: editorEmail || "unknown@example.com",
      editorDetails: {
        name: editorName || "Unknown",
        email: editorEmail || "unknown@example.com",
        timestamp: new Date()
      },
      changes: { 
        deletedSection: {
          imageUrl: deletedSection.imageUrl,
          content: deletedSection.content,
          caption: deletedSection.caption
        }
      }
    });

    res.json({ 
      message: "Section deleted successfully", 
      blog,
      deletedSection: {
        imageUrl: deletedSection.imageUrl,
        content: deletedSection.content,
        caption: deletedSection.caption
      }
    });
  } catch (err) {
    console.error('Error deleting section:', err);
    res.status(500).json({ 
      message: "Error deleting section", 
      error: err.message || 'Unknown error occurred'
    });
  }
};

module.exports = { createBlog, updateBlog, getAllBlogs, deleteBlogSection, approveBlog, rejectBlog, getPendingBlogs, getApprovedBlogs, getUserBlogs };
