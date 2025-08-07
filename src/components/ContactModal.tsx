import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    service: 'Checkup'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-[#E5D9D9] rounded-lg shadow-xl w-68 max-w-md mx-4 mr-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900">Contact Us!</h2>
            <button
              onClick={onClose}
              className="text-pink-500 hover:text-pink-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

         <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your Mobile Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
              <option value="Surrogacy">Surrogacy</option>
              <option value="IVF">IVF</option>
              <option value="Pathology Tests">Pathology Tests</option>
              <option value="Checkup">Checkup</option>
              <option value="Teleconsultation">Teleconsultation</option>
              <option value="Medicine">Medicine</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-orange-900  text-white font-bold py-1 px-4  transition-colors duration-200 shadow-lg" >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal; 