import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-blue-400">DrLaBike</div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for premium cycling experiences. From professional racing to leisurely rides, 
              we've got you covered with expert services and top-quality products.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/drlabike" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
              <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdrlabike%2F&is_from_rle" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
              <a href="https://x.com/account/access" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
              <a href="https://www.youtube.com/channel/UC9k-Me74MlQOgsmRWObyh6Q" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Bike Repairs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Custom Builds</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">E-Bike Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Bike Fitting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Insurance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Bike Street</p>
                  <p className="text-gray-300">Cycling City, CC 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">info@drlabike.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest updates, promotions, and cycling tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 DrLaBike. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;