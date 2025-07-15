import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        <div className="container bg-gray-200 mx-auto px-4">
          <div className="text-center  mb-16">
            <h2 className={`text-4xl lg:text-6xl font-serif font-bold  text-black-900 mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Contact Us
            </h2>
            <p className={`text-lg text-gray-500  max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              Feel free to contact us, we are always there to help you out in most possible way
            </p>
          </div>
          {/* Add the classic form below the title */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Contact Form (left) */}
            <div className="basis-full md:basis-2/5">
              <form className="bg-gray-100 p-8 rounded-0xl shadow-md w-full max-w-xl mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Name <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <input className="w-1/2 px-3 py-2 border rounded" type="text" placeholder="First" required />
                    <input className="w-1/2 px-3 py-2 border rounded" type="text" placeholder="Last" required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Phone <span className="text-red-500">*</span></label>
                  <input className="w-full px-3 py-2 border rounded" type="tel" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email <span className="text-red-500">*</span></label>
                  <input className="w-full px-3 py-2 border rounded" type="email" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Message <span className="text-red-500">*</span></label>
                  <textarea className="w-full px-3 py-2 border rounded" rows={4} required></textarea>
                </div>
                <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded">Submit</button>
              </form>
            </div>
            {/* Contact Info Cards (right) */}
            <div className="basis-full md:basis-4/5 flex flex-col gap-0 justify-center">
              <div className="flex flex-col md:flex-row gap-0 bg-blue-400 p-0 rounded-0xl">
                {/* Call Us */}
                <div className="flex-1 bg-blue- rounded-0xl flex items-center gap-6 p-10 shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-9 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h4>
                    <p className="text-lg text-gray-700 font-bold">+91-706-555-0214</p>
                  </div>
                </div>
                {/* Email Us */}
                <div className="flex-1 bg-blue rounded-0xl flex items-center gap-6 p-10 shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h4>
                    <p className="text-lg text-gray-700 font-bold">Support@drlabike.com</p>
                  </div>
                </div>
              </div>
              {/* Our Location (full width below) */}
              <div className="bg-green-600 rounded-0xl flex items-center gap-6 p-10 shadow mt-0">
                <div className="w-16 h-18 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-1">Our Location</h4>
                  <p className="text-lg text-white font-bold">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
    
  );
};

export default Contact; 