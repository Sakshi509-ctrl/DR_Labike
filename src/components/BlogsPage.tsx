import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Drlabikelogo from '../../public/assets/DrLabike-New-logo-trans (1)-D1SuIxFX.png';



const BlogsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8fefd] flex flex-col items-center pt-24 pb-20 px-2">
        <div className="max-w-5xl w-full mx-auto">
          <h1 className="text-5xl font-extrabold text-left mb-4 mt-2 text-gray-600" style={{fontFamily: 'inherit'}}>Need Of Delievery Of Healthcare At Doorstep Is A Need Or Necessity?</h1>
          <div className="text-green-500 text-lg font-semibold mb-4">Uncategorized / drlabike</div>
          <p className="text-xl text-gray-500 mb-8">
            Generally we avoid hard tasks,because of which our healthcare is still have huge gaps, because we are not ready to identify the tough but Actual answer. We all need to understand 78% population of the country living in rural areas which are far off from resource reach locations related to healthcare in terms of knowledge [...]
          </p>
          <Link to="/blogs/1" className="text-green-500 text-lg font-semibold hover:underline">Read More »</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 mb-8 flex flex-col md:flex-row items-start gap-8 text-white bg-black rounded-xl p-8">
         
          <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
            <img src={Drlabikelogo} alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
            <span className="text-lg font-bold">DrLaBike</span>
          </div>
         
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">
           
            <div>
              <h3 className="text-lg font-bold mb-3">Useful Links</h3>
              <ul className="space-y-2">
                <li>&#9654; About</li>
                <li>&#9654; Gallery</li>
                <li>&#9654; Testimonial</li>
                <li>&#9654; Blogs</li>
                <li>&#9654; Inquiry</li>
                <li>&#9654; Verification</li>
              </ul>
            </div>
            {/* Policies */}
            <div>
              <h3 className="text-lg font-bold mb-3">Policies</h3>
              <ul className="space-y-2">
                <li>&#9654; Privacy Policy</li>
                <li>&#9654; Shipping Policy</li>
                <li>&#9654; Terms & Conditions</li>
                <li>&#9654; Refund & Cancellation</li>
              </ul>
            </div>
            {/* Address */}
            <div>
              <h3 className="text-lg font-bold mb-3">Address</h3>
              <div className="mb-2">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</div>
              <div className="flex items-center mb-2">
                <span className="mr-2">📍</span>
                <span>G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">📞</span>
                <span>+91-706-555-0214</span>
              </div>
             
              <div className="mt-4">
                <div className="font-bold mb-2">Follow Us</div>
                <div className="flex gap-4 mb-4">
                  <a href="https://www.facebook.com/drlabike" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
                  <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdrlabike%2F&is_from_rle" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
                  <a href="https://x.com/account/access" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
                  <a href="https://www.youtube.com/channel/UC9k-Me74MlQOgsmRWObyh6Q" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="w-full flex justify-center font-bold text-gray-600 mt-2 mb-4  ">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
    </>
  );
};

export default BlogsPage; 