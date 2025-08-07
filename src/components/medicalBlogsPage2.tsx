import React, { useState } from 'react';
import Footer from './footer';
import Header from './Header';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';

const MedicalBlogsPage2 = () => {
    const navigate = useNavigate();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const today = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      

    return (
        <div>
            <Header />
            <div className="flex">

                <div className="flex-1 ml-24 mt-8">
                 <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6">
                   <img src={'/assets/color.png'} alt="Medical Blogs" className="w-[800px] h-[400px] object-cover"/>
                 </div>

                <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[200px]">
                  <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">
                    Understanding Surrogacy: Meaning, Process, and Key Considerations
                    </h1>
                    <p className='text-gray-600'>
                    surrogacy                    
                    </p>
                    
                    <div className="self-start mb-4 ml-4">
                    <p className="text-gray-600 mb-4 ">
                    Explore our surrogacy guide: Understand the process, costs, legal aspects, and debunk common myths to learn how surrogacy creates new families.
                     </p>
                     <div className="flex justify-end w-full pr-8">
                       <button
                         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4">
                         Read More
                       </button>
                     </div>
                  </div>
                </div>
                <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
                   <img src={'/assets/Revised.png'} alt="Automicro" className="w-[800px] h-[400px] object-cover"/>
                   <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
                   IVF Full Form in Hindi: समझें प्रक्रिया, जोखिम और मिथक           
                   </p>
                      
                 <div className="flex items-center gap-2 ml-5 mt-4">
                 <Bookmark className="w-5 h-5 text-gray-500" />
                 <span className="text-gray-600 text-base">
                 in vitro fertilization ivfg</span>
                 </div><br></br>
                 <p className='text-gray-600 ml-4'>
                 इस ब्लॉग में IVF (इन विट्रो फर्टिलाइजेशन) की प्रक्रिया, स्वास्थ्य जोखिम, और मिथकों को सरल भाषा में समझाया गया है।
                 </p>
                 <div className="flex justify-end w-full pr-8">
                       <button
                         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4">
                         Read More
                       </button>
                     </div>
                </div>
                <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
                   <img src={'/assets/meaning.png'} alt="Accurapid" className="w-[800px] h-[400px] object-cover"/>
                   <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
                   Surrogacy Meaning in Tamil: An In-Depth Explanation
                   </p>                      
                    <div className="flex items-center gap-2 ml-5 mt-4">
                 <Bookmark className="w-5 h-5 text-gray-500" />
                 <span className="text-gray-600 text-base">
                 surrogacy
                 </span>
                 </div>
                 <p className='text-gray-700 mt-4 ml-5'>
                 சரோகசி பற்றிய எளிய விளக்கம்: தமிழ்நாட்டில் சரோகசியின் சட்டம், மருத்துவம், உணர்ச்சி மற்றும் பொருளாதார அம்சங்கள்                </p>

                <div className="flex justify-end w-full pr-8">
                       <button
                         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4">
                         Read More
                       </button>
                     </div>
                </div>
                <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
                   <img src={'/assets/ivff.png'} alt="Accurine" className="w-[800px] h-[400px] object-cover"/>
                   <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
                   Trusted by 150,000+ Families, 80+ Cities, 290+ Expert Doctors, 150+ Advanced Clinics                </p>
                      
                 <div className="flex items-center gap-2 ml-5 mt-4">
                 <Bookmark className="w-5 h-5 text-gray-500" />
                 <span className="text-gray-600 text-base">
                 news and media</span>
                 </div>
                 <p className='text-gray-700 mt-4 ml-5'>
                 IVF (in vitro fertilization) is a type of fertility treatment where eggs are combined with sperm outside of your body in a lab. It’s a method used by people who need help achieving pregnancy. IVF involves many complex steps and is an effective form of assisted reproductive technology (ART).               </p>

                <div className="flex justify-end w-full pr-8">
                       <button
                         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4">
                         Read More
                       </button>
                     
                     </div>
                </div>
                </div>
                </div>
      <div className="w-80 mr-24 mt-8 ">
                
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4 ">
                  <p className="text-black text-center mb-2 font-semibold">Search</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-orange-300 p-4 rounded-lg shadow-lg  h-[400px] flex flex-col justify-center items-center">
                   <p className="text-2xl text-white text-center mb-4 font-semibold mt-0">HEALTH PACKAGE</p>
                    <div className="text-center">
                      <img src={'/assets/checkk.png'} alt="Promotional" className="w-64 h-64 mx-auto rounded-lg object-cover"/>
                    </div>
                 </div>
                    <p className='text-2xl text-gray-900 mt-6 text-center mb-4'>
                     Get in Touch
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-800 font-bold mb-2">Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter your name" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-800 font-bold mb-2">Mobile Number</label>
                        <input 
                          type="tel" 
                          placeholder="Enter your mobile number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-800 font-bold mb-2">Select Service</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Teleconsultation</option>
                          <option>Pathology Tests</option>
                          <option>Checkup</option>
                          <option>Medicine</option>
                        </select>
                      </div>
                      
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                        Submit
                      </button>
                      <h3 className='text-2xl font-bold'> Categories </h3>
                      <div className='text-gray-500'>
                      <p>Teleconsulation (12) </p><br></br>
                      <p>Checkup (22) </p><br></br>
                      <p>Pathology (14) </p><br></br>
                      <p>Medicine (100+) </p><br></br>
                      <p>Lab (9) </p><br></br>
                      <p>security (4) </p><br></br>
                      <p>Teleconsulation (12) </p><br></br>
                      <p>Teleconsulation (12) </p><br></br>
                      <p>Checkup (22) </p><br></br>
                      <p>Pathology (14) </p><br></br>
                      <p>Medicine (100+) </p><br></br>
                      <p>Lab (9) </p><br></br>
                      <p>security (4) </p><br></br>
                      <p>Teleconsulation (12) </p><br></br>
                      </div>
                      <h4 className='text-2xl font-bold'>Most Search Page</h4>
                        <div className='text-semibold font-serif'>
                         <div className="flex items-center gap-2 mb-3">
                           <img src="/assets/checkup.png" alt="Checkup" className="w-18 h-11" />
                           <p>Checkup Cost in India <br></br><i><span className='text-gray-500'>{today}</span></i> </p> 
                         </div>
                         <div className="flex items-center gap-2 mb-3">
                           <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                           <p>BCheckup Cost in Delhi<br></br><i><span className='text-gray-500'>{today}</span></i> </p>
                         </div>
                         <div className="flex items-center gap-2 mb-3">
                           <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                           <p>Checkup Cost in Gurgaon<br></br><i><span className='text-gray-500'>{today}</span></i></p>
                         </div>
                         <div className="flex items-center gap-2 mb-3">
                           <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                           <p>Checkup Cost in Mumbai<br></br><i><span className='text-gray-500'>{today}</span> </i> </p>
                         </div>
                       </div>
                    </div>
                  </div>
              </div>
            </div>
            
            <div className="flex justify-center items-center mt-8 mb-8">
              <div className="flex items-center space-x-2">
 
                <button className="text-gray-500 hover:text-gray-700 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
 
                <button 
                  onClick={() => navigate('/medical-blogs')}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  1
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700 bg-red-100 rounded">2</button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">4</button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">5</button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">6</button>
                
                <button className="text-gray-500 hover:text-gray-700 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2">Last</button>
              </div>
            </div>
            
        <Footer />
        
        <div className="fixed bottom-20 right-6 z-50">
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
        
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
        </div>
    );
}

export default MedicalBlogsPage2; 