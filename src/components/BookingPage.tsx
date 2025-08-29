import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { emailConfig } from '../config/emailConfig';

interface BookingForm {
  name: string;
  email: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    console.log('Modal state changed to:', showSuccessModal);
  }, [showSuccessModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
   
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setCurrentBookingId(bookingId);
    
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      
      const adminTemplateParams = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        description: formData.description,
        to_email: 'sakshi.otusone@gmail.com',  
        email_to: 'sakshi.otusone@gmail.com',  
        admin_email: 'sakshi.otusone@gmail.com', 
        booking_id: bookingId,
        appointment_date: formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : 'Not specified',
        booking_time: formData.preferredTime || 'Not specified'
      };

     
      const adminServiceId = 'service_5nj4a3q';
      const adminTemplateId = 'template_6nhdzb8';
      console.log('Sending admin notification with:', { adminServiceId, adminTemplateId });
      console.log('Admin template params:', adminTemplateParams);
      
      let adminResult = null;
      try {
        adminResult = await emailjs.send(
          adminServiceId,  
          adminTemplateId, 
          adminTemplateParams,
          emailConfig.userId 
        );
        console.log('Admin email result:', adminResult);
      } catch (emailError) {
        console.log('Admin email failed, but continuing with form submission:', emailError);
      }

      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        email_to: formData.email, 
        booking_id: bookingId,
        appointment_date: formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : 'Not specified',
        booking_time: formData.preferredTime || 'Not specified'
      };

      console.log('Sending user confirmation...');
      
      const userServiceId = 'service_5nj4a3q';
      const userTemplateId = 'template_6nhdzb8';
      console.log('Sending user confirmation with:', { userServiceId, userTemplateId });
      console.log('User template params:', userTemplateParams);
      
      let userResult = null;
      try {
        userResult = await emailjs.send(
          userServiceId,  
          userTemplateId, 
          userTemplateParams,
          emailConfig.userId 
        );
        console.log('User email result:', userResult);
      } catch (emailError) {
        console.log('User email failed, but continuing with form submission:', emailError);
      }

     
      console.log('=== FORM SUBMITTED SUCCESSFULLY ===');
      console.log('Admin result:', adminResult);
      console.log('User result:', userResult);
      console.log('Setting modal to true...');
      setShowSuccessModal(true);
      console.log('Modal state after setShowSuccessModal(true):', showSuccessModal);
      
      // Store booking data for admin to see
      const newBooking = {
        id: bookingId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        description: formData.description,
        appointmentDate: formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Not specified',
        bookingTime: formData.preferredTime || 'Not specified',
        status: 'pending' as const,
        submittedAt: new Date()
      };
      
      // Store in localStorage (in real app, this would go to your backend)
      const existingBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('adminBookings', JSON.stringify(existingBookings));
      
      console.log('✅ Booking stored successfully!');
      console.log('New booking:', newBooking);
      console.log('All bookings in localStorage:', existingBookings);
      console.log('localStorage key "adminBookings":', localStorage.getItem('adminBookings'));
      
      
      setSelectedDate(formData.preferredDate);
      setSelectedTime(formData.preferredTime);
      
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        preferredDate: '',
        preferredTime: '',
        description: ''
      });
      
      console.log('Form reset complete');
      
      
      if (adminResult && userResult) { 
        console.log('✅ Both emails sent successfully!');
      } else {
        console.log('⚠️ Some emails may have failed, but form was submitted');
        if (!adminResult) {
          console.log('Admin email failed:', adminResult);
        }
        if (!userResult) {
          console.log('User email failed:', userResult);
        }
      }
    } catch (error) {
      console.error('=== ERROR IN FORM SUBMISSION ===');
      console.error('Full error object:', error);
      
     
      console.log('Showing success modal despite error...');
      setShowSuccessModal(true);
      
      
      setSelectedDate(formData.preferredDate);
      setSelectedTime(formData.preferredTime);
      
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        preferredDate: '',
        preferredTime: '',
        description: ''
      });
      
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8 ">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-500 mb-4">Book Your Appointment</h1>
          <p className="text-lg text-gray-500">Fill in your details below and we'll get back to you shortly</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Please select a future date</p>
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Business hours: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description / Reason for Visit *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Please describe your symptoms, concerns, or reason for booking an appointment..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

                <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need immediate assistance? Call us at{' '}
            <span className="text-blue-700 font-semibold">+91-706-555-0214</span>
          </p>
          
         
        </div>
      </div>
      
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setShowSuccessModal(false);
            setSelectedDate('');
            setSelectedTime('');
          }}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your booking request has been submitted successfully.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
                <p className="text-sm text-gray-600 mb-2"><strong>Booking ID:</strong> {currentBookingId}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Preferred Date:</strong> {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Preferred Time:</strong> {selectedTime || 'Not specified'}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> <span className="text-yellow-600 font-medium">Pending Approval</span></p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                We'll review your request and send you a confirmation email once approved.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
