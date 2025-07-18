import React from 'react';
import { Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <header className="w-full bg-white">
        {/* Top Bar */}
        <div className="w-full bg-white text-sm">
          <div className="max-w-8xl mx-auto flex justify-between items-center py-2 ml-0">
            {/* Social Icons and Contact Number */}
            <div className="flex items-center text-gray-600 font-serif font-bold ml-24 mt-2">
              <div className="flex items-center gap-4 text-gray-600 text-2xl">
                <a href="#">
                  <img src="/assets/facebook-icon-hd-1.jpg" alt="Facebook" className="w-7 h-7 rounded-full" />
                </a>
                <a href="#">
                  <img src="/assets/insta.png" alt="Instagram" className="w-7 h-7 rounded-full" />
                </a>
                <a href="#">
                  <img src="/assets/twitter.jpeg" alt="Twitter" className="w-7 h-7 rounded-full" />
                </a>
                <a href="#">
                  <img src="/assets/linkedin.jpeg" alt="LinkedIn" className="w-7 h-7 rounded-full" />
                </a>
                <a href="#">
                  <img src="/assets/utube.jpeg" alt="YouTube" className="w-7 h-7 rounded-full" />
                </a>
              </div>
              <span className="ml-6 text-blue-800 font-normal flex items-center">+91-706-555-0214</span>
            </div>
            {/* Search Bar */}
            <div className="relative w-72 mr-16 font-serif font-bold">
              <input
              type="text"
              placeholder="Type & Hit Enter..."
              className="w-full h-11 border px-4 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder-gray-400 font-serif font-bold"
              />
              
               <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800">
              <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Main Header (Navigation) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 font-serif font-bold">
          {/* Logo and Text */}
          <div className="flex items-center space-x-80 min-w-[290px] ml-16">
            <img src="https://drlabike.com/wp-content/uploads/2020/08/DrLabike-New-logo-trans.png" alt="DrLaBike Logo" className="h-20 w-35 object-contain" />
            <div className="flex flex-col leading-tight">
              {/* Text intentionally left blank as per your last edit */}
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-4 whitespace-nowrap">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold fous:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 mr-2 font-normal focus:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-normal focus:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  Testimonials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-normal focus:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-normal focus:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-normal focus:outline-none"
                      : "text-black font-normal hover:text-blue-400 focus:outline-none"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Buttons */}
          <div className="flex items-center space-x-4 min-w-[220px] justify-end font-serif font-bold">
            {/* Internship Button */}
            <button className="bg-[#a05a07] text-white border-2 border-[#a05a07] font-bold px-2 py-4 pl-4 pr-4 mr-2 ml-8 rounded transition-colors text-sm tracking-wide hover:bg-white hover:text-[#a05a07] active:bg-white active:text-[#a05a07] ">INTERNSHIP</button>
            {/* Book Now Button */}
            <button className="bg-blue-700 text-white border-2 border-blue-700 font-bold px-0 py-4 pl-4 pr-4 rounded transition-colors text-sm tracking-wide hover:bg-white hover:text-blue-700 active:bg-white active:text-blue-700 ">BOOK NOW</button>
          </div>
        </div>
        {/* Hero Section */}

      </header>
    </>
  );
};

export default Header;