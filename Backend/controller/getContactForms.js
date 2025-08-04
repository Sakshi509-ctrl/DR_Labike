const Inquiry = require("../models/inquiry");

const getContactForms = async (req, res) => {
    try {
        const contactForms = await Inquiry.find().sort({ timestamp: -1 });
        res.status(200).json({
            success: true,
            data: contactForms,
            message: "Contact forms retrieved successfully"
        });
    } catch (error) {
        console.error('Error fetching contact forms:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch contact forms",
            error: error.message
        });
    }
};

module.exports = { getContactForms }; 