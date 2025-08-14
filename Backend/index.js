const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
    console.error(" MONGO_URI environment variable is required");
    process.exit(1);
}

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://dr-labike.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const inquiryRoutes = require("./routes/inquiryroute");
const signupRoutes = require("./routes/signupRoute");
const contactRoutes = require("./routes/contactRoute");
const logoutRoutes = require("./routes/logout");
const viewpageRoutes = require("./routes/viewpageRoute");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user", signupRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/viewpage", viewpageRoutes);
app.use("/api/blog", blogRoutes);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

const buildPath = path.join(__dirname, '../', 'dist');
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const dbConnect = require("./config/database");
const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(" Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
