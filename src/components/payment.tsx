import React from "react";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row p-6 md:p-16 gap-10 font-sans">
      {/* Left Info Section */}
      <div className="md:w-1/2">
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="logo" className="w-12 h-12 mr-3" />
          <h1 className="text-xl font-bold text-blue-900">swasthmanthan meditech pvt ltd</h1>
        </div>

        <h2 className="text-2xl font-semibold text-blue-900 mb-2">Drlabike (ST Clinic)</h2>
        <div className="w-12 h-1 bg-blue-600 mb-4"></div>
        <p className="text-gray-600 mb-6">
          In static model we will setup a Tele-consulting infra and static laboratory for performing lab tests. Branding and business support from brand only.
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Share this on:</h3>
          <div className="flex gap-3">
            <a href="#"><img src="/facebook.svg" alt="fb" className="w-6 h-6" /></a>
            <a href="#"><img src="/x-twitter.svg" alt="x" className="w-6 h-6" /></a>
            <a href="#"><img src="/whatsapp.svg" alt="wa" className="w-6 h-6" /></a>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800">Contact Us:</h3>
          <p className="text-sm mt-2">📧 info@swasthmanthan.com</p>
          <p className="text-sm">📞 8750740000</p>
        </div>

        <div className="mb-10">
          <h3 className="font-semibold text-gray-800">Terms & Conditions:</h3>
          <p className="text-sm text-gray-600 mt-2">
            You agree to share information entered on this page with swasthmanthan meditech pvt ltd (owner of this page) and Razorpay, adhering to applicable laws.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          <img src="/razorpay-logo.png" alt="Razorpay" className="w-24 mb-1" />
          <p>
            Want to create page like this for your Business? Visit{" "}
            <a href="https://razorpay.com/payment-pages" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Razorpay Payment Pages
            </a>
          </p>
          <a href="#" className="text-xs text-blue-500 mt-2 block">🚩 Report Page</a>
        </div>
      </div>

      {/* Right Payment Form */}
      <div className="bg-white shadow-lg rounded-xl p-8 md:w-1/2">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Payment Details</h2>
        <div className="w-10 h-1 bg-blue-600 mb-6"></div>

        {/* Booking Amount */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Booking Amount</label>
          <div className="flex border rounded-md overflow-hidden">
            <span className="bg-gray-100 px-3 py-2 text-gray-800 border-r">₹50,000.00</span>
            <div className="flex items-center px-3 py-2 gap-2 border-l">
              <button className="text-xl text-gray-600">-</button>
              <span className="w-6 text-center">1</span>
              <button className="text-xl text-gray-600">+</button>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="Enter email" className="w-full border px-3 py-2 rounded-md" />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Phone</label>
          <input type="tel" placeholder="Enter phone number" className="w-full border px-3 py-2 rounded-md" />
        </div>

        {/* Pay Button */}
        <button className="bg-blue-600 text-white w-full py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition">
          Pay ₹50,000.00
        </button>

        {/* Logos */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <img src="/upi.png" alt="upi" className="h-6" />
          <img src="/visa.png" alt="visa" className="h-6" />
          <img src="/mastercard.png" alt="mc" className="h-6" />
          <img src="/rupay.png" alt="rupay" className="h-6" />
          <img src="/paytm.png" alt="paytm" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
