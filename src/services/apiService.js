import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
      console.log('API Service: Creating blog with data:', blogData);
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      console.log('API Service: Create response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Service: Create failed:', errorText);
        throw new Error(`Failed to create blog: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Service: Create successful:', data);
      return data;
    } catch (error) {
      console.error('API Service: Create error:', error);
      throw error;
    }
  },

  async getBlogs() {
    try {
      console.log('Calling API:', `${API_BASE_URL}/blog`);
      const response = await fetch(`${API_BASE_URL}/blog`);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch blogs: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('getBlogs error:', error);
      throw error;
    }
  },

  async getBlogById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to fetch blog');
    }
  },

  async updateBlog(id, blogData) {
    try {
      console.log('API Service: Updating blog', id, 'with data:', blogData);
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      console.log('API Service: Update response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Service: Update failed:', errorText);
        throw new Error(`Failed to update blog: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Service: Update successful:', data);
      return data;
    } catch (error) {
      console.error('API Service: Update error:', error);
      throw error;
    }
  },

  async deleteBlog(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      return await response.json();
    } catch {
      throw new Error('Failed to delete blog');
    }
  },
  
  async uploadBlogImage(file) {
    try {
      console.log('Starting image upload for file:', file.name, 'Size:', file.size);
      
      const formData = new FormData();
      formData.append('image', file);

      console.log('Calling upload API:', `${API_BASE_URL}/blog/upload`);
      const response = await fetch(`${API_BASE_URL}/blog/upload`, {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      console.log('Upload response headers:', response.headers);

      if (!response.ok) {
        const text = await response.text();
        console.error('Upload failed:', text);
        throw new Error(`Failed to upload image: ${response.status} - ${text}`);
      }

      const data = await response.json();
      console.log('Upload successful, response data:', data);
      return data; 
    } catch (error) {
      console.error('uploadBlogImage error:', error);
      throw error;
    }
  },
};

export default apiService;
export const updateBlog = (id, data) => api.put(`/api/blogs/${id}`, data);
