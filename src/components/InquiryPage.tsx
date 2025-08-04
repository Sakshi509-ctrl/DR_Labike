import React, { useState } from 'react';
import Header from './Header';
import Footer from './footer';
import logo from '../../public/assets/logo-drlabike.png';
import PhoneInputComponent from './phone-input';

const InquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    countryCode: '+91',
    email: '',
    streetAddress1: '',
    streetAddressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    inquiry: '',
  });

  const countries = [
    { value: 'af', label: 'Afghanistan' },
  { value: 'al', label: 'Albania' },
  { value: 'dz', label: 'Algeria' },
  { value: 'au', label: 'Australia' },
  { value: 'bd', label: 'Bangladesh' },
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'co', label: 'Colombia' },   
  { value: 'pe', label: 'Peru' },
  { value: 'py', label: 'Paraguay' },
  { value: 'uy', label: 'Uruguay' },
  { value: 've', label: 'Venezuela' },
  { value: 'ec', label: 'Ecuador' },
  { value: 'bo', label: 'Bolivia' },
  { value: 'cr', label: 'Costa Rica' },
  { value: 'do', label: 'Dominican Republic' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'hn', label: 'Honduras' },
  { value: 'ni', label: 'Nicaragua' },
  { value: 'pa', label: 'Panama' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'ru', label: 'Russia' },
  { value: 'kr', label: 'South Korea' }

  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
             <Header />
       <div className="mt-44">
       <div className="flex">
        <div className="flex-1 flex flex-col items-start justify-start p-8">
          <div className="w-full max-w-4xl">
                        <div className="mb-8">
               <div className="flex items-center justify-start mb-4">
                 <div className="relative">
                   <div className="w-32 h-24 rounded-lg flex items-center justify-center">
                     <img src={logo} alt="Dr LaBike Logo" className="w-20 h-28" />
                   </div>
                 </div>
               </div>
             </div>
             <div className="ml-8">
            <h2 className="text-2xl  text-gray-700 text-left mb-0">Inquiry</h2>
</div>
                         <form onSubmit={handleSubmit} className="bg-white  p-8 ">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">First</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}  
                      className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Last</p>
                  </div>
                </div>
              </div>

                <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Phone *
                 </label>
                 <PhoneInputComponent
                   value={formData.phone}
                   onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                   country="in"
                 />
               </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                  
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="streetAddress1"
                      value={formData.streetAddress1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Street Address</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="streetAddressLine2"
                      value={formData.streetAddressLine2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Street Address Line 2</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                      <p className="text-xs text-gray-500 mt-1">City</p>
                    </div>
                    <div>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">State / Province / Region</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <input
                         type="text"
                         name="zip"
                         value={formData.zip}
                         onChange={handleInputChange}
                         className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         required
                       />
                       <p className="text-xs text-gray-500 mt-1">Zip / Postal Code</p>
                     </div>
                      <div>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value=""></option>
                          {countries.map((country) => (
                            <option key={country.value} value={country.label}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Country</p>
                      </div>
                   </div>
                   
                   <div className="mt-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Inquiry 
                     </label>
                     <textarea                          
                       name="inquiry"
                       value={formData.inquiry}
                       onChange={handleInputChange}
                       rows={6}
                       className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                       required
                     />
                   </div>
                </div>
              </div>

                             <button
                 type="submit"
                 className="text-xs bg-blue-700 text-white py-3 px-4 rounded-lg  font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
               >
                 Submit 
               </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default InquiryPage; 