import axios from 'axios';

const API_BASE_URL = 'https://dr-labike.onrender.com/api';

const apiService = {
  async submitContactForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/contact-forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to submit contact form');
    }
  },

  async getContactForms() {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/contact-forms`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact forms');
      }
      const data = await response.json();
      return data.data || data;
    } catch {
      throw new Error('Failed to fetch contact forms');
    }
  },

  async deleteContactForm(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/contact-forms/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact form');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to delete contact form');
    }
  },

  async submitInquiryForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiry/inquiry-forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', response.status, errorData);
        throw new Error(`Server error: ${response.status} - ${errorData}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Network error:', error);
      if (error.message.includes('Server error:')) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to server');
    }
  },

  async getInquiryForms() {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiry/inquiry-forms`);
      if (!response.ok) {
        throw new Error('Failed to fetch inquiry forms');
      }
      const data = await response.json();
      return data.data || data;
    } catch {
      throw new Error('Failed to fetch inquiry forms');
    }
  },

  async deleteInquiryForm(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiry/inquiry-forms/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete inquiry form');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to delete inquiry form');
    }
  },


  async getMedicalContent() {
    try {
      const response = await fetch(`${API_BASE_URL}/medical-content`);
      if (!response.ok) {
        throw new Error('Failed to fetch medical content');
      }
      const data = await response.json();
      return data.data || data;
    } catch {
      throw new Error('Failed to fetch medical content');
    }
  },

  async updateMedicalContent(contentId, value) {
    try {
      const response = await fetch(`${API_BASE_URL}/medical-content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) {
        throw new Error('Failed to update medical content');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to update medical content');
    }
  },

  async updateMedicalImage(contentId, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/medical-content/image/${contentId}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to upload image');
    }
  },
  async createBlog(blogData) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to create blog');
    }
  },
  
};

export default apiService;