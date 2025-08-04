const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });
const express = require("express");
const cors = require("cors");




const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable is required");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

const inquiryRoutes = require("./routes/inquiryroute");
const signupRoutes = require("./routes/signupRoute");
const contactRoutes = require("./routes/contactRoute");
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user", signupRoutes);
app.use("/api/contact", contactRoutes);

const dbConnect = require("./config/database");

const buildPath = path.join(__dirname, '../', 'dist');
app.use(express.static(buildPath));

app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


const startServer = async () => {
    try {
        await dbConnect();
        console.log(" Database connected successfully");

        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(" Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
