import React from 'react';
import former from '../../public/assets/former-CHfKJIy1.png';
import Header from './Header';
import Footer from './footer';

const TestimonialPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8fefd] flex flex-col items-center pt-12 pb-20 px-2">
        <h1 className="text-5xl font-extrabold text-center mb-8 mt-2" style={{fontFamily: 'inherit'}}>Testimonial</h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
         
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
            <img src={former} alt="Loknath Sharma" className="w-48 h-60 object-cover rounded-2xl shadow-md" />
          </div>
         
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="text-2xl md:text-3xl font-bold text-black text-center md:text-left tracking-wide mb-2" style={{letterSpacing: '2px'}}>LOKNATH SHARMA – CARPENTER, NYAYPUR (CHAUSA)</div>
            <div className="text-lg md:text-xl font-bold text-black text-center md:text-left mb-4" style={{lineHeight: '1.6'}}>
              I am find it difficult to go for health checkup due to my work responsibilities and money restrictions. LaBike services at our doorstep is helpful in our health diagnosis and treatment. Now I don’t have to go other places for diagnosis and treatment which saves my working time and money both.
            </div>
      
            <div className="flex items-center mt-2 mb-2">
              <span className="text-green-500 text-2xl mr-1">★</span>
              <span className="text-green-500 text-2xl mr-1">★</span>
              <span className="text-green-500 text-2xl mr-1">★</span>
              <span className="text-green-500 text-2xl mr-1">★</span>
              <span className="text-green-500 text-2xl">★</span>
            </div>
          
            <div className="flex justify-end w-full mt-4">
              <span className="text-gray-300 text-6xl font-bold opacity-60 select-none">G+</span>
            </div>
          </div>
        </div>
        <Footer />
          <div className="w-full flex justify-center font-bold text-gray-600 mt-5   ">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
      </div>
    </>
  );
};

export default TestimonialPage; 