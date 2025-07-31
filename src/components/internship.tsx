import React from 'react';
import Header from '../components/Header';  
import Footer from './footer';

const Internship = () => {
  return (
    
    <>
      <Header />
      <div className="px-6 md:px-16  bg-[#ffffff] text-[#2e2e2e]">
        <div className="flex flex-col lg:flex-row items-center">

        <div className="w-full lg:w-1/2 px-4 lg:ml-16 mb-8 lg:mb-0">
  <img
    src="/assets/intern.png"
    alt="Internship"
    className="w-full max-w-md mx-auto h-auto object-contain"
  />
</div>

          
          <div className="w-full lg:w-1/2 text-left  max-w-md space-y-4 ">
            <p className="text-sm leading-relaxed font-genericmt-3" >
              We are excited to invite you to our{' '}
              <strong>10days – 2 months intensive hands-on training program</strong>
              depending on the background of candidates, meticulously designed to equip participants 
              with advanced skills in biomedical techniques and laboratory practices.
              This training is ideal for <strong>Phlebotomists, DMLT, CMLT, MMLT, ANM, 
              GNM Pharmacist, GDA & Emergency Technician</strong>, and those looking 
              to expand their knowledge and gain comprehensive practical exposure.
            </p>
            <p className="text-base md:text-lg mb-4 font-generic">
              <strong>Our Vision:</strong> “<strong>Empowering Youth: Real Building.”</strong>
            </p>

            <button
              className="bg-[#0056D2] hover:bg-green-500 text-white font-semibold px-5 py-3 mt-8"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSffYDene6W2YrEIqas02EbcD47ZDGnY6YgRY2j-TFArBq-3Qg/viewform', '_blank')}
            >
              Apply for Internship
            </button>
          </div>
        </div>

        
        <div className="px-8 md:px-20 py-8">
  <h2 className="text-base font-bold font-generic text-[#0a0a0a] mb-4">About The Saksham Platform</h2>

  <p className="text-sm font-generic text-[#111827] mb-4">
    The Saksham Platform is a <strong>100% job assurance program</strong> that combines in-depth practical training
    with various support systems, making it a holistic solution for building careers in the biomedical field. We leverage
    government-backed schemes under MSME to provide long-term benefits for participants and aspiring lab professionals.
  </p>

  <p className="text-sm font-generic text-[#111827] mb-4">
    Project Saksham, an initiative by Swasthgram, generously funded by Dr. Labike. This program bridges the gap between
    theory and practical application in advanced clinical biochemistry, ensuring hands-on expertise for aspiring
    healthcare professionals.
  </p>

  <p className="text-sm font-generic text-[#111827] mb-4 font-semibold">
    Over 1,000 job opportunities available!
  </p>

  <p className="text-sm font-generic text-[#111827] mb-4">
    <strong>Program Fee:</strong> Originally <strong>45,000,</strong> but thanks to Dr. Labike’s investment, selected candidates
    can enroll for just <strong>Rs 5,000</strong>.
  </p>

  <p className="text-sm font-generic text-[#111827] mb-4 font-semibold">
    Program Curriculum: (Hand-on-practice 200 to 500 times of all 200 Biomedical test )
  </p>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Laboratory Instruments:</strong> <br></br>Equipment Covered: Digital Microscope, Centrifuge, Biochemistry Analyzer,
    BMI Machine, Urine Analyzer, Incubator, BP Machine, ECG Machine understanding<br></br>Types, Usage, and Maintenance, Managing Glassware and learning the basics of SI Units
  </p><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Microscopy Techniques:</strong> Preparing and analyzing slides: Peripheral Blood Smear, Sputum for Mycobacterium tuberculosis, Stool, Urine, Fungal, and Sickle Cell Slides, Cancer Screening: Rapid Pap smear and buccal mucosa analysis, Gram Staining for pus and sputum sample,  Slide Analysis: Practical and theoretical training.

  </p><br></br><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Urine Analysis:</strong>  Physical Parameters: Volume, color, transparency, pH, specific gravity, Chemical Parameters: Glucose, protein, blood, urobilinogen, ketone, nitrate, and leukocyte counts
  </p><br></br><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Phlebotomy Techniques:</strong> Introduction to Venipuncture, site selection, and blood collection types, Tourniquet Application, Order of Draw, Labeling, and Safe Handling
  </p><br></br><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Biochemistry Profile:</strong>  Comprehensive testing, including Sugar Profile, Liver Function Tests, Lipid Profile, and Electrolytes 
  </p><br></br><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Serological Examination:</strong> Testing for Widal, Typhoid, Malaria, Dengue, HIV, HCV, HBsAG, RA-Factor, CRP, Pregnancy (UPT), and RPR (VDRL)
    Soft Skills Development: Enhancing Communication, Professional Writing, Time Management, and Leadership Skills, Developing Problem-Solving and Decision-Making Strategies
  </p><br></br>

<p className='text-sm font-bold font-generic text-[#111827]'>Program Benefits:</p>
  <p className="text-sm font-generic text-[#111827]">
    <strong>Industry-Recognized Certification</strong> Upon successful completion and assessment, you will receive a certification that enhances your career prospects.
  </p><br></br><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>100% Job Guarantee</strong> – We provide assured placement in relevant roles for those seeking employment.
  </p><br></br>

  <p className="text-sm font-generic text-[#111827]">
    <strong>Lab Setup Support for Entrepreneurs:- </strong>For aspiring business owners, we offer:
  </p>
  <p className='font-generic'>Loan assistance to help establish your own diagnostic lab.</p>
  <p className='font-generic'>A 2-year business support contract worth Rs50,000–Rs70,000 per month.<br></br>Pathology & technical support, including cloud-based report systems.</p><br></br>

<p className="text-sm font-bold font-generic text-[#111827]">Register Now!</p>
<p className='font-generic'>Please fill out the form below to register for the training. If you have any questions, feel free to reach out to us at:</p>
<p className="text-sm font-bold font-generic text-[#111827]">Contact Us: +91-9990038097 </p>
</div><br></br><br></br>

          <Footer />
          <div className="w-full flex justify-center font-bold text-gray-600 mt-4 mb-4">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>  
        </div>
     
    </>
  );
}
export default Internship;
