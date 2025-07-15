import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const TestimonialPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fefd] flex flex-col items-center pt-12 pb-20 px-2">
      <h1 className="text-5xl font-extrabold text-center mb-8 mt-2" style={{fontFamily: 'inherit'}}>Testimonial</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
        {/* Left: Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
          <img src="/former.png" alt="Loknath Sharma" className="w-48 h-60 object-cover rounded-2xl shadow-md" />
        </div>
        {/* Right: Testimonial Content */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-2xl md:text-3xl font-bold text-black text-center md:text-left tracking-wide mb-2" style={{letterSpacing: '2px'}}>LOKNATH SHARMA – CARPENTER, NYAYPUR (CHAUSA)</div>
          <div className="text-lg md:text-xl font-bold text-black text-center md:text-left mb-4" style={{lineHeight: '1.6'}}>
            I am find it difficult to go for health checkup due to my work responsibilities and money restrictions. LaBike services at our doorstep is helpful in our health diagnosis and treatment. Now I don’t have to go other places for diagnosis and treatment which saves my working time and money both.
          </div>
          {/* Star Rating */}
          <div className="flex items-center mt-2 mb-2">
            <span className="text-green-500 text-2xl mr-1">★</span>
            <span className="text-green-500 text-2xl mr-1">★</span>
            <span className="text-green-500 text-2xl mr-1">★</span>
            <span className="text-green-500 text-2xl mr-1">★</span>
            <span className="text-green-500 text-2xl">★</span>
          </div>
          {/* Google Plus Icon (optional, bottom right) */}
          <div className="flex justify-end w-full mt-4">
            <span className="text-gray-300 text-6xl font-bold opacity-60 select-none">G+</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 mb-8 flex flex-col md:flex-row items-start gap-8 text-white bg-black rounded-xl p-8">
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
          <img src="/DrLabike-New-logo-trans (1).png" alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
          <span className="text-lg font-bold">DrLaBike</span>
        </div>
        {/* Columns on the right */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li>&#9654; About</li>
              <li>&#9654; Gallery</li>
              <li>&#9654; Testimonial</li>
              <li>&#9654; Blogs</li>
              <li>&#9654; Inquiry</li>
              <li>&#9654; Verification</li>
            </ul>
          </div>
          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-3">Policies</h3>
            <ul className="space-y-2">
              <li>&#9654; Privacy Policy</li>
              <li>&#9654; Shipping Policy</li>
              <li>&#9654; Terms & Conditions</li>
              <li>&#9654; Refund & Cancellation</li>
            </ul>
          </div>
          {/* Address */}
          <div>
            <h3 className="text-lg font-bold mb-3">Address</h3>
            <div className="mb-2">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📍</span>
              <span>G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📞</span>
              <span>+91-706-555-0214</span>
            </div>
            {/* Follow Us Icons */}
            <div className="mt-4">
              <div className="font-bold mb-2">Follow Us</div>
              <div className="flex gap-4 mb-4">
                <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
                <a href="#" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
                <a href="#" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
                <a href="#" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default TestimonialPage; 