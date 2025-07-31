const Inquiry = require("../models/inquiry");

const createInquiry = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message, timestamp } = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({ 
                message: "All fields (firstName, lastName, email, phone, message) are required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        const name = `${firstName} ${lastName}`.trim();

        const inquiry = new Inquiry({ 
            name, 
            email, 
            phone, 
            message, 
            timestamp: timestamp || new Date()
        });
        
        await inquiry.save();

        res.status(201).json({ 
            message: "Inquiry submitted successfully", 
            inquiry: {
                id: inquiry._id,
                name: inquiry.name,
                email: inquiry.email,
                phone: inquiry.phone,
                message: inquiry.message,
                timestamp: inquiry.timestamp
            }
        });
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createInquiry;
