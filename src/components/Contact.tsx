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
      const response = await fetch('http://localhost:5000/api/inquiry/create', {
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
      <section id="contact" ref={sectionRef} className="py-1 bg-white">
        <div style={{ height: '80vh', overflowY: 'auto' }}>
          <div className="wcontainer bg-gray-200 mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl lg:text-6xl font-serif font-bold text-black-900 mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Contact Us
              </h2>
              <p className={`text-lg text-gray-500 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                Feel free to contact us, we are always there to help you out in most possible way
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="basis-full md:basis-2/5">
                <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-0xl shadow-md w-full max-w-xl mx-auto">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <input className="w-1/2 px-3 py-2 border rounded" type="text" placeholder="First" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input className="w-1/2 px-3 py-2 border rounded" type="text" placeholder="Last" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Phone <span className="text-red-500">*</span></label>
                    <PhoneInputComponent
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      country="in"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email <span className="text-red-500">*</span></label>
                    <input className="w-full px-3 py-2 border rounded" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea className="w-full px-3 py-2 border rounded" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-yellow-600 hover:bg-green-800 text-white font-bold py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>

              <div className="basis-full md:basis-4/5 flex flex-col gap-6 justify-center h-full">
                <div className="flex flex-col md:flex-row gap-4 bg-blue-400 p-0 rounded-0xl">
                  <div className="bg-blue rounded-0xl flex flex-col items-center gap-4 p-14 shadow">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h4>
                      <p className="text-lg text-gray-700 font-bold">+91-706-555-0214</p>
                    </div>
                  </div>

                  <div className="bg-blue rounded-0xl flex flex-col items-center gap-4 p-14 shadow">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h4>
                      <p className="text-center text-lg text-gray-700 font-bold">Support@drlabike.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 rounded-0xl flex flex-col items-center gap-6 p-14 shadow">
                  <div className="w-16 h-18 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-white mb-1">Our Location</h4>
                    <p className="text-lg text-white font-bold">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</p>
                    <button
                      className="bg-white text-green-600 font-bold py-3 px-7 rounded mt-4 hover:bg-green-500 hover:text-white"
                      onClick={() => window.open('https://www.google.com/maps/place/DrLabike/@28.599999,77.100000,15z/data=!4m5!3m4!1s0x390cfd5b347eb66f:0x8c9adbae047ef246!8m2!3d28.599999!4d77.100000', '_blank')}
                    >
                      Get Direction
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Footer />
          <div className="w-full flex justify-center font-bold text-gray-600 mt-0 mb-4">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
