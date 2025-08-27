const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;


if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI environment variable is required");
  process.exit(1);
}

app.use(
  cors({
    origin: ["http://localhost:5173", "https://dr-labike.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const inquiryRoutes = require("./routes/inquiryroute");
const signupRoutes = require("./routes/signupRoute");
const contactRoutes = require("./routes/contactRoute");
const logoutRoutes = require("./routes/logout");
const viewpageRoutes = require("./routes/viewpageRoute");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const loginRoute = require("./routes/loginRoute");
const bloghistoryroute = require("./routes/bloghistoryroute");
const editorSummaryRoutes = require("./routes/editorSummary");


app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user", signupRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/viewpage", viewpageRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", bloghistoryroute);
app.use("/api/editorSummary", editorSummaryRoutes);
app.use("/api/login", loginRoute);


app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

const buildPath = path.join(__dirname, "../", "dist");
app.use(express.static(buildPath));
app.get("/*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const startServer = async () => {
  try {
    await dbConnect();

    const findAvailablePort = async (startPort) => {
      const net = require('net');
      return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            resolve(findAvailablePort(startPort + 1));
          } else {
            reject(err);
          }
        });
        
        server.listen(startPort, () => {
          server.close(() => {
            resolve(startPort);
          });
        });
      });
    };

    const availablePort = await findAvailablePort(PORT);
    
    const server = app.listen(availablePort, () => {
      console.log(` Server running at http://localhost:${availablePort}`);
      if (availablePort !== PORT) {
        console.log(` Original port ${PORT} was in use, using port ${availablePort} instead`);
      }
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
      } else {
        console.error(' Server error:', error.message);
      }
      process.exit(1);
    });

    const shutdown = () => {
      console.log('\nShutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
      
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};


if (process.platform === 'win32') {
  const { execSync } = require('child_process');
  try {
    execSync(`netstat -ano | findstr :${PORT}`).toString().split('\n').forEach(line => {
      const pid = line.trim().split(/\s+/)[4];
      if (pid) {
        try {
          execSync(`taskkill /F /PID ${pid}`);
          console.log(`Killed process ${pid} using port ${PORT}`);
        } catch (e) {
         
        }
      }
    });
  } catch (e) {

  }
}

startServer();
