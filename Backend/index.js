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
app.use("/api/inquiry", inquiryRoutes);

app.get("/", (req, res) => {
    res.send("Server is running and connected to database");
});

const dbConnect = require("./config/database");

const startServer = async () => {
    try {
        await dbConnect();
        console.log(" Database connected successfully");
        
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(" Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
