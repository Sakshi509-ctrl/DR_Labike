import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <header className="w-full bg-white">
        {/* Top Bar */}
        <div className="w-full bg-white text-sm">
          <div className="max-w-9xl mx-auto flex justify-between items-center py-2 px-4">
            {/* Social Icons and Contact Number */}
            <div className="flex items-center text-gray-600 font-serif font-bold ml-10 mt-2">
              <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
              <a href="#" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
              <a href="#" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
              <a href="#" aria-label="LinkedIn" className="ml-4"><Linkedin className="w-5 h-5 hover:text-blue-700" /></a>
              <a href="#" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
              <span className="ml-6 text-blue-700 font-medium tracking-wide font-serif font-bold">+91-706-555-0214</span>
            </div>
            {/* Search Bar */}
            <div className="relative w-64 ml-6 font-serif font-bold">
              <input
                type="text"
                placeholder="Type & Hit Enter..."
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder-gray-400 font-serif font-bold"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Main Header (Navigation) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 font-serif font-bold">
          {/* Logo and Text */}
          <div className="flex items-center space-x-55 min-w-[290px]">
            <img src="https://drlabike.com/wp-content/uploads/2020/08/DrLabike-New-logo-trans.png" alt="DrLaBike Logo" className="h-20 w-35 object-contain" />
            <div className="flex flex-col leading-tight">
              {/* Text intentionally left blank as per your last edit */}
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 flex justify-center font-serif font-bold">
            <ul className="flex space-x-7">
              <li>
                <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>About Us</NavLink>
              </li>
              <li>
                <NavLink to="/testimonials" className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>Testimonials</NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-700 font-bold underline" : "text-black font-medium font-serif font-bold"}>Contact Us</NavLink>
              </li>
            </ul>
          </nav>
          {/* Buttons */}
          <div className="flex items-center space-x-4 min-w-[320px] justify-end font-serif font-bold">
            {/* Internship Button */}
            <button className="bg-[#a05a07] hover:bg-[#7a4305] text-white font-bold px-7 py-2 rounded transition-colors text-base tracking-wide">INTERNSHIP</button>
            {/* Book Now Button */}
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-2 rounded transition-colors text-base tracking-wide">BOOK NOW</button>
          </div>
        </div>
        {/* Hero Section */}

      </header>
    </>
  );
};

export default Header;