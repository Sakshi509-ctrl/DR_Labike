const express = require('express');
const router = express.Router();
const createInquiry = require('../controller/form');
const Inquiry = require('../models/inquiry');

router.post('/create', createInquiry);

router.get('/all', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ timestamp: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
