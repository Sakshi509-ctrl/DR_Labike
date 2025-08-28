module.exports = {
    cors: {
        origin: [
            "https://dr-labike.onrender.com",
            "https://dr-labike-frontend.onrender.com",
            "http://localhost:5173" 
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
    },
    
    database: {
        options: {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 10,
            minPoolSize: 2,
            retryWrites: true,
            w: 'majority'
        }
    },
    
    server: {
        port: process.env.PORT || 5000,
        host: '0.0.0.0', 
        timeout: 30000
    },
    
    security: {
        rateLimit: {
            windowMs: 15 * 60 * 1000, 
            max: 100 
        }
    }
};
