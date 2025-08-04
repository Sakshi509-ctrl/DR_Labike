const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
       const admin = await Admin.findOne({ email });
       if (admin) {
        return res.status(400).json({ message: 'Admin already exists' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newAdmin = new Admin({ email, password: hashedPassword });
       await newAdmin.save();
       res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;