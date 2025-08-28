
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    BACKEND_URL: 'http://localhost:5000'
  },
  
  production: {
    API_BASE_URL: 'https://dr-labike.onrender.com/api',
    BACKEND_URL: 'https://dr-labike.onrender.com'
  }
};

const getEnvironment = () => {
  if (import.meta.env.PROD) return 'production';
  
  if (import.meta.env.NODE_ENV === 'production') return 'production';
  
  if (window.location.hostname.includes('onrender.com')) return 'production';
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'development';
  }
  
  return 'development';
};

const environment = getEnvironment();

export const API_BASE_URL = config[environment]?.API_BASE_URL || config.development.API_BASE_URL;
export const BACKEND_URL = config[environment]?.BACKEND_URL || config.development.BACKEND_URL;

console.log(`Environment: ${environment}`);
console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`Current Hostname: ${window.location.hostname}`);
console.log(`Import Meta ENV:`, {
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  NODE_ENV: import.meta.env.NODE_ENV
});

export default config[environment];
