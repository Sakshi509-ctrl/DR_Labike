import React from "react";
import { useNavigate } from 'react-router-dom';
import { Facebook as FacebookIcon, Instagram, Twitter, Youtube } from "lucide-react";
const logo = "/assets/DrLabike-New-logo-trans (1)-D1SuIxFX.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-black text-white mt-0 mb-1">
      <div className="flex flex-col md:flex-row items-start gap-0 p-8">
      
        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
          <img src={logo} alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
          <span className="text-lg font-bold">DrLaBike</span>
        </div>

      
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">
         
          <div>
            <h3 className="text-lg font-bold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { navigate('/about'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; About
                </button>
              </li>
              <li >
                <button onClick={() => { navigate('/gallery'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/testimonials'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Testimonial
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/Blogs'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Blogs
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/inquiry'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Inquiry
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/certificate-verification'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Verification
                </button>
              </li>
            </ul>
          </div>

      
          <div>
            <h3 className="text-lg font-bold mb-3">Policies</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { navigate('/privacy-policy'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500   p-0 m-0">
                  &#9654; Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/shipping-policy'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Shipping Policy
                </button>
              </li>
              <li>
                  <button onClick={() => { navigate('/terms-and-conditions'); window.scrollTo(0, 0); }} className="bg-transparent border-none text-inherit cursor-pointer hover:text-green-500 p-0 m-0">
                  &#9654; Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Address</h3>
           
            <div className="flex items-center mb-2">
              <span className="mr-2">📍</span>
              <span className="hover:text-green-500">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📞</span>
              <span className="hover:text-green-500">+91-706-555-0214</span>
            </div>

            <div className="mt-4">
              <div className="font-bold mb-2">Follow Us</div>
              <div className="flex gap-4 mb-4">
                <a href="https://www.facebook.com/drlabike" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5 hover:text-blue-600" />
                </a>
                <a href="https://www.instagram.com/drlabike" aria-label="Instagram">
                  <Instagram className="w-5 h-5 hover:text-pink-500 ml-4" />
                </a>
                <a href="https://x.com/drlabike" aria-label="Twitter">
                  <Twitter className="w-5 h-5 hover:text-blue-400 ml-4" />
                </a>
                <a href="https://www.youtube.com/channel/UC9k-Me74MlQOgsmRWObyh6Q" aria-label="YouTube">
                  <Youtube className="w-5 h-5 hover:text-red-600 ml-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      
      
    </footer>
  );
};

export default Footer;
