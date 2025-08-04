import React, { createContext, useContext, useState } from 'react';
import { X, Mail } from 'lucide-react';

type ContactSidebarContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactSidebarContext = createContext<ContactSidebarContextType | undefined>(undefined);

export const useContactSidebar = () => {
  const ctx = useContext(ContactSidebarContext);
  if (!ctx) throw new Error('useContactSidebar must be used within ContactSidebarProvider');
  return ctx;
};

export const ContactSidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <ContactSidebarContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactSidebarContext.Provider>
  );
};

const ContactSidebar: React.FC = () => {
  const { isOpen, close } = useContactSidebar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact/contact-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      alert(result.message || 'Thank you! Your message has been sent successfully.');
      
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      });
      
      close();
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return (
    <>

      <button
        className="fixed top-1/3 left-0 z-[9999] flex items-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-2 py-3 rounded-r-lg shadow-lg transition-colors rotate-[-90deg] origin-bottom-left"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        onClick={() => close()}
      >
        <Mail className="w-4 h-4 mb-1 inline-block" />
        <span className="font-semibold ml-1">Contact Us</span>
      </button>

      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-fade-in-up">
          
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={close}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-[#7c3aed] mb-6">Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <textarea
                name="message"
                placeholder="Message*"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700 min-h-[80px] resize-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-gray-400 text-white font-bold py-3 rounded-full text-lg mt-2 transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSidebar; 