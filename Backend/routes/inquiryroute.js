  const express = require('express');
  const router = express.Router();
  const createInquiry = require('../controller/form');
  const Inquiry = require('../models/inquiry');

  router.post("/", createInquiry);

  router.get('/', async (req, res) => {
    try {
      const inquiries = await Inquiry.find().sort({ timestamp: -1 });
      res.status(200).json({ data: inquiries }); 
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Inquiry.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;
