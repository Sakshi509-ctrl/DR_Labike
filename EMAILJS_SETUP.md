# 🚀 EmailJS Setup Guide for DrLaBike

## 📋 **What is EmailJS?**
EmailJS allows you to send emails directly from your frontend without a backend server. It's perfect for simple contact forms and booking confirmations.

## 🔧 **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## 📧 **Step 2: Create Email Service**
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook"
4. Connect your email account
5. **Copy the Service ID** (looks like: `service_abc123`)

## 📝 **Step 3: Create Email Template**
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with these variables:
   - `{{name}}` - Patient's name
   - `{{email}}` - Patient's email
   - `{{phoneNumber}}` - Patient's phone
   - `{{description}}` - Booking description
4. **Copy the Template ID** (looks like: `template_xyz789`)

## 👤 **Step 4: Get User ID**
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. **Copy your Public Key** (looks like: `user_def456`)

## ⚙️ **Step 5: Update Configuration**
1. Open `DR_Labike/src/config/emailConfig.ts`
2. Replace the placeholder values with your real IDs:

```typescript
export const emailConfig = {
  serviceId: 'service_abc123', // Your real service ID
  templateId: 'template_xyz789', // Your real template ID
  userId: 'user_def456', // Your real user ID
};
```

## 🧪 **Step 6: Test the System**
1. Start your frontend: `npm run dev`
2. Go to `/booking` page
3. Submit a test booking
4. Check your email for confirmation!

## 🆘 **Troubleshooting**
- **"Service ID not found"** → Check your service ID in EmailJS dashboard
- **"Template ID not found"** → Check your template ID in EmailJS dashboard
- **"User ID not found"** → Check your public key in EmailJS dashboard

## 💡 **Pro Tips**
- Use a professional email template design
- Test with your own email first
- Keep your API keys secure (don't commit them to public repos)

---
**Need help?** Check the EmailJS dashboard for detailed error messages!
