#!/usr/bin/env node

/**
 * Test script to debug deployment issues
 * Run this locally to test your production configuration
 */

require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing deployment configuration...\n');

console.log('1. Environment Variables Check:');
console.log('   MONGO_URI:', process.env.MONGO_URI ? ' Set' : ' Missing');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? ' Set' : ' Missing');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('   PORT:', process.env.PORT || '5000');
console.log('');

async function testDatabase() {
    console.log('2. Database Connection Test:');
    
    if (!process.env.MONGO_URI) {
        console.log('    Cannot test database - MONGO_URI not set');
        return false;
    }
    
    try {
        console.log('    Attempting to connect...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });
        
        console.log('    Connected successfully!');
        console.log('    Host:', conn.connection.host);
        console.log('    Database:', conn.connection.name);
        console.log('    State:', conn.connection.readyState);
        
        await mongoose.connection.close();
        console.log('    Connection closed');
        return true;
        
    } catch (error) {
        console.log('    Connection failed:', error.message);
        
        if (error.name === 'MongoNetworkError') {
            console.log('    Tip: Check your internet connection and MongoDB URI');
        } else if (error.name === 'MongoServerSelectionError') {
            console.log('    Tip: MongoDB server might be down or unreachable');
        } else if (error.name === 'MongoParseError') {
            console.log('    Tip: Check your MongoDB connection string format');
        }
        
        return false;
    }
}

function testExpress() {
    console.log('3. Express App Test:');
    
    try {
        const express = require('express');
        const app = express();
        
        app.get('/test', (req, res) => {
            res.json({ message: 'Express is working!' });
        });
        
        console.log('    Express app created successfully');
        console.log('    Basic route added');
        return true;
        
    } catch (error) {
        console.log('    Express test failed:', error.message);
        return false;
    }
}

function testDependencies() {
    console.log('4. Dependencies Check:');
    
    const required = ['express', 'mongoose', 'cors', 'dotenv', 'bcryptjs'];
    let allGood = true;
    
    required.forEach(dep => {
        try {
            require(dep);
            console.log(`    ${dep}`);
        } catch (error) {
            console.log(`    ${dep}: ${error.message}`);
            allGood = false;
        }
    });
    
    return allGood;
}

async function runTests() {
    console.log('Starting deployment tests...\n');
    
    const results = {
        env: process.env.MONGO_URI && process.env.JWT_SECRET,
        db: false,
        express: false,
        deps: false
    };
    
    results.express = testExpress();
    results.deps = testDependencies();
    results.db = await testDatabase();
    
        console.log('\nTest Results Summary:');
    console.log('   Environment Variables:', results.env ? ' Set' : ' Missing');
    console.log('   Database Connection:', results.db ? ' Set' : ' Missing');
    console.log('   Express App:', results.express ? ' Set' : ' Missing');
    console.log('   Dependencies:', results.deps ? ' Set' : ' Missing');
    
    if (results.env && results.db && results.express && results.deps) {
        console.log('\nAll tests passed! Your app should deploy successfully.');
        console.log('Next steps:');
        console.log('   1. Commit and push your changes');
        console.log('   2. Monitor Render deployment logs');
        console.log('   3. Test the health endpoint: /api/health');
    } else {
        console.log('\nSome tests failed. Please fix the issues before deploying.');
        console.log('Check the error messages above for guidance.');
    }
    
    process.exit(results.env && results.db && results.express && results.deps ? 0 : 1);
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

runTests();
