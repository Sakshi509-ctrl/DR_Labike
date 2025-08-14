const cloudinary = require('cloudinary').v2;

console.log('Loading Cloudinary config...');
console.log('Environment variables:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
  api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
});

if (process.env.CLOUDINARY_CLOUD_NAME) {
  console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
}
if (process.env.CLOUDINARY_API_KEY) {
  console.log('API Key length:', process.env.CLOUDINARY_API_KEY.length);
  console.log('API Key starts with:', process.env.CLOUDINARY_API_KEY.substring(0, 4) + '...');
}
if (process.env.CLOUDINARY_API_SECRET) {
  console.log('API Secret length:', process.env.CLOUDINARY_API_SECRET.length);
  console.log('API Secret starts with:', process.env.CLOUDINARY_API_SECRET.substring(0, 4) + '...');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary config loaded successfully');

module.exports = cloudinary;
