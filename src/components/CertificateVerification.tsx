import React, { useState } from 'react';
import Header from './Header';
import Footer from './footer';

const CertificateVerification: React.FC = () => {
  const [certificateCode, setCertificateCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate code submitted:', certificateCode);
  };

  return (
    <>
      <Header />
      <div className="mt-24 mb-28">
                   <div className="flex justify-center items-start pt-20 bg-white pb-8">
                          <div className="w-full max-w-2xl px-4 px:md-8">
                  <h1 className="text-4xl font-sans-serif font-semibold text-gray-900 mb-24 -mt-8 px-4 px:md-8 ">Certificate Verifications</h1>
             
             <div className="bg-[#f7f8fd] rounded-lg border-2 border-purple-200 shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex">
                      <input
                        type="text"
                        value={certificateCode}
                        onChange={(e) => setCertificateCode(e.target.value)}
                        placeholder="Enter Certificate Code"
                        className="flex-1 px-14 py-3 border border-black  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 px:md-8"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-black text-white px-14 py-3  font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors px-4 px:md-8"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
         </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default CertificateVerification; 