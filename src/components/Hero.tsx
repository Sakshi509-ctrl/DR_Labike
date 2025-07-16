import React, { useRef, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import nitish from '../assets/Dr-Nitish-Kumar-257x300.png'
import prafulla  from '../assets/Dr.-Prafulla-J-Vishwanath-257x300.png'
import Rahul from '../assets/Dr.-Rahul-Chandola-1-257x300.png'
import uday from '../assets/dr-uday-Singh-257x300.png'
import sumit from '../assets/Dr-sumit-sinha-257x300.png'
import mission from '../assets/Mision-transformed.png'
import ud from '../assets/ud.png';  
import bike from '../assets/covered bike.png'; // Assuming you have a bike image
import fda from '../assets/Fda.png';
import icmr from '../assets/icmrlogo.jpg';
import dst from '../assets/DST.jpg';
import nhsrc from '../assets/NHSRC-logo.jpg';
import best from '../assets/drlabikehealthbest.png';
import health from '../assets/DrLabike-health.jpeg';
import client from '../assets/Client-slide-1-1536x873.png';
import logo from '../assets/DrLabike-New-logo-trans (1).png';
import deepti from '../assets/deepti.png';
import lubna from '../assets/lubna.png';
import achieve from '../assets/achievements.png';
import i1 from '../assets/i1.png';
import i from '../assets/i.jpg';
import gp from '../assets/gp.png';
import sc from '../assets/sc.png';
import app from '../assets/apple-store-1-2048x741.png';
import google from '../assets/Google-Symbol.png';



const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      // No-op, kept for possible future use
    }
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-screen flex flex-row items-center justify-between overflow-hidden pb-32">
        {/* Background Color or Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-blue-50 to-white" />
        {/* Doctor Image on the right */}
        <img 
          src={mission} 
          alt="Doctors" 
          className="hidden md:block absolute right-0 bottom-0 h-full max-h-[600px] w-auto object-contain z-10 pointer-events-none select-none" 
          style={{maxWidth: '50%'}}
        />
        {/* Content */}
        <div className="relative z-20 text-left text-purple-900 px-14 w-full max-w-1xl">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-8 animate-fade-in-up">
            Join The Healthcare<br />
            Revolution With<br/><br/>
            <span className="block text-red-700 mt-1">DrLaBike !</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 max-w-3xl animate-fade-in-up animation-delay-200">
            Portable Pathology Lab With Online Doctor Consultations
          </p>
          <button
            onClick={() => scrollToSection('franchise')}
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-4 shadow-lg text-lg transition-colors animate-fade-in-up animation-delay-400 mt-6"
          >
            Book Your Franchise
          </button>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Image below Hero section */}
      <div className="w-full flex justify-center mb-0"></div>
      {/* Info Boxes */}
      <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-0 px-7 md:px-16 mb-12 -mt-32 relative z-30">

        {/* Doctor Consultation Box */}
        <div className="flex-1 bg-teal-700 text-white rounded-xl shadow-lg  p-3 pt-3 w-full md:w-[280px] flex flex-col items-center text-center">
  <div className="bg-white text-teal-700 rounded-full p-4 shadow-lg mb-6">
    <svg xmlns='http://www.w3.org/2000/svg' className='h-16 w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v2m0 4h.01M21 21v-2a4 4 0 00-3-3.87M3 21v-2a4 4 0 013-3.87' />
    </svg>
  </div>
  <h3 className="text-2xl font-bold mb-2">Doctor Consultation</h3>
  <p className="text-lg">Get Doctor consultation for your health concerns from verified doctors at DrLaBike Clinic without having to travel. Starting at just INR 50/-.</p>
</div>

        {/* Pathology Tests Box */}
       <div className="flex-1 bg-teal-700 text-white rounded-xl shadow-lg p-8 pt-8 flex flex-col items-center text-center">
          <div className="bg-white text-teal-700 rounded-full p-4 shadow-lg mb-6">
            <svg xmlns='http://www.w3.org/2000/svg' className='h-16 w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12V7a3 3 0 00-6 0v5a3 3 0 006 0zm-6 0a3 3 0 006 0' /></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Pathology Tests</h3>
          <p className="text-lg">Get instant and accurate diagnostic services (Pathology tests) at a super affordable cost from DrLaBike clinic.</p>
        </div>
        {/* Contact Box */}
        <div className="flex-1 bg-indigo-800 text-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
           <div className="bg-white text-teal-700 rounded-full p-4 shadow-lg mb-6">
            <svg xmlns='http://www.w3.org/2000/svg' className='h-16 w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 01-8 0M12 11v2m0 4h.01M21 21v-2a4 4 0 00-3-3.87M3 21v-2a4 4 0 013-3.87' /></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Contact</h3>
          <p className="text-lg"><span className="block mb-1">📞 +91-70655-50214, 📧 Support@drlabike.com</span>📍 424-CMR Building, Near MCD School, Ghitorni, New Delhi-30</p>
        </div>
      </div>
      {/* Paragraph and Video Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 px-4 md:px-16 my-12">
        {/* Paragraph */}
        <div className="flex-1 text-black text-lg md:pr-8">
          <p><b>DrLaBike</b> Portable Pathology Lab enables doorstep diagnostics services with online Doctor Consultations to deprived Rural & demographically remote village population who lack easy access & timely healthcare services. It’s the only available solution to provide “Last Mile Delivery” of healthcare services.</p>
          <p className="mt-6">DrLaBike enables online doctor consultations to a villager in rural/remote location by experienced and multispecialty doctors at affordable rates. Timely diagnosis, timely treatment & timely medication within the village prevents expensive travel, stay & treatment cost of the metros.</p>
        </div>
        {/* Video */}
        <div className="flex-1 flex justify-center items-center">
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/1QZL8gF6U6A" title="DrLaBike e-Clinic & Lab tour" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-lg shadow-lg"></iframe>
        </div>
      </div>
      {/* Franchise Model Title and Advanced Static Lab Card Section */}
      <div className="w-full flex flex-col items-center my-12 px-2">
        <h2 className="text-5xl font-serif font-bold text-center mb-8 pb-2 border-b-4 border-blue-200 inline-block">Franchise Model</h2>
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl p-8 md:p-0 gap-0 items-center justify-center">
          {/* Left: Title and List */}
          <div className="flex-1 flex flex-col">  
            <h2 className="text-2xl font-serif font-bold text-center mb-2 pb-0 border-b-4 border-blue-200 inline-block self-center">Advanced Static Lab</h2>
            <ol className="list-decimal pl-6   text-0lg text-black space-y-4">
              <li><span className="text-red-700 font-serif font-bold">ADVANCED STATIC LAB</span> <span className="font-semibold">(Complete Lab Setup)</span></li>
              <li className=" font-serif font-bold">IT Support</li>
              <li className=" font-serif font-bold">Customer Support</li>
              <li className=" font-serif font-bold">Skill Support</li>
              <li className=" font-serif font-bold">Free of cost Digital marketing <span className="text-red-700">(6 months)</span></li>
              <li className=" font-serif font-bold">Certifications</li>
              <li className=" font-serif font-bold">Regularity assistance</li>
              <li className=" font-serif font-bold">Camp support</li>
              <li className=" font-serif font-bold">Key account manager</li>
              <li className=" font-serif font-bold">Quality monitoring assurance</li>
              <li className=" font-serif font-bold">Bio-waste consultation</li>
              <li className=" font-serif font-bold">Unlimited Training</li>
            </ol>
            <button className="mt-8 w-40 h-12 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition-colors self-start">Read More</button>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-start mt-0 ">
            <img src={ud} alt="Lab" className="max-w-full h-auto rounded-0xl shadow-lg align-top transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl" style={{ maxHeight: '250px', marginTop: 0 }} />
          </div>
        </div>
      </div>
      {/* DrLaBike Franchise Model Section: Image and Card Side by Side */}
      <div className="w-full flex flex-col md:flex-row items-start justify-center my-12 gap-8 px-2">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center items-start">
          <img src={bike} alt="Covered Bike" className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl" style={{ maxHeight: '700px' }} />
        </div>
        {/* Right: Card */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <h2 className="text-3xl font-serif font-bold text-center mb-3 pb-1 border-b-2 border-blue-200 inline-block w-full">DrLaBike</h2>
            <ol className="list-decimal pl-4 text-base text-black space-y-3 leading-tight">
              <li className="font-serif font-bold">DrLaBike (Complete Lab Setup)</li>
              <li className="font-serif font-bold">Assured actual business- guaranteed income of Rs 60,000/month</li>
              <li className="font-serif font-bold">Financing support(SBI tie-up National Level)</li>
              <li className="font-serif font-bold">Smart Device & Printer</li>
              <li className="font-serif font-bold">DrLaBike Teleconsultation App</li>
              <li className="font-serif font-bold">Digital stethoscope, BP machine, first aid kit, thermal scanner, otoscope, SPO2 & weighing scale,</li>
              <li className="font-serif font-bold">Free of cost Digital marketing <span className="text-red-700">(6 months)</span></li>
              <li className="font-serif font-bold">Reagents, Consumables & disposables</li>
              <li className="font-serif font-bold">Branding kit (Facade, Pamphlets, Banner& Sun-board)</li>
              <li className="font-serif font-bold">Certifications</li>
              <li className="font-serif font-bold">Regularity assistance</li>
              <li className="font-serif font-bold">Camp support</li>
              <li className="font-serif font-bold">Key account manager</li>
              <li className="font-serif font-bold">Quality monitoring assurance</li>
              <li className="font-serif font-bold">Bio-waste consultation</li>
              <li className="font-serif font-bold">Unlimited Training</li>
            </ol>
            <button className="mt-4 w-32 h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition-colors mx-auto block text-base">Book Now</button>
          </div>
        </div>
      </div>
      {/* Doctor Carousel Section */}
      <div className="w-full py-0">
        <div className="w-full bg-cyan-400 flex items-center justify-center min-h-[110px]">
          <h2 className="text-5xl font-serif font-bold text-center text-white mb-3">India's Best Doctors Joined Us</h2>
        </div>
        <p className="text-center text-1lg font-bold text-black mb-9 mt-5">
          Doctor on boarded with us (general physician or specialty doctors) which are 200+ in numbers, Patients are getting consulting at affordable price
        </p>
      </div>
      <div className="w-full flex flex-col items-center bg-white pb-8">
        {/* Carousel */}
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="flex flex-row items-end justify-center gap-1 min-w-[1000px]">
            {/* doctor cards */}
            {[
              { img: nitish},
              { img: Rahul },
              { img: prafulla},
              { img: uday },
              { img: sumit},
              { img: nitish},
            ].map((doc, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[160px] max-w-[160px] m-0 p-0">
                <img src={doc.img} className="w-full h-[180px] object-cover m-0 p-0 rounded-none" />
                <div className="w-full bg-[#00796b] text-white text-center py-2 px-0 m-0 rounded-none">
                  <div className="text-base font-extrabold leading-tight"></div>
                  <div className="text-sm font-semibold leading-tight"></div>
                  <div className="text-xs font-semibold leading-tight"></div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots navigation (static for now) */}
          <div className="flex justify-center mt-4 gap-2">
            {[0,1,2,3,4].map(i => (
              <span key={i} className={`w-3 h-3 rounded-full ${i===0 ? 'bg-cyan-900' : 'bg-gray-300'} inline-block`}></span>
            ))}
          </div>
        </div>
      </div>
      {/* Innovations Certification Section */}
      <div className="w-full flex flex-col items-center bg-white pt-2 pb-8">
        <div className="flex flex-row w-full max-w-6xl mx-auto mb-8 mt-2 items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-gray-600 whitespace-nowrap mb-2" style={{fontFamily: 'inherit'}}>Our Innovations Certification</h3>
            <div className="border-t-2 border-teal-400 w-1/3"></div>
          </div>
          <div className="flex flex-row justify-end items-center gap-12">
            <img src={fda} alt="FDA" className="h-16 object-contain" />
            <img src={icmr} alt="ICMR" className="h-16 object-contain" />
            <img src={dst} alt="DST" className="h-16 object-contain" />
            <img src={nhsrc} alt="NHSRC" className="h-16 object-contain" />
          </div>
        </div>
      </div>
      {/* Why DrLaBike Section */}
      <div className="w-full flex flex-col md:flex-row items-stretch justify-center max-w-6xl mx-auto my-12 rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Left: Text Box */}
        <div className="flex-1 bg-[#1a2970] text-white p-0 flex flex-col justify-between rounded-l-2xl">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why <span className="underline decoration-white decoration-4">DrLaBike</span>
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-lg md:text-xl font-serif mb-8">
              <li>Providing all kinds of health services under one roof</li>
              <li>Offering affordable treatment options near patients’ homes</li>
              <li>Having a large pool of over 200 general physicians and specialists</li>
              <li>Conducting vital diagnostic and pathology tests at low rates</li>
              <li>Supporting health camps, branding and marketing</li>
              <li>Having good IT services and modern labs</li>
              <li>Being available in every state of India</li>
              <li>Having low cost and low operating cost</li>
              <li>Ensuring good monthly earnings for partners</li>
            </ol>
          </div>
          <div className="flex justify-center w-full">
            <button className="mt-6 w-40 h-12 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition-colors">Book Now</button>
          </div>
        </div>
        {/* Right: Images */}
        <div className="flex-1 flex flex-col p-0 bg-white justify-center items-center">
          <img src={best} alt="DrLaBike Camp 1" className="w-full h-[260px] object-cover rounded-none m-0" />
          <img src={health} alt="DrLaBike Camp 2" className="w-full h-[260px] object-cover rounded-none m-0" />
        </div>
      </div>
      {/* Our Proud Partners & Franchise Benefits Section */}
      <div className="w-full flex flex-col md:flex-row items-stretch justify-center max-w-6xl mx-auto my-12 rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Left: Partners Image */}
        <div className="flex-1 flex flex-col bg-white p-0 justify-start">
          <img src={client} alt="Our Pride Partners" className="w-full h-[350px] object-contain object-top m-0 p-0 self-start" />
        </div>
        {/* Right: Franchise Benefits */}
        <div className="flex-1 bg-[#5c6bc0] text-white p-10 flex flex-col justify-center rounded-r-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            DrLaBike Franchise Benefits
            <div className="border-b-2 border-white w-1/2 mt-2"></div>
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-lg md:text-xl font-serif">
            <li>Doctor’s do proper treatment through online video call.</li>
            <li>Unlimited earning opportunity.</li>
            <li>Best star service using Modern Technology.</li>
            <li>Regular business not subject to illegal restriction.</li>
            <li>Training to run the clinic and increase the business.</li>
            <li>Guaranteed fixed income every month with camp support.</li>
            <li>There are no obstacles in opening or expanding a business through financial assistance, bank or mudra loan.</li>
            <li>Journey from a clinic to a hospital.</li>
          </ol>
        </div>
      </div>
      {/* Quality Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif  text-center text-black mb-2">DrLaBike <span className="text-black font-bold">"Quality"</span></h2>
          <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-center text-[#444] mb-10">We are passionate about quality delivery of services</h3>
          <div className="flex w-full bg-[#aeb8fa]  flex-col md:flex-row justify-between items-stretch gap-3">
            {/* Affordable */}
            <div className="flex-1 flex flex-col items-start ml-4">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                {/* Microscope SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h1V7a2 2 0 10-4 0v4H7a2 2 0 100 4h2zm0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">Affordable</div>
              <div className="text-xl text-gray-700 font-semibold">Our Tests starts INR 50/- Get Doctor Consultation @90% discounted.</div>
            </div>
            {/* Money Back Guarantee */}
            <div className="flex-1 flex flex-col items-start ml-5">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                {/* Document SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">Money Back Guarantee</div>
              <div className="text-xl text-gray-700 font-semibold">In case you ever find any discrepancy in our test results, we will refund your Money</div>
            </div>
            {/* Peace Of Mind */}
            <div className="flex-1 flex flex-col items-start ml-4">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                {/* Group SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">Peace Of Mind</div>
              <div className="text-xl text-gray-700 font-semibold">Our LT are certified, full-time nurses and phlebotomist that undergo thorough training so your experience is pleasant and efficient,</div>
            </div>
            {/* Data Privacy */}
            <div className="flex-1 flex flex-col items-start ml-4">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                {/* Shield SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">Data Privacy</div>
              <div className="text-xl text-gray-700 font-semibold">We ensure the lab accurately delivers your results to your care provider. Your reports and health records are kept safe and sure.</div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Core Value and Key Features Section */}
      <div className="w-full bg-[#f8fcfb] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6" style={{fontFamily: 'serif'}}>Our <span className="font-normal" style={{fontFamily: 'serif',textDecoration: "underline"}}> Core </span><span className="font-bold">Value</span> </h2>
          <div className="flex justify-center items-center w-full mb-8">
            <div className="flex w-full max-w-8xl bg-blue-100  overflow-hidden">
              <div className="flex-1 text-center py-4 text-2xl font-bold text-orange-600 tracking-widest" style={{letterSpacing: '0.3em'}}>NATIONALISM</div>
              <div className="w-1 bg-white"></div>
              <div className="flex-1 text-center py-4 text-2xl font-bold text-blue-700 tracking-widest" style={{letterSpacing: '0.3em'}}>COMPASSION</div>
              <div className="w-1 bg-white"></div>
              <div className="flex-1 text-center py-4 text-2xl font-bold text-green-600 tracking-widest" style={{letterSpacing: '0.3em'}}>QUALITY</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6" style={{fontFamily: 'serif'}}>Key Features <span className="font-normal">Our Business</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-yellow-50  p-8 shadow mb-16">
            <div className="flex flex-col items-center">
              <span className="text-green-500 text-4xl mb-2">🧑‍🤝‍🧑</span>
              <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
              <p className="text-center">Our tests start at INR 50/- and you can receive a doctor consultation at a 90% discount.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-500 text-4xl mb-2">🌸</span>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-center">Only 1% of Labs in India are delivering quality reports. We are passionate about quality and prioritize it over business.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-700 text-4xl mb-2">🔬</span>
              <h3 className="text-xl font-bold mb-2">Technology</h3>
              <p className="text-center">Tele consulting, Patented technology Static lab with LaBike (Portable pathology Lab on bike)</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-indigo-700 text-4xl mb-2">®️</span>
              <h3 className="text-xl font-bold mb-2">Regularity</h3>
              <p className="text-center">We use only certified Equipements. And help our franchise owner to use and follow same.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-700 text-4xl mb-2">🚗</span>
              <h3 className="text-xl font-bold mb-2">Door Step Service</h3>
              <p className="text-center">Our services can go right at the patient's doorstep for convenience and safety.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-500 text-4xl mb-2">📈</span>
              <h3 className="text-xl font-bold mb-2">Growth Opportunity</h3>
              <p className="text-center">Make your dreams come true, grow with us and be a part of the healthcare revolution.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-pink-500 text-4xl mb-2">🧑‍🏫</span>
              <h3 className="text-xl font-bold mb-2">Training Support</h3>
              <p className="text-center">Full Training support from brand to ensure quality and consistency in services.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-500 text-4xl mb-2">💰</span>
              <h3 className="text-xl font-bold mb-2">Financial Support</h3>
              <p className="text-center">Full support to establish or upgrade your business from our financial partners.</p>
            </div>
          </div>
          {/* Our Happy Google Reviews Section */}
            <div className="w-full bg-[#f8fcfb]  shadow p-6 bg-yellow-50  py-4">
            <h2 className="text-4xl font-bold text-center mb-1" style={{fontFamily: 'serif', textDecoration: 'underline'}}>Our Happy <span className="text-black">Google Reviews</span></h2>
            <div className="flex flex-col md:flex-row items-center  justify-center gap-4">
              {/* DrLaBike Review Summary Card */}
              <div className="flex flex-col items-center bg-white min-w-[220px] max-w-[220px]">
                <img src={logo} alt="DrLaBike Logo" className="w-20 h-20 mb-2" />
                <div className="text-2xl font-bold mb-1">DrLaBike</div>
                <div className="flex items-center mb-1">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <div className="text-lg font-semibold mb-4">16 Google reviews</div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">Write a review</button>
              </div>
              {/* Google Review Cards */}
              <div className="flex flex-row gap-4 overflow-x-auto">
                {/* Review 1 */}
                <div className="bg-white rounded-xl shadow p-6 min-w-[300px] max-w-[300px] flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-xl font-bold mr-3">S</div>
                    <div>
                      <div className="font-bold text-lg">SHASHI BHUSHAN <span className="inline-block align-middle ml-1"><img src={google} alt="Google" className="w-7 h-4 inline" /></span></div>
                      <div className="text-gray-500 text-sm">2022-01-31</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-xl">★★★★★</span>
                    <span className="ml-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2196f3"/><path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff"/></svg></span>
                  </div>                
                  
                </div>
                {/* Review 2 */}
                <div className="bg-white rounded-xl shadow p-6 min-w-[300px] max-w-[300px] flex flex-col">
                  <div className="flex items-center mb-2">
                    <img src={deepti} alt="Priya Rani" className="w-12 h-12 rounded-full mr-3 object-cover" />
                    <div>
                      <div className="font-bold text-lg">Priya Rani <span className="inline-block align-middle ml-1"><img src={google} alt="Google" className="w-7 h-4 inline" /></span></div>
                      <div className="text-gray-500 text-sm">2022-01-31</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-xl">★★★★★</span>
                    <span className="ml-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2196f3"/><path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff"/></svg></span>
                  </div>
                </div>
                {/* Review 3 */}
                <div className="bg-white rounded-xl shadow p-6 min-w-[300px] max-w-[300px] flex flex-col">
                  <div className="flex items-center mb-2">
                    <img src={lubna} alt="Nikita" className="w-12 h-12 rounded-full mr-3 object-cover" />
                    <div className="w-12 h-12 rounded-full bg-pink-400 text-white flex items-center justify-center text-xl font-bold mr-3">N</div>
                    <div>
                      <div className="font-bold text-lg">Nikita Eshtam <span className="inline-block align-middle ml-1"><img src={google} alt="Google" className="w-7 h-4 inline" /></span></div>
                      <div className="text-gray-500 text-sm">2022-01-31</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-xl">★★★★★</span>
                    <span className="ml-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2196f3"/><path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff"/></svg></span>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          {/* DrLaBike Achievements Section */}
          <div className="w-full bg-[#f8fcfb] py-12">
            <h2 className="text-4xl  text-center mb-10" style={{fontFamily: 'serif'}}>DrLaBike <span className="text-black, textDecoration: underline">Achievements</span></h2>
            <div className="flex flex-col items-center">
              {/* Achievements Images Row */}
              <div className="flex flex-row gap-0 justify-center items-center my-0 w-full px-9">
                <img src={achieve} alt="Achievement 1" className="object-cover  shadow-lg w-1/3 h-[350px]" />
                <img src={i1} alt="Achievement 2" className="object-cover  shadow-lg w-1/3 h-[350px]" />
                <img src={i} alt="Achievement 3" className="object-cover shadow-lg w-1/3 h-[350px]" />
              </div>
              {/* Download App Section */}
              <div className="flex flex-row items-center justify-center gap-12 w-full mt-8">
                <span className="text-2xl font-bold" style={{fontFamily: 'serif'}}>DOWNLOAD <span className="text-black">Our App</span></span>
                <img src={gp} alt="Google Play" className="w-48 h-16" />
                <img src={sc} alt="Google Play QR" className="w-32 h-32" />
                <img src={app} alt="App Store" className="w-48 h-16" />
                <img src={sc} alt="App Store QR" className="w-32 h-32" />
              </div>
            </div>
          </div>
          {/* Address Section (moved upward) */}
          <div className="max-w-7xl mx-auto mt-0 mb-8 flex flex-col md:flex-row items-start gap-0 text-white bg-black p-8">
            {/* Logo on the left */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
              <img src={logo} alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
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
                    <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
                    <a href="#" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
                    <a href="#" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
                    <a href="#" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero; 