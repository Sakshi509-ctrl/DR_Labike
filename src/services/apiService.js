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
};

export default apiService;
