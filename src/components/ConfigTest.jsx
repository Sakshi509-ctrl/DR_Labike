import React from 'react';
import { API_BASE_URL, BACKEND_URL } from '../config/config';

const ConfigTest = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-2">🔧 Configuration Test</h3>
      <div className="space-y-2 text-sm">
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
        <p><strong>API Base URL:</strong> {API_BASE_URL}</p>
        <p><strong>Backend URL:</strong> {BACKEND_URL}</p>
        <p><strong>Node ENV:</strong> {import.meta.env.NODE_ENV}</p>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => {
            console.log('Current config:', { API_BASE_URL, BACKEND_URL });
            console.log('Environment:', import.meta.env.MODE);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log Config to Console
        </button>
      </div>
    </div>
  );
};

export default ConfigTest;
