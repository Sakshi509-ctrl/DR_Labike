const jwt = require("jsonwebtoken");

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!record) return res.status(400).json({ message: "No OTP found" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
