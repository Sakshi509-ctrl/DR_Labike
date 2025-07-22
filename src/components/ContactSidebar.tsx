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
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
              />
              <input
                type="tel"
                placeholder="Phone*"
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700"
                required
              />
              <textarea
                placeholder="Message"
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-gray-700 min-h-[80px] resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-3 rounded-full text-lg mt-2 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSidebar; 