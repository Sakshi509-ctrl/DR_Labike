const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      
      const token = jwt.sign(
        { id: user._id, email: user.email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ token }); 
      

      
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });
  
  module.exports = router;
