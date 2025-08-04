const express = require('express');
const router = express.Router();
const Viewpage = require('../models/viewpage');

router.get('/', async (req, res) => {
    try {
        const viewpages = await Viewpage.find().sort({ timestamp: -1 });
        res.json(viewpages);
    } catch (error) {
        console.error('Error fetching viewpage data:', error);
        res.status(500).json({ message: 'Failed to fetch viewpage data' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const viewpage = await Viewpage.findById(req.params.id);
        if (!viewpage) {
            return res.status(404).json({ message: 'Viewpage entry not found' });
        }
        res.json(viewpage);
    } catch (error) {
        console.error('Error fetching viewpage entry:', error);
        res.status(500).json({ message: 'Failed to fetch viewpage entry' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, name, email, phone, message } = req.body;
        
        const newViewpage = new Viewpage({
            id,
            name,
            email,
            phone,
            message
        });

        const savedViewpage = await newViewpage.save();
        res.status(201).json(savedViewpage);
    } catch (error) {
        console.error('Error creating viewpage entry:', error);
        res.status(500).json({ message: 'Failed to create viewpage entry' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedViewpage = await Viewpage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedViewpage) {
            return res.status(404).json({ message: 'Viewpage entry not found' });
        }
        
        res.json(updatedViewpage);
    } catch (error) {
        console.error('Error updating viewpage entry:', error);
        res.status(500).json({ message: 'Failed to update viewpage entry' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedViewpage = await Viewpage.findByIdAndDelete(req.params.id);
        
        if (!deletedViewpage) {
            return res.status(404).json({ message: 'Viewpage entry not found' });
        }
        
        res.json({ message: 'Viewpage entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting viewpage entry:', error);
        res.status(500).json({ message: 'Failed to delete viewpage entry' });
    }
});

module.exports = router; 