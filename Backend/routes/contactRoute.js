const express = require("express");
const router = express.Router();
const Inquiry = require("../models/inquiry");
const { getContactForms } = require("../controller/getContactForms");

// Submit a new contact form
router.post("/contact-forms", async (req, res) => {
    console.log("Contact form submission received:", req.body);
    console.log("Request URL:", req.url);
    console.log("Request method:", req.method);
    try {
        const { name, email, phone, message, viewpage } = req.body;
        
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, phone, message) are required"
            });
        }
        
        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            message,
            timestamp: new Date(),
            viewpage: viewpage
        });
        
        await newInquiry.save();
        
        res.status(201).json({
            success: true,
            message: "Contact form submitted successfully"
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            message: "Failed to submit contact form",
            error: error.message
        });
    }
});

router.get("/contact-forms", getContactForms);

router.delete("/contact-forms/:id", async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const deletedForm = await Inquiry.findByIdAndDelete(id);
        
        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Contact form not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Contact form deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting contact form:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact form",
            error: error.message
        });
    }
});

module.exports = router; 