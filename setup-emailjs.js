#!/usr/bin/env node

console.log('🚀 EmailJS Setup Helper for DrLaBike');
console.log('=====================================\n');

console.log('📋 Follow these steps to set up EmailJS:\n');

console.log('1️⃣ Create EmailJS Account:');
console.log('   • Go to https://www.emailjs.com/');
console.log('   • Sign up for a free account');
console.log('   • Verify your email address\n');

console.log('2️⃣ Create Email Service:');
console.log('   • In dashboard, go to "Email Services"');
console.log('   • Click "Add New Service"');
console.log('   • Choose "Gmail" or "Outlook"');
console.log('   • Connect your email account');
console.log('   • Copy the Service ID (service_abc123)\n');

console.log('3️⃣ Create Email Template:');
console.log('   • Go to "Email Templates"');
console.log('   • Click "Create New Template"');
console.log('   • Use these variables in your template:');
console.log('     - {{name}} - Patient name');
console.log('     - {{email}} - Patient email');
console.log('     - {{phoneNumber}} - Patient phone');
console.log('     - {{description}} - Booking description');
console.log('   • Copy the Template ID (template_xyz789)\n');

console.log('4️⃣ Get User ID:');
console.log('   • Go to "Account" → "API Keys"');
console.log('   • Copy your Public Key (user_def456)\n');

console.log('5️⃣ Update Configuration:');
console.log('   • Open DR_Labike/src/config/emailConfig.ts');
console.log('   • Replace placeholder values with your real IDs\n');

console.log('6️⃣ Test the System:');
console.log('   • Start frontend: npm run dev');
console.log('   • Go to /booking page');
console.log('   • Submit a test booking');
console.log('   • Check your email!\n');

console.log('🎯 Need help? Check the EmailJS dashboard for detailed error messages!');
console.log('📚 Full guide: DR_Labike/EMAILJS_SETUP.md');
