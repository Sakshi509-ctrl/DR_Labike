import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';  
import Footer from './footer';
import PhoneInputComponent from './phone-input';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://dr-labike.onrender.com/api/inquiry/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      alert(result.message || 'Thank you! Your message has been sent successfully.');
      
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setMessage('');
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  


  return (
    <>
      <Header />
      <section id="contact" ref={sectionRef} className="py-4 bg-white">
        <div className="min-h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-black-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Contact Us
              </h2>
              <p className={`text-base sm:text-lg text-gray-500 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                Feel free to contact us. We are always here to help you in every possible way.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/5">
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-md w-full">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input className="w-full sm:w-1/2 px-3 py-2 border rounded" type="text" placeholder="First" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input className="w-full sm:w-1/2 px-3 py-2 border rounded" type="text" placeholder="Last" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <PhoneInputComponent
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      country="in"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input className="w-full px-3 py-2 border rounded" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea className="w-full px-3 py-2 border rounded" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-yellow-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>

              <div className="w-full lg:w-3/5 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-100 rounded-lg p-6 flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
                      <p className="text-md text-gray-700 font-bold">+91-706-555-0214</p>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-6 flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                      <p className="text-md text-gray-700 font-bold break-words">Support@drlabike.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 rounded-lg p-6 text-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Our Location</h4>
                  <p className="text-white font-bold text-sm sm:text-base">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</p>
                  <button
                    className="mt-4 bg-white text-green-600 font-bold py-2 px-5 rounded hover:bg-green-700 hover:text-white transition"
                    onClick={() => window.open('https://www.google.com/maps/place/DrLabike/@28.599999,77.100000,15z/data=!4m5!3m4!1s0x390cfd5b347eb66f:0x8c9adbae047ef246!8m2!3d28.599999!4d77.100000', '_blank')}
                  >
                    Get Direction
                  </button>
                </div>
              </div>
            </div>

            <Footer />
            <div className="w-full text-center text-sm text-gray-600 mt-6 mb-4">
              <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

