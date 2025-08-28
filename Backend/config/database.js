const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
            bufferMaxEntries: 0, 
            maxPoolSize: 10, 
            minPoolSize: 2, 
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        console.log(`Connection State: ${conn.connection.readyState}`);
        
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Mongoose disconnected from MongoDB');
        });
        
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
        
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('🔍 Error details:', error);
        
        if (error.name === 'MongoNetworkError') {
            console.error('Network Error: Check your internet connection and MongoDB URI');
        } else if (error.name === 'MongoServerSelectionError') {
            console.error('Server Selection Error: MongoDB server might be down or unreachable');
        } else if (error.name === 'MongoParseError') {
            console.error('Parse Error: Check your MongoDB connection string format');
        }
        
        throw error;
    }
};

module.exports = dbConnect;
