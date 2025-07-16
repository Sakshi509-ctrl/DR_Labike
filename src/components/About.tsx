import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import amit from '../../public/assets/Amit_Sir-300x300-CCZcykZK.png';
import deepti from '../../public/assets/deepti-Dtk-3Eof.png';
import aman from '../../public/assets/aman-C1Rt-Gxo.png';
import md from '../../public/assets/MD-B45-PeDR.png';
import lubna from '../../public/assets/lubna-CI65w_dL.png';
import mission from '../../public/assets/ourmission-DeSeODqS.png';
import istock from '../../public/assets/istockphoto-1280371057-170667a-73WNWqO0.png';
import ourInnovative from '../../public/assets/Our-Innovative-pathology-lab-products.-1-DQtBVl2y.png';
import DrLabike from '../../public/assets/DrLabike-New-logo-trans (1)-D1SuIxFX.png';
import nurse from '../../public/assets/nursee-DtyGFM-f.png';


const advisors = [
  {
    name: 'Amit Bhatnagar',
    title: 'MD & Founder',
    img: amit,
    linkedin: 'https://www.linkedin.com/in/amit-bhatnagar-7498bb5/?originalSubdomain=in',
  },
  {
    name: 'Deepti Bhatnagar',
    title: 'Director',
    img: deepti,
    linkedin: 'https://www.linkedin.com/in/deepti-verma-a6615823/',
  },
  {
    name: 'Aman Bhatnagar',
    title: 'Director',
    img: aman,
    linkedin: 'https://www.linkedin.com/in/aman-bhatnagar-3434a74/',
  },
  {
    name: 'Matthew Bodziak',
    title: 'Director',
    img: md,
    linkedin: 'https://www.linkedin.com/in/matthew-bodziak-25819b12/',
  },
  {
    name: 'Lubna Dajani',
    title: 'Director',
    img: lubna,
    linkedin: 'https://www.linkedin.com/in/lubnadajani/',
  },
];

const About: React.FC = () => {
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowParagraph(true), 100);
  }, []);

  return (
    <section id="about" className="pt-0 pb-4 bg-white">
      {/* Who We Are */}
      <div className="relative w-full min-h-[700px] text-center mb-4 flex items-center justify-center">
        <img 
          src={nurse}
          alt="Nurse Background" 
          className="absolute inset-0 w-full h-[700px] object-cover z-0" 
          style={{opacity: 1, filter: 'brightness(0.7)'}}
        />
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 px-8 pt-32 pb-12 flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-bold mb-6 text-white transition-all duration-300 ease-in-out hover:text-blue-300 hover:scale-105 cursor-pointer">Who We Are</h2>
          <div
            className={`text-lg text-gray-100 mb-8 whitespace-pre-line text-center space-y-2 transition-all duration-700 ease-out ${showParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h6>We are building an ecosystem of holistic health care (Preventive, Curative, Diagnostic) which is affordable and accessible.</h6>
            <h6>DrLabike (Doctor consultation with advanced technology, mobile lab on wheel) this technology is a key factor to ensure the</h6>
            <h6>USP of our service which is to deliver quality as per international standards. We are insane about the quality. In DrLabike</h6>
            <h6>clinics we use innovative &amp; cost effective solutions/technologies so that in minimum cost, large number of beneficiaries get impact.</h6>
          </div>
        </div>
      </div>
      {/* Advisors Section */}
      <div className="max-w-6xl mx-auto mt-4">
        <h2 className="text-4xl font-bold text-center mb-2">Advisors</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-10 rounded-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {advisors.map((advisor, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={advisor.img}
                alt={advisor.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              />
              <div className="text-xl font-bold text-gray-900 text-center">{advisor.name}</div>
              <div className="text-md font-semibold text-gray-700 mb-2 text-center">{advisor.title}</div>
              
              <a href={advisor.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="6" fill="#3B82F6" />
                  <path d="M10.667 13.333h2.666v8h-2.666v-8zm1.333-4a1.333 1.333 0 110 2.667 1.333 1.333 0 010-2.667zm3.333 4h2.56v1.093h.037c.356-.675 1.226-1.387 2.523-1.387 2.7 0 3.2 1.773 3.2 4.08v4.214h-2.666v-3.733c0-.89-.016-2.04-1.24-2.04-1.24 0-1.427.97-1.427 1.97v3.803h-2.667v-8z" fill="#fff" />
                </svg>
              </a>
              
              <button
                className="mt-6 w-40 h-8 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Mission Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left: Title and Text */}
          <div className="flex-1">
            <h2 className="text-5xl font-serif font-bold mb-2 text-left">Our Mission</h2>
            <div className="w-24 h-1 bg-blue-600 mb-8 rounded-full text-left" />
            <div className="text-base text-black-800 leading-relaxed text-left font-normal">
              <span>Promoting Preventive and Holistic healthcare via Drlabike clinic</span>
              Onsite at the doorsteps, providing low cost medical solutions
              with best quality and high accuracy.<br/><br/>
              <span className="block font-normal mt-2">Generating Livelihood by skilling manpower from the pool of poor underserved aspirants, marginalized people, unemployed youth & college/school dropouts due to lack of resources & knowledge. Empowering Community people by lifting self–employment by breeding strong entrepreneurship spirit in youth.</span>
             <br/>
            
            </div>
          </div>
          {/* Right: Mission Image */}
          <div className="flex-1 flex justify-center md:justify-end md:mt-8">
            <img src={mission} alt="Our Mission" className="rounded-xl shadow-lg max-w-full md:max-w-md" />
          </div>
        </div>
      </div>
      {/* Centered Title Section */}
      <div className="max-w-6xl mx-auto mt-16 mb-8">
        <h2 className="text-3xl font-Regular 400 Italic font-bold text-center mb-2">We Employ Latest <span className="font-Bold 700 Italic">Research</span> Technology &amp; Company.</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Left: Features Paragraph and List */}
          <div className="flex-1 max-w-2xl text-left text-base text-gray-800">
            <h3 className="text-2xl font-bold mb-4">Silent Features Of DrLaBike</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><span className="font-bold">Remote accessibility</span> – Able to reach Remote areas where four wheeler can’t reach generally.</li>
              <li><span className="font-bold">Tough equipment’s</span> – Equipped with rugged lab equipment that can perform well in temperatures ranges from minus degrees to high temperatures.</li>
              <li><span className="font-bold">Variety of tests</span> – 145 types of laboratory tests can be performed.</li>
              <li><span className="font-bold">Test data</span> – Immediate test reports of few tests and test data accessible through cloud management for further research or remote access.</li>
              <li><span className="font-bold">Telemedicine</span> – Through telemedicine consultation, patient’s prescription can be received immediately and perform tests accordingly for further treatment.</li>
              <li><span className="font-bold">GPS Enabled</span> – Movement of the LaBike can be tracked through GPS, which ensures it’s security as well as Bike’s performance can be enhanced.</li>
              <li><span className="font-bold">Cost friendly</span> – LaBike lab services are pocket friendly compare to a traditional laboratory with high charges for each tests.</li>
              <li><span className="font-bold">Focused groups</span> – LaBike is especially designed to serve the people who are situated/working in remote locations like – Army personals,</li>
            </ul>
          </div>
          {/* Right: Images stacked vertically */}
          <div className="flex-1 flex flex-col gap-6 items-center md:items-end">
            <img src={istock} alt="Telemedicine" className="rounded-xl shadow-lg max-w-full md:max-w-md" />
            <img src={ourInnovative} alt="Innovative Pathology Lab Products" className="rounded-xl shadow-lg max-w-full md:max-w-md" />
          </div>
        </div>
      </div>
      {/* Info Columns Section with Logo */}
      <div className="max-w-6xl mx-auto mt-16 mb-8 flex flex-col md:flex-row items-start gap-8 text-white bg-black rounded-xl p-8">
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
          <img src={DrLabike} alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
          <span className="text-lg font-bold">DrLaBike</span>
        </div>
        {/* Columns on the right */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">
          {/* Useful Links */}
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
            {/* Follow Us Icons */}
            <div className="mt-4">
              <div className="font-bold mb-2">Follow Us</div>
              <div className="flex gap-4 mb-4">
                {/* Social media icons removed as per instructions */}
                <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
              <a href="#" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
              <a href="#" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
              <a href="#" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;