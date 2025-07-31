import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  country?: string;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  country = 'in' 
}) => {
  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      inputClass="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      containerClass="w-full"
      buttonClass="border border-gray-300 bg-gray-50"
    />
  );
};

export default PhoneInputComponent;
