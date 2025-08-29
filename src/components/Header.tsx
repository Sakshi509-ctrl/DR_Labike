import React from 'react';
import { Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white">
      <div className="w-full bg-white">
  <div className="bg-white text-sm px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 py-2">
      <div className="flex flex-wrap items-center gap-3 text-gray-600 font-serif font-bold">
        <div className="flex items-center gap-2 text-xl">
          <a href="https://www.facebook.com/drlabike" target="_blank" rel="noreferrer">
            <img src="/assets/facebook-icon-hd-1.jpg" alt="Facebook" className="w-5 h-5 rounded-full" />
          </a>
          <a href="https://www.instagram.com/drlabike/">
            <img src="/assets/insta.png" alt="Instagram" className="w-5 h-5 rounded-full" />
          </a>
          <a href="https://x.com/account/access">
            <img src="/assets/twitter.jpeg" alt="Twitter" className="w-5 h-5 rounded-full" />
          </a>
          <a href="https://www.linkedin.com/company/drlabike/" target="_blank" rel="noreferrer">
            <img src="/assets/linkedin.jpeg" alt="LinkedIn" className="w-5 h-5 rounded-full" />
          </a>
          <a href="https://www.youtube.com/channel/UC9k-Me74MlQOgsmRWObyh6Q" target="_blank" rel="noreferrer">
            <img src="/assets/utube.jpeg" alt="YouTube" className="w-5 h-5 rounded-full" />
          </a>
        </div>
        <span className="text-blue-800 text-sm ml-3">+91-706-555-0214</span>
      </div>

      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Type & Hit Enter..."
          className="w-full h-9 border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder-gray-400 font-serif text-black"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800">
        <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div className="flex justify-center lg:justify-start">
      <img
        src="https://drlabike.com/wp-content/uploads/2020/08/DrLabike-New-logo-trans.png"
        alt="DrLaBike Logo"
        className="h-14 w-auto object-contain"
      />
    </div>

    <nav className="w-full">
      <ul className="flex flex-wrap justify-center gap-3 text-sm font-serif">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About Us" },
          { to: "/testimonials", label: "Testimonials" },
          { to: "/gallery", label: "Gallery" },
          { to: "/blogs", label: "Blogs" },
          { to: "/contact", label: "Contact Us" },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-500 transition-colors"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
      <button
        className="bg-[#a05a07] text-white border border-[#a05a07] px-4 py-1.5 rounded text-sm hover:bg-white hover:text-[#a05a07] transition-colors"
        onClick={() => navigate('/internship')}
      >
        INTERNSHIP
      </button>
      <button
        className="bg-blue-700 text-white border border-blue-700 px-4 py-1.5 rounded text-sm hover:bg-white hover:text-blue-700 transition-colors"
        onClick={() => navigate('/booking')}
      >
        BOOK NOW
      </button>
    </div>
  </div>
</div>

    </header>
  );
};

export default Header;
