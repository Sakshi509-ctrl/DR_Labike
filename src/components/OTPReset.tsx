import React, { useState } from 'react';
import axios from 'axios';

const OTPReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email, newPassword });
      setMessage(res.data.message);
      setStep(1); 
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button onClick={sendOtp} className="w-full bg-indigo-600 text-white p-2 rounded">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button onClick={verifyOtp} className="w-full bg-indigo-600 text-white p-2 rounded">
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button onClick={resetPassword} className="w-full bg-indigo-600 text-white p-2 rounded">
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default OTPReset;
