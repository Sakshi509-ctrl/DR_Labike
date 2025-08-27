const Inquiry = require('../models/inquiry');

const getContactForms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Inquiry.countDocuments();
    const forms = await Inquiry.find()
      .sort({ timestamp: -1 }) 
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: forms,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact forms",
      error: error.message,
    });
  }
};

module.exports = { getContactForms };
