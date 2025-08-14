# API Integration Guide for Contact Form

## Overview
Your contact form is now configured to send data to your Node.js backend API. Here's how to set it up and use it.

## Backend API Setup

### 1. Expected API Endpoint
Your Node.js backend should have an endpoint at:
```
POST /api/contact
```

### 2. Expected Request Format
The contact form sends data in this format:
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "phone": "+91-1234567890",
  "email": "john@example.com",
  "message": "Hello, I have a question...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Expected Response Format
Your backend should respond with:
```json
{
  "success": true,
  "message": "Thank you! Your message has been received."
}
```

## Quick Setup

### 1. Backend Setup
1. **Copy the backend files** to your Node.js project:
   - `backend-example.js` - Main server file
   - `backend-package.json` - Dependencies

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

### 2. Frontend Setup
Your React frontend is already configured to call:
- **URL**: `http://localhost:5000/api/contact`
- **Method**: POST
- **Headers**: `Content-Type: application/json`

## Node.js Backend Example

The `backend-example.js` file contains a complete working example:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message, timestamp } = req.body;
    
    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    console.log('📧 Contact form submission received:');
    console.log('Name:', `${firstName} ${lastName}`);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Timestamp:', timestamp);
    
    res.json({
      success: true,
      message: 'Thank you! Your message has been received successfully.'
    });
    
  } catch (error) {
    console.error(' Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
```

## Features Implemented

### 1. Form Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Client-side validation before API call

### 2. User Experience
- ✅ Loading state during submission
- ✅ Disabled submit button while processing
- ✅ Success/error messages
- ✅ Form clearing after successful submission

### 3. Error Handling
- ✅ Network error handling
- ✅ Server error handling
- ✅ User-friendly error messages

### 4. Data Processing
- ✅ Trims whitespace from all fields
- ✅ Adds timestamp to submissions
- ✅ Structured data format

## Testing Your Integration

1. **Start your Node.js backend**:
   ```bash
   cd your-backend-folder
   npm install
   npm start
   ```

2. **Start your React frontend**:
   ```bash
   npm run dev
   ```

3. **Fill out the contact form** and submit
4. **Check your backend console** for the received data
5. **Verify the success message** appears in the frontend

## Production Deployment

### 1. Backend Deployment
1. **Deploy your Node.js backend** to your hosting provider (Heroku, Vercel, Railway, etc.)
2. **Note your production backend URL**

### 2. Frontend Configuration
Update the API URL in `src/components/Contact.tsx`:

```javascript
const response = await fetch('http://localhost:5000/api/contact', {
const response = await fetch('https://your-backend-domain.com/api/contact', {
```

### 3. Environment Variables (Optional)
For better configuration management, you can use environment variables:

1. **Create `.env` file** in your React project root:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

2. **Update the fetch call** in Contact.tsx:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   const response = await fetch(`${API_URL}/api/contact`, {
   ```

## Extending Your Backend

You can enhance your backend by adding:

### 1. Database Integration
```javascript
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const contact = new Contact({
  firstName, lastName, phone, email, message, timestamp
});
await contact.save();
```

### 2. Email Notifications
```javascript
const nodemailer = require('nodemailer');

await transporter.sendMail({
  from: 'your-email@domain.com',
  to: 'admin@drlabike.com',
  subject: 'New Contact Form Submission',
  text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`
});
```

### 3. Additional Endpoints
```javascript
app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find().sort({ timestamp: -1 });
  res.json(contacts);
});

app.delete('/api/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
```

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure your backend has CORS enabled
2. **Port Already in Use**: Change the port in backend-example.js
3. **Network Error**: Check if your backend is running and accessible
4. **Validation Errors**: Ensure all required fields are filled

### Testing the API:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+91-1234567890",
    "email": "john@example.com",
    "message": "Test message"
  }'
``` 