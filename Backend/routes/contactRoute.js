const express = require("express");
const router = express.Router();
const Inquiry = require("../models/inquiry");
const { getContactForms } = require("../controller/getContactForms");

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