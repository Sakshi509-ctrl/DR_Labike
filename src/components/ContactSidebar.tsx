import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';

const ContactSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Contact Us Button */}
      <button
        className="fixed top-1/3 left-0 z-[9999] flex items-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-2 py-3 rounded-r-lg shadow-lg transition-colors rotate-[-90deg] origin-bottom-left"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        onClick={() => setOpen(true)}
      >
        <Mail className="w-4 h-4 mb-1 inline-block" />
        <span className="font-semibold ml-1">Contact Us</span>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-fade-in-up">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setOpen(false)}
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