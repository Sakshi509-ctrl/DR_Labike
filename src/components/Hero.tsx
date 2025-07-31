import React, {useEffect } from 'react';
import { ChevronRight } from "lucide-react";
import Footer from './footer';
import nitish from "../../public/assets/Dr-Nitish-Kumar-257x300-DeIa8Lqu.png";
import prafulla from "../../public/assets/Dr.-Prafulla-J-Vishwanath-257x300-khka6hZz.png";
import Rahul from "../../public/assets/Dr.-Rahul-Chandola-1-257x300-BvFZlWBM.png";
import uday from "../../public/assets/dr-uday-Singh-257x300-iH-_WO_P.png";
import sumit from "../../public/assets/Dr-sumit-sinha-257x300-DKm4FRiM.png";
import mission from "../../public/assets/Mision-transformed-DTFoFgIL.png";
import ud from "../../public/assets/ud-DqITPYgu.png";
import bike from "../../public/assets/covered bike-Cb-8W9N2.png";
import fda from "../../public/assets/fda.png";
import icmr from "../../public/assets/icmrlogo-CbLuBsVi.jpg";
import dst from "../../public/assets/DST-Dyr2yFDx.jpg";
import nhsrc from "../../public/assets/NHSRC-logo-DXnlp4AW.jpg";
import best from "../../public/assets/drlabikehealthbest-9mmz_beN.png";
import health from "../../public/assets/DrLabike-health-DZGag8WP.jpeg";
import client from "../../public/assets/Client-slide-1-1536x873-8fGei4z6.png";
import logo from "../../public/assets/DrLabike-New-logo-trans (1)-D1SuIxFX.png";
import deepti from "../../public/assets/deepti-Dtk-3Eof.png";
import lubna from "../../public/assets/lubna-CI65w_dL.png";
import achieve from "../../public/assets/achievements-CW_-_m4F.png";
import i1 from "../../public/assets/i1-BPfNmFtl.png";
import i from "../../public/assets/i-BF82gZgm.jpg";
import gp from "../../public/assets/gp-BFRtjq6f.png";
import sc from "../../public/assets/Qr.png";
import app from "../../public/assets/apple-store-1-2048x741-Dk-V0vDI.png";
import google from "../../public/assets/Google-Symbol-CcZVZOAF.png";


const Hero: React.FC = () => {
  // const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <>
      <section className="relative flex flex-col-reverse lg:flex-row items-center min-h-[60vh] bg-gradient-to-r from-cyan-200 via-blue-50 to-white overflow-hidden px-4 sm:px-8 lg:px-16 py-10">
  {/* Left Side Content */}
  <div className="flex-1 text-center lg:text-left pt-6">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 leading-tight mb-4">
      Join The Healthcare
      <span className="block mt-2">Revolution With</span>
      <span className="block text-red-700 mt-4 font-extrabold text-4xl sm:text-5xl">DrLaBike !</span>
    </h1>
    <p className="text-lg sm:text-xl font-semibold text-gray-700 mt-4 mb-5">
      Portable Pathology Lab With Online Doctor Consultations
    </p>
    <button
      className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 text-lg sm:text-xl shadow-lg transition-colors flex items-center mx-auto lg:mx-0"
      onClick={() => window.open('/franchise', '_self')}
    >
      Book Your Franchise
      <ChevronRight size={20} className="ml-2" />
    </button>
  </div>

  {/* Right Side Image */}
  <div className="flex-1 flex justify-center lg:justify-end items-end h-full mb-8 lg:mb-0">
    <img
      src={mission}
      alt="Doctors"
      className="object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full max-w-[400px]"
    />
  </div>
</section>

     
<div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-4 px-4 md:px-14 mb-8 -mt-12 relative z-30">
  {/* Doctor Consultation */}
  <div className="flex-1 bg-teal-700 text-white rounded-2xl md:rounded-l-2xl md:rounded-r-none shadow-lg p-6 flex flex-col items-center text-center min-h-[180px]">
    <div className="bg-white text-teal-700 rounded-full p-4 shadow-lg mb-4">
      <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 md:h-16 md:w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v2m0 4h.01M21 21v-2a4 4 0 00-3-3.87M3 21v-2a4 4 0 013-3.87' />
      </svg>
    </div>
    <h3 className="text-lg font-serif font-bold mb-2">Doctor Consultation</h3>
    <p className="text-sm sm:text-base px-2">Get consultation for your health concerns from verified doctors at DrLaBike Clinic. Starting at just INR 50/-.</p>
  </div>

  {/* Pathology Tests */}
  <div className="flex-1 bg-cyan-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-h-[180px]">
    <div className="bg-white text-cyan-600 rounded-full p-4 shadow-lg mb-4">
      <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 md:h-16 md:w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17V7a2 2 0 114 0v10a4 4 0 11-4 0z' />
      </svg>
    </div>
    <h3 className="text-lg font-bold mb-2">Pathology Tests</h3>
    <p className="text-sm sm:text-base px-2">Instant & accurate pathology tests at a super affordable cost at DrLaBike Clinic.</p>
  </div>

  {/* Contact */}
  <div className="flex-1 bg-indigo-800 text-white rounded-2xl md:rounded-r-2xl md:rounded-l-none shadow-lg p-6 flex flex-col items-center text-center min-h-[180px]">
    <div className="bg-white text-indigo-700 rounded-full p-4 shadow-lg mb-4">
      <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 md:h-16 md:w-16' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <rect x='4' y='7' width='16' height='13' rx='2' stroke='currentColor' strokeWidth='2' fill='none'/>
        <path d='M9 17h6M12 14v6' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
        <rect x='9' y='10' width='6' height='4' rx='1' stroke='currentColor' strokeWidth='2' fill='none'/>
      </svg>
    </div>
    <h3 className="text-lg font-bold mb-2">Contact</h3>
    <p className="text-sm sm:text-base px-2">
      📞 +91-70655-50214<br />
      📧 support@drlabike.com<br />
      📍 424-CMR Building, Near MCD School, Ghitorni, New Delhi-30
    </p>
  </div>
</div>

     
<div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 my-8 px-4 lg:px-16">

  <div className="flex-1 mt-4 text-black text-base font-serif leading-relaxed text-justify">
    <p>
      <b>DrLaBike</b> Portable Pathology Lab enables doorstep diagnostics services with online Doctor Consultations to deprived Rural & demographically remote village population who lack easy access & timely healthcare services. It’s the only available solution to provide
      <br /> <strong>“Last Mile Delivery”</strong> <br />
      <br />
      of healthcare services.
    </p>
    <p className="mt-6">
      DrLaBike enables online doctor consultations to a villager in rural/remote location by experienced and multispecialty doctors at affordable rates. Timely diagnosis, timely treatment & timely medication within the village prevents expensive travel, stay & treatment cost of the metros.
    </p>

   
    <div className="w-full flex flex-wrap justify-center md:justify-start items-center gap-6 mt-8">
      {["PATHOLOGY LAB", "TELEMEDICINE", "MEDICINE"].map((label) => (
        <div className="flex items-center" key={label}>
          <span className="text-2xl text-gray-700 mr-2">&#9654;</span>
          <span className="text-lg font-bold font-serif">{label}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
    <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
      <iframe
        className="w-full h-full shadow-lg rounded-xl"
        src="https://www.youtube.com/embed/fQ4oBvrEpkQ"
        title="DrLaBike e-Clinic & Lab tour"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>

      
      
<div className="w-full flex flex-col items-center my-12 px-4">
  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8 pb-2">
    Franchise Model
  </h2>

  <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 items-center lg:items-start justify-between">
    
    {/* Table Section */}
    <div className="bg-white rounded-2xl shadow-2xl w-full lg:w-1/2 p-4">
      <h3 className="text-2xl font-serif font-bold text-center mb-4">
        Advanced <span className="underline">Static</span> Lab
      </h3>
      <ol className="list-decimal pl-6 md:pl-10 space-y-2 text-black text-base">
        <li>
          <span className="font-bold text-red-700">ADVANCED STATIC LAB</span>{" "}
          <span className="font-semibold">(Complete Lab Setup)</span>
        </li>
        <li className="font-serif font-bold">IT Support</li>
        <li className="font-serif font-bold">Customer Support</li>
        <li className="font-serif font-bold">Skill Support</li>
        <li className="font-serif font-bold">
          Free of cost Digital marketing{" "}
          <span className="text-red-700">(6 months)</span>
        </li>
        <li className="font-serif font-bold">Certifications</li>
        <li className="font-serif font-bold">Regularity assistance</li>
        <li className="font-serif font-bold">Camp support</li>
        <li className="font-serif font-bold">Key account manager</li>
        <li className="font-serif font-bold">Quality monitoring assurance</li>
        <li className="font-serif font-bold">Bio-waste consultation</li>
        <li className="font-serif font-bold">Unlimited Training</li>
      </ol>

      <div className="pt-6 text-center">
        <button
          className="w-40 h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow transition-colors"
          onClick={() => window.open("/franchise", "_self")}
        >
          Read More
        </button>
      </div>
    </div>

    {/* Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center items-start p-4">
      <img
        src={ud}
        alt="Lab"
        className="max-w-full h-auto rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105"
        style={{ maxHeight: "300px" }}
      />
    </div>
  </div>
</div>

      
<div className="w-full flex flex-col md:flex-row items-center justify-center my-12 gap-8 px-4">
  
  {/* Left Image */}
  <div className="w-full md:w-1/2 flex justify-center items-center">
    <img
      src={bike}
      alt="Covered Bike"
      className="max-w-full h-auto rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
      style={{ maxHeight: '500px' }}
    />
  </div>

  {/* Right Text Box */}
  <div className="w-full md:w-1/2 flex justify-center">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 sm:p-8 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-4 pb-2 border-b-2 border-blue-200">
        DrLaBike
      </h2>

      <ol className="list-decimal pl-5 pr-2 text-base text-black space-y-2 leading-snug">
        <li className="font-serif font-bold">DrLaBike (Complete Lab Setup)</li>
        <li className="font-serif font-bold">Assured actual business - guaranteed income of ₹60,000/month</li>
        <li className="font-serif font-bold">Financing support (SBI tie-up National Level)</li>
        <li className="font-serif font-bold">Smart Device & Printer</li>
        <li className="font-serif font-bold">DrLaBike Teleconsultation App</li>
        <li className="font-serif font-bold">
          Digital stethoscope, BP machine, first aid kit, thermal scanner, otoscope, SPO2 & weighing scale
        </li>
        <li className="font-serif font-bold">
          Free of cost Digital marketing <span className="text-red-700">(6 months)</span>
        </li>
        <li className="font-serif font-bold">Reagents, Consumables & Disposables</li>
        <li className="font-serif font-bold">Branding kit (Facade, Pamphlets, Banner & Sun-board)</li>
        <li className="font-serif font-bold">Certifications</li>
        <li className="font-serif font-bold">Regulatory assistance</li>
        <li className="font-serif font-bold">Camp support</li>
        <li className="font-serif font-bold">Key account manager</li>
        <li className="font-serif font-bold">Quality monitoring assurance</li>
        <li className="font-serif font-bold">Bio-waste consultation</li>
        <li className="font-serif font-bold">Unlimited Training</li>
      </ol>

      <div className="mt-6 text-center">
        <button
          className="w-36 h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base"
          onClick={() => window.open('/franchise', '_self')}
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
</div>


     {/* Section: Heading */}
<div className="w-full py-0">
  <div className="w-full bg-cyan-400 flex items-center justify-center min-h-[110px] px-4">
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-center text-white mb-2">
      India's Best Doctors Joined Us
    </h2>
  </div>
  <p className="text-center text-base sm:text-lg font-semibold text-black mb-6 mt-4 px-4 max-w-3xl mx-auto">
    Doctors onboarded with us (general physicians and specialists) number over 200+. Patients are getting consultations at affordable prices.
  </p>
</div>

{/* Section: Doctor Cards Carousel */}
<div className="w-full flex flex-col items-center bg-white pb-10">
  <div className="relative w-full max-w-6xl mx-auto px-4">
    <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 justify-start sm:justify-center py-4">
      {[
        { img: nitish },
        { img: Rahul },
        { img: prafulla },
        { img: uday },
        { img: sumit },
        { img: nitish },
      ].map((doc, idx) => (
        <div key={idx} className="flex-shrink-0 w-[160px]">
          <img src={doc.img} alt={`Doctor ${idx + 1}`} className="w-full h-[180px] object-cover rounded-md shadow" />
          <div className="bg-[#00796b] text-white text-center py-2 px-1 mt-1 rounded-b-md">
            <div className="text-base font-bold leading-tight">Dr. Name</div>
            <div className="text-sm font-medium leading-tight">Specialty</div>
            <div className="text-xs font-medium leading-tight">Experience</div>
          </div>
        </div>
      ))}
    </div>

    {/* Dots Pagination */}
    <div className="flex justify-center mt-4 gap-2">
      {[0, 1, 2, 3, 4].map(i => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-cyan-900' : 'bg-gray-300'} inline-block`}
        ></span>
      ))}
    </div>
  </div>
</div>

{/* Section: Certifications */}
<div className="w-full flex flex-col items-center bg-white pt-2 pb-10">
  <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 mb-6 md:mb-10 items-center justify-between gap-6">
    {/* Heading */}
    <div className="flex flex-col text-center md:text-left">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'inherit' }}>
        Our Innovations Certification
      </h3>
      <div className="border-t-2 border-teal-400 w-1/3 mx-auto md:mx-0"></div>
    </div>

    {/* Logos */}
    <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
      <img src={fda} alt="FDA" className="h-12 sm:h-16 object-contain" />
      <img src={icmr} alt="ICMR" className="h-12 sm:h-16 object-contain" />
      <img src={dst} alt="DST" className="h-12 sm:h-16 object-contain" />
      <img src={nhsrc} alt="NHSRC" className="h-12 sm:h-16 object-contain" />
    </div>
  </div>
</div>


      <div className="w-full flex flex-col md:flex-row items-stretch justify-center max-w-6xl mx-auto my-12 rounded-2xl overflow-hidden shadow-lg bg-white">

        <div className="flex-1 bg-[#1a2970] text-white p-0 flex flex-col justify-between rounded-l-2xl min-h-0">
          <div>
            <h2 className="text-2xl md:text-1xl pl-8 mt-4 font-serif mb-2">
              Why <span className="underline decoration-white decoration-3">DrLa</span>Bike
            </h2>
            <ol className="list-decimal pl-10 space-y-1 text-base md:text-0xl font-serif mb-2">
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
            <button
              className="mt-6 w-40 h-12 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition-colors"
              onClick={() => window.open('/franchise', '_self')}
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-0 bg-white justify-center items-center">
          <img src={best} alt="DrLaBike Camp 1" className="w-full h-[200px] object-cover rounded-none m-0" />
          <img src={health} alt="DrLaBike Camp 2" className="w-full h-[200px] object-cover rounded-none m-0" />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-stretch justify-center max-w-6xl mx-auto my-12 rounded-2xl overflow-hidden shadow-lg bg-white">

        <div className="flex-1 flex flex-col bg-white p-0 justify-start">
          <img src={client} alt="Our Pride Partners" className="w-full h-[350px] object-contain object-top m-0 p-0 self-start" />
        </div>
      
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif  text-center text-black mb-2">DrLaBike <span className="text-black font-bold">"Quality"</span></h2>
          <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-center text-gray-600 mt-6">We are passionate about quality delivery of services</h3>
          <div className="flex w-full bg-[#aeb8fa] flex-col md:flex-row justify-center items-stretch gap-3">

            <div className="flex-1 flex flex-col items-center ml-4 mt-3">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h1V7a2 2 0 10-4 0v4H7a2 2 0 100 4h2zm0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>
              </div>
              <div className="text-2xl font-bold font-serif text-white  ">Affordable</div>
              <div className="text-base text-gray-600 font-semibold ml-8">Our Tests starts INR 50/- Get Doctor Consultation @90% discounted.</div>
            </div>

            <div className="flex-1 flex flex-col items-center ml-5 mt-3">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="text-2xl font-bold font-serif text-white ml-8">Money Back Guarantee</div>
              <div className="text-1xl text-gray-600 font-semibold ml-8">In case you ever find any discrepancy in our test results, we will refund your Money</div>
            </div>

            <div className="flex-1 flex flex-col items-center ml-4 mt-3">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="text-2xl font-bold font-serif text-white ml-4">Peace Of Mind</div>
              <div className="text-1xl text-gray-600 font-semibold ml-4">Our LT are certified, full-time nurses and phlebotomist that undergo thorough training so your experience is pleasant and efficient,</div>
            </div>

            <div className="flex-1 flex flex-col items-center ml-4 mt-3">
              <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="text-2xl font-bold font-serif text-white mr-7">Data Privacy</div>
              <div className="text-1xl text-gray-600 font-semibold mr-8">We ensure the lab accurately delivers your results to your care provider. Your reports and health records are kept safe and sure.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f8fcfb] py-12">
        <div className="w-full px-4">
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

          <div className="w-full bg-yellow-50 shadow py-8 px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 font-serif underline">
    Our Happy <span className="text-black">Google Reviews</span>
  </h2>

  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
    {/* DrLaBike Box */}
    <div className="flex flex-col items-center bg-white px-6 py-4 shadow rounded-md w-full max-w-xs">
      <img src={logo} alt="DrLaBike Logo" className="w-20 h-20 mb-2" />
      <div className="text-2xl font-bold mb-1">DrLaBike</div>
      <div className="text-yellow-400 text-2xl mb-1">★★★★★</div>
      <div className="text-lg font-semibold mb-4">16 Google reviews</div>
      <a
        href="https://www.google.com/maps/place/DrLaBike/@28.4915619,77.1407529,17z"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-center"
      >
        Write a review
      </a>
    </div>

    {/* Reviews Scroll Container */}
    <div className="flex overflow-x-auto gap-4 py-4 w-full max-w-full no-scrollbar">
      {/* Review Card 1 */}
      <div className="flex-shrink-0 bg-white rounded-xl shadow p-4 w-[280px]">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-xl font-bold mr-3">
            S
          </div>
          <div>
            <div className="font-bold text-lg">
              SHASHI BHUSHAN <img src={google} alt="Google" className="inline w-6 h-4 ml-1" />
            </div>
            <div className="text-gray-500 text-sm">2022-01-31</div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="ml-2">
            <circle cx="12" cy="12" r="10" fill="#2196f3" />
            <path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* Review Card 2 */}
      <div className="flex-shrink-0 bg-white rounded-xl shadow p-4 w-[280px]">
        <div className="flex items-center mb-3">
          <img src={deepti} alt="Priya Rani" className="w-12 h-12 rounded-full mr-3 object-cover" />
          <div>
            <div className="font-bold text-lg">
              Priya Rani <img src={google} alt="Google" className="inline w-6 h-4 ml-1" />
            </div>
            <div className="text-gray-500 text-sm">2022-01-31</div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="ml-2">
            <circle cx="12" cy="12" r="10" fill="#2196f3" />
            <path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* Review Card 3 */}
      <div className="flex-shrink-0 bg-white rounded-xl shadow p-4 w-[280px]">
        <div className="flex items-center mb-3">
          <img src={lubna} alt="Nikita" className="w-12 h-12 rounded-full mr-3 object-cover" />
          <div>
            <div className="font-bold text-lg">
              Nikita Eshtam <img src={google} alt="Google" className="inline w-6 h-4 ml-1" />
            </div>
            <div className="text-gray-500 text-sm">2022-01-31</div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="ml-2">
            <circle cx="12" cy="12" r="10" fill="#2196f3" />
            <path d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 2.6-2.6 1.4 1.4-4 4z" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="w-full bg-[#f8fcfb] py-12">
  <h2 className="text-4xl text-center mb-10 font-serif underline text-black">
    DrLaBike <span className="text-black">Achievements</span>
  </h2>

  <div className="flex flex-col items-center">
    {/* Responsive Image Grid */}
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4">
      <img src={achieve} alt="Achievement 1" className="object-cover shadow-lg w-full sm:w-1/3 h-[250px] sm:h-[350px]" />
      <img src={i1} alt="Achievement 2" className="object-cover shadow-lg w-full sm:w-1/3 h-[250px] sm:h-[350px]" />
      <img src={i} alt="Achievement 3" className="object-cover shadow-lg w-full sm:w-1/3 h-[250px] sm:h-[350px]" />
    </div>

    {/* Download Section */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full mt-10 px-4 text-center md:text-left">
      <span className="text-2xl font-extrabold text-purple-900 font-serif">
        DOWNLOAD <span className="text-purple-900">Our App</span>
      </span>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img src={gp} alt="Google Play" className="w-40 sm:w-48 h-auto" />
        <img src={sc} alt="Google Play QR" className="w-24 sm:w-32 h-auto" />
        <img src={app} alt="App Store" className="w-40 sm:w-48 h-auto" />
        <img src={sc} alt="App Store QR" className="w-24 sm:w-32 h-auto" />
      </div>
    </div>
  </div>
</div>



          
        </div>
        <Footer />
        <div className="w-full flex justify-center font-bold text-gray-600 mt-4 px-4 pb-4 text-center text-xs sm:text-sm">
        <h6>
          Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership |
          Powered by Swasthmnathan Meditech Pvt Ltd
        </h6>
      </div>
  </div>
    </>
  );
};

export default Hero; 