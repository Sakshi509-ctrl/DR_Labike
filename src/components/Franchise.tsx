import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MarketChart from "./marketing";  
import ROICalculator from "./roicalculator";
import CountUp from "react-countup";


const healthScreeningOptions = [
  {
    label: "BMI",
    title: "BMI",
    tests: "Tests: Height, Weight, BMI",
    parameters: 3,
  },
  {
    label: "BMR",
    title: "BMR",
    tests: "Tests: Body Fat, Visceral Fat, Base Metabolic Rate, Muscle Mass, Muscle Rate, Skeletal Muscle, Bone Mass, Body Water",
    parameters: 8,
  },
  {
    label: "Respiratory Risk",
    title: "Respiratory Risk",
    tests: "Tests: Oxygen Saturation, Body Temperature",
    parameters: 2,
  },
  {
    label: "Hypertension",
    title: "Hypertension",
    tests: "Tests: Blood Pressure",
    parameters: 1,
  },
  {
    label: "Cardiovascular Risk",
    title: "Cardiovascular Risk",
    tests: "Tests: Heart Rate, Lipid Profile (Total Cholesterol, Triglycerides, LDL, HDL, VLDL)",
    parameters: 6,
  },
  {
    label: "Diabetes",
    title: "Diabetes",
    tests: "Tests:Random Blood Sugar",
    parameters: 1,
  },
  {
    label: "Anameia",
    title: "Anemia",
    tests: "Tests: Hemoglobin, RBC, PCV, MCV, MCH, MCHC ",
    parameters: 6,
  },
  {
    label: "Kidney Function (KFT)",
    title: "Kidney Function (KFT)",
    tests: "Tests: Creatinine, eGFR",
    parameters: 2,
  },
  {
    label: "Liver Function (LFT)",
    title: "Liver Function (LFT)",
    tests: "Tests:Total Bilirubin, Direct Bilirubin, Indirect Bilirubin",
    parameters: 3,
  },
];


const FranchisePage = () => {
  const navigate = useNavigate();
  const [selectedScreening, setSelectedScreening] = useState(healthScreeningOptions[4]);
  const [menuOpen, setMenuOpen] = useState(false); // Add menuOpen state
  const marketRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  return (
<>
    <div className="bg-[#f8fcfb] min-h-screen text-center mt-0 pt-0 py-12 px-0">
      <header className="w-full bg-white shadow mt-0">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-4 md:py-6 relative">
          {/* Logo */}
          <div className="text-2xl font-bold mb-2 md:mb-0">
            <span className="text-[#1a2a5c]">DR</span>{" "}
            <span className="text-green-600">Labike</span>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden absolute right-4 top-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg className="w-7 h-7 text-[#1a2a5c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className={`w-full md:w-auto ${menuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-12 text-gray-600 text-lg font-normal items-center">
              <li>
                <button
                  className="focus:outline-none"
                  onClick={() => { setMenuOpen(false); marketRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Opportunity
                </button>
              </li>
              <li>
                <button
                  className="focus:outline-none"
                  onClick={() => { setMenuOpen(false); roiRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  ROI Calculator
                </button>
              </li>
              <li>
                <button
                  className="focus:outline-none"
                  onClick={() => { setMenuOpen(false); offerRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  The Offer
                </button>
              </li>
              <li>
                <button
                  className="focus:outline-none"
                  onClick={() => { setMenuOpen(false); servicesRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Services
                </button>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <div className="mt-4 md:mt-0">
            <button className="bg-[#1a2a5c] text-white text-lg font-normal rounded-full px-6 py-2" onClick={() => { setMenuOpen(false); navigate('/Contact'); }}>
              Invest Now  
            </button>
          </div>
        </div>
      </header>
     
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A2B5B] leading-tight mt-24">
        India's 1st Risk-Covered Mobile <br />
        <span className="text-[#1A2B5B]">Diagnostics Franchise</span>
      </h1>

                                                      
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
        A unique investment opportunity at the intersection of healthcare, franchising,
        and mobile technology. We empower entrepreneurs while making healthcare
        accessible for all.
      </p>

      
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xs h-52 transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-500">Initial Investment</h2>
          <p className="text-5xl font-generic text-[#1A2B5B] mt-2">₹<CountUp end={500000} duration={2.0} formattingFn={value => value.toLocaleString('en-IN')} /></p>
          <p className="text-sm text-gray-500 mt-1">To start your own diagnostic lab</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl border-4 border-green-500 p-6 w-full max-w-sm h-52 transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-500 ">Total Business Worth</h2>
          <p className="text-5xl font-generic text-green-500 mt-2">₹<CountUp end={12000000} duration={2.0} formattingFn={value => value.toLocaleString('en-IN')} /></p>
          <p className="text-sm text-gray-500 mt-1">With our 360° comprehensive support</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xs h-52 transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-500">Earning Potential</h2>
          <p className="text-5xl font-generic  text-[#1A2B5B] mt-2">₹<CountUp end={2100000} duration={2.0} formattingFn={value => value.toLocaleString('en-IN')} /></p>
          <p className="text-sm text-gray-500 mt-1">Projected over the first 3 years</p>
        </div>

        
      </div>

      
        <div ref={marketRef} className="mt-28">
          <h2 className="text-4xl md:text-4xl font-extrabold text-[#1A2B5B] inline-block px-6 py-2 rounded mb-4 mx-auto " style={{letterSpacing: '0.01em'}}>
            A Confluence Of Growth Markets
          </h2>
          <p className="text-xl text-[#1a2a5c] max-w-4xl mx-auto mt-0 mb-10">
            DR Labike is strategically positioned at the epicenter of three booming sectors in India. This section illustrates the immense market potential awaiting our franchise partners, creating a fertile ground for success and profitability.
          </p>
          <div className="flex justify-center w-full mt-10">
            <div className="w-full max-w-2xl px-4">
              <MarketChart />
            </div>
          </div>
        </div>
      

        <div ref={roiRef} className="mt-28">
          <h2 className="text-4xl md:text-4xl font-extrabold text-[#1A2B5B] inline-block px-6 py-2 rounded mb-4 mx-auto" style={{letterSpacing: '0.02em'}}>
            Interactive ROI Calculator
          </h2>
          <p className="text-0xl text-gray-600 max-w-4xl mx-auto mt-0 mb-10">
            Don't just read the numbers, explore them. Select a monthly patient volume to see your potential earnings come to life. This tool provides a transparent look at your projected profitability based on our proven model.
          </p>
          <div className="flex justify-left">
            <div>
              <ROICalculator />
            </div>
          </div>
        </div>
      
       
      <div ref={offerRef} className="mt-28">
        <h2 className="text-4xl md:text-4xl font-extrabold text-[#1A2B5B] inline-block px-6 py-2 rounded mb-4 mx-auto" style={{letterSpacing:'0.01em'}}>
        The Unmatched DR Labike Offer
        </h2>
        <p className="text-0xl text-gray-600 max-w-4xl mx-auto mt-0 mb-10">
        Your ₹5 Lakh investment unlocks a business valued at over ₹1.2 Crore. We provide a comprehensive, 360° support system designed to ensure your success and empower you to outperform local competition from day one.
        </p>
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-8">

            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <span className="text-5xl">✔️</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1A2B5B] mb-2 text-center">Clinical<br/>Support</h3>
              <p className="text-gray-600 text-lg text-center">Backed by expert pathologists and technicians, ensuring NABL-standard quality reports and operational excellence.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <span className="text-5xl">📈</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1A2B5B] mb-2 text-center">Marketing<br/>Support</h3>
              <p className="text-gray-600 text-lg text-center">Comprehensive online and offline strategies to build your brand locally and drive patient volume to your camps.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
              <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <span className="text-5xl">💻</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1A2B5B] mb-2 text-center">Technology<br/>Suite</h3>
              <p className="text-gray-600 text-lg text-center">Proprietary LIS Dashboard and Mobile App for seamless operations, from sample tracking to digital report delivery.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <span className="text-5xl">📦</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1A2B5B] mb-2 text-center">Operational<br/>Power</h3>
              <p className="text-gray-600 text-lg text-center">Includes guaranteed venue support, raw materials supply, and a fully-equipped lab setup to get you started.</p>
            </div>
          </div>
        </div>
        </div>
        
        <div ref={servicesRef} className="mt-28">
        <h2 className="text-4xl md:text-4xl font-extrabold text-[#1A2B5B] inline-block px-6 py-2 rounded mb-4 mx-auto" style={{letterSpacing:'0.01em'}}>
            Our Comprehensive Health Screening
            </h2>
             <p className="text-0xl text-gray-600 max-w-4xl mx-auto mt-0 mb-10">At the core of our service is a 31-parameter preventive health check-up. This section details the 9 key risk categories we assess, providing immense value to patients and aligning with the growing demand for preventive healthcare in India.</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-8 ">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {healthScreeningOptions.slice(0, 6).map(option => (
            <button
              key={option.label}
              className={`border-2 border-blue-500 font-bold text-base rounded-full px-4 py-2 shadow focus:outline-none transition-colors duration-150 ${selectedScreening.label === option.label ? 'bg-[#1A2B5B] text-white' : 'bg-white text-[#1a2a5c]'} active:bg-blue-900 active:text-white`}
              onClick={() => setSelectedScreening(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 w-full mt-2">
          {healthScreeningOptions.slice(6).map(option => (
            <button
              key={option.label}
              className={`border-2 border-blue-500 font-bold text-base rounded-full px-4 py-2 shadow focus:outline-none transition-colors duration-150 ${selectedScreening.label === option.label ? 'bg-[#1A2B5B] text-white' : 'bg-white text-[#1a2a5c]'} active:bg-blue-900 active:text-white`}
              onClick={() => setSelectedScreening(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="flex justify-center w-full mt-12">
          <div className="bg-gray-100 rounded-2xl shadow p-8 w-full max-w-4xl text-left">
            <div className="text-3xl font-extrabold text-[#1A2B5B] mb-2">{selectedScreening.title}</div>
            <div className="text-xl text-gray-800 mb-2">{selectedScreening.tests}</div>
            <div className="text-lg text-gray-500 mt-4">Total Parameters: {selectedScreening.parameters}</div>
          </div>
        </div>
         
        <div className="flex justify-center w-full mt-24">
          <div className="w-full">
            <div className="bg-[#1a2a5c] w-full py-24 flex flex-col items-center justify-center max-w-6xl mx-auto">
              <h2 className=" md:text-4xl font-extrabold text-white text-center mb-6">Ready To Reshape Healthcare In India?</h2>
              <p className="text-1xl text-blue-200 text-center max-w-2xl mb-10">Partner with DR Labike and become a leader in your community. Let's build a healthier future, together.</p>
              <button className="mt-2 px-12 py-5 text-1xl font-bold text-white border-2 border-blue-200 rounded-full bg-transparent hover:bg-blue-900 hover:border-white transition-colors duration-200 focus:outline-none" onClick={()=>navigate('/contact')}>Request Investment Details</button>
            </div>
            <div className="bg-gray-800  w-full py-8 flex flex-col items-center justify-center max-w-6xl mx-auto">
              <div className="text-gray-500 text-lg font-medium mb-2">© 2025 DR Labike. All Rights Reserved.</div>
              <div className="text-gray-500 text-base">This is an illustrative interactive report. All financial projections are based on the provided model and are for estimation purposes.</div>
            </div>
          </div>
      </div>
      </div>
    
    
    </>
  );
};

export default FranchisePage;

