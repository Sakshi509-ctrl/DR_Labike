import React, { useState } from 'react';
// import Footer from './footer';
import Header from './Header';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';

interface ReadMoreContent {
    title: string;
    image: string;
    content: string;
}

interface BlogData {
    id: number;
    title: string;
    category: string;
    shortDescription: string;
    image: string;
    readMoreContent: ReadMoreContent;
}

const MedicalBlogsPage2 = () => {
    const navigate = useNavigate();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    
    const [readMoreModal, setReadMoreModal] = useState({
        isOpen: false,
        content: '',
        title: '',
        image: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3; 

    const today = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const blogData: BlogData[] = [
        {
            id: 1,
            title: "Understanding Surrogacy: Meaning, Process, and Key Considerations",
            category: "surrogacy",
            shortDescription: "Explore our surrogacy guide: Understand the process, costs, legal aspects, and debunk common myths to learn how surrogacy creates new families.",
            image: "/assets/color.png",
            readMoreContent: {
                title: "Understanding Surrogacy: Meaning, Process, and Key Considerations",
                image: "/assets/color.png",
                content: `
                    <h2 class="text-2xl font-bold mb-4">What is Surrogacy?</h2>
                    <p class="mb-4">Surrogacy is a reproductive arrangement where a woman (the surrogate) carries and delivers a child for another person or couple (the intended parents). This arrangement is typically used when intended parents are unable to conceive or carry a pregnancy to term.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">Types of Surrogacy</h2>
                    <h3 class="text-xl font-semibold mb-2">1. Traditional Surrogacy</h3>
                    <p class="mb-4">In traditional surrogacy, the surrogate's own egg is fertilized with the intended father's sperm or donor sperm. The surrogate is genetically related to the child.</p>
                    
                    <h3 class="text-xl font-semibold mb-2">2. Gestational Surrogacy</h3>
                    <p class="mb-4">In gestational surrogacy, the surrogate carries an embryo created using the intended parents' eggs and sperm, or donor eggs and sperm. The surrogate has no genetic connection to the child.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">The Surrogacy Process</h2>
                    <ol class="list-decimal list-inside space-y-2 mb-4">
                        <li>Initial consultation and medical evaluation</li>
                        <li>Legal agreements and contracts</li>
                        <li>Medical procedures (IVF, embryo transfer)</li>
                        <li>Pregnancy monitoring</li>
                        <li>Delivery and legal transfer of parental rights</li>
                    </ol>
                    
                    <h2 class="text-2xl font-bold mb-4">Legal Considerations</h2>
                    <p class="mb-4">Surrogacy laws vary significantly by country and state. It's crucial to work with experienced legal professionals who specialize in reproductive law to ensure all parties' rights are protected.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">Costs Involved</h2>
                    <p class="mb-4">Surrogacy costs typically range from $80,000 to $150,000 and may include medical expenses, legal fees, surrogate compensation, and agency fees.</p>
                `
            }
        },
        {
            id: 2,
            title: "IVF Full Form in Hindi: समझें प्रक्रिया, जोखिम और मिथक",
            category: "in vitro fertilization ivfg",
            shortDescription: "इस ब्लॉग में IVF (इन विट्रो फर्टिलाइजेशन) की प्रक्रिया, स्वास्थ्य जोखिम, और मिथकों को सरल भाषा में समझाया गया है।",
            image: "/assets/Revised.png",
            readMoreContent: {
                title: "IVF Full Form in Hindi: समझें प्रक्रिया, जोखिम और मिथक",
                image: "/assets/Revised.png",
                content: `
                    <h2 class="text-2xl font-bold mb-4">IVF क्या है?</h2>
                    <p class="mb-4">IVF का पूरा नाम है "In Vitro Fertilization" जिसका हिंदी में मतलब है "परीक्षण ट्यूब में निषेचन"। यह एक सहायक प्रजनन तकनीक है जो उन जोड़ों की मदद करती है जो स्वाभाविक रूप से गर्भधारण नहीं कर पाते।</p>
                    
                    <h2 class="text-2xl font-bold mb-4">IVF प्रक्रिया के चरण</h2>
                    <h3 class="text-xl font-semibold mb-2">1. ओवेरियन स्टिमुलेशन</h3>
                    <p class="mb-4">हार्मोन इंजेक्शन के माध्यम से अंडाशय को उत्तेजित किया जाता है ताकि कई अंडे उत्पन्न हों।</p>
                    
                    <h3 class="text-xl font-semibold mb-2">2. अंडे का संग्रह</h3>
                    <p class="mb-4">परिपक्व अंडों को सर्जिकल प्रक्रिया के माध्यम से निकाला जाता है।</p>
                    
                    <h3 class="text-xl font-semibold mb-2">3. निषेचन</h3>
                    <p class="mb-4">प्रयोगशाला में शुक्राणु के साथ अंडों को मिलाया जाता है।</p>
                    
                    <h3 class="text-xl font-semibold mb-2">4. भ्रूण स्थानांतरण</h3>
                    <p class="mb-4">निषेचित अंडे (भ्रूण) को गर्भाशय में स्थानांतरित किया जाता है।</p>
                    
                    <h2 class="text-2xl font-bold mb-4">सफलता दर</h2>
                    <p class="mb-4">35 वर्ष से कम उम्र की महिलाओं में IVF की सफलता दर लगभग 40-50% है। उम्र बढ़ने के साथ यह दर कम होती जाती है।</p>
                    
                    <h2 class="text-2xl font-bold mb-4">सामान्य मिथक</h2>
                    <ul class="list-disc list-inside space-y-2 mb-4">
                        <li>IVF से पैदा हुए बच्चे कमजोर होते हैं</li>
                        <li>IVF हमेशा सफल होता है</li>
                        <li>IVF से जुड़वां बच्चे ही पैदा होते हैं</li>
                    </ul>
                `
            }
        },
        {
            id: 3,
            title: "Surrogacy Meaning in Tamil: An In-Depth Explanation",
            category: "surrogacy",
            shortDescription: "சரோகசி பற்றிய எளிய விளக்கம்: தமிழ்நாட்டில் சரோகசியின் சட்டம், மருத்துவம், உணர்ச்சி மற்றும் பொருளாதார அம்சங்கள்",
            image: "/assets/meaning.png",
            readMoreContent: {
                title: "Surrogacy Meaning in Tamil: An In-Depth Explanation",
                image: "/assets/meaning.png",
                content: `
                    <h2 class="text-2xl font-bold mb-4">சரோகசி என்றால் என்ன?</h2>
                    <p class="mb-4">சரோகசி என்பது ஒரு பெண் மற்றொரு தம்பதியருக்காக குழந்தையை கருத்தரித்து பிறப்பிக்கும் ஒரு செயல்முறை. இது மருத்துவ முறையில் செய்யப்படும் ஒரு உதவி.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">சரோகசியின் வகைகள்</h2>
                    <h3 class="text-xl font-semibold mb-2">1. பாரம்பரிய சரோகசி</h3>
                    <p class="mb-4">இதில் சரோகசி பெண்ணின் முட்டையே பயன்படுத்தப்படுகிறது. இந்த பெண் குழந்தைக்கு மரபணு ரீதியாக தொடர்புடையவர்.</p>
                    
                    <h3 class="text-xl font-semibold mb-2">2. கருத்தரிப்பு சரோகசி</h3>
                    <p class="mb-4">இதில் சரோகசி பெண்ணுக்கு மரபணு தொடர்பு இல்லை. அவர் வெறும் கருத்தரிப்பு செய்பவர்.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">சரோகசி செயல்முறை</h2>
                    <ol class="list-decimal list-inside space-y-2 mb-4">
                        <li>மருத்துவ பரிசோதனை மற்றும் மதிப்பீடு</li>
                        <li>சட்ட ஒப்பந்தங்கள்</li>
                        <li>மருத்துவ செயல்முறைகள்</li>
                        <li>கருத்தரிப்பு கண்காணிப்பு</li>
                        <li>பிரசவம் மற்றும் சட்ட பரிமாற்றம்</li>
                    </ol>
                    
                    <h2 class="text-2xl font-bold mb-4">சட்ட அம்சங்கள்</h2>
                    <p class="mb-4">தமிழ்நாட்டில் சரோகசி சட்டம் மிகவும் கடுமையாக உள்ளது. இது சட்டப்பூர்வமாக அனுமதிக்கப்பட்டுள்ளது ஆனால் கடுமையான விதிமுறைகளுடன்.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">செலவுகள்</h2>
                    <p class="mb-4">சரோகசி செலவு ₹15-30 லட்சம் வரை இருக்கலாம். இதில் மருத்துவ செலவுகள், சட்ட செலவுகள் மற்றும் சரோகசி பெண்ணுக்கான ஈட்டம் அடங்கும்.</p>
                `
            }
        },
        {
            id: 4,
            title: "Trusted by 150,000+ Families, 80+ Cities, 290+ Expert Doctors, 150+ Advanced Clinics",
            category: "news and media",
            shortDescription: "IVF (in vitro fertilization) is a type of fertility treatment where eggs are combined with sperm outside of your body in a lab. It's a method used by people who need help achieving pregnancy.",
            image: "/assets/ivff.png",
            readMoreContent: {
                title: "Trusted by 150,000+ Families, 80+ Cities, 290+ Expert Doctors, 150+ Advanced Clinics",
                image: "/assets/ivff.png",
                content: `
                    <h2 class="text-2xl font-bold mb-4">Our Legacy of Trust</h2>
                    <p class="mb-4">For over two decades, we have been at the forefront of reproductive medicine, helping thousands of families realize their dreams of parenthood. Our commitment to excellence and patient care has made us the most trusted name in fertility treatment.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">Why Choose Us?</h2>
                    <h3 class="text-xl font-semibold mb-2">1. Expert Medical Team</h3>
                    <p class="mb-4">Our team of 290+ expert doctors includes internationally recognized specialists in reproductive medicine, embryology, and fertility surgery. Each doctor brings years of experience and specialized training.</p>
                    
                    <h3 class="text-xl font-semibold mb-2">2. Advanced Technology</h3>
                    <p class="mb-4">We invest in the latest reproductive technologies and equipment to ensure the highest success rates. Our laboratories meet international standards and are regularly audited for quality.</p>
                    
                    <h3 class="text-xl font-semibold mb-2">3. Nationwide Presence</h3>
                    <p class="mb-4">With 150+ advanced clinics across 80+ cities, we bring world-class fertility care closer to you. No matter where you are in India, expert help is just around the corner.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">Our Success Stories</h2>
                    <p class="mb-4">150,000+ families have successfully conceived through our treatments. Each success story motivates us to continue improving our services and expanding our reach.</p>
                    
                    <h2 class="text-2xl font-bold mb-4">Comprehensive Care</h2>
                    <ul class="list-disc list-inside space-y-2 mb-4">
                        <li>Fertility assessment and diagnosis</li>
                        <li>IVF and IUI treatments</li>
                        <li>Surrogacy services</li>
                        <li>Genetic testing and counseling</li>
                        <li>Fertility preservation</li>
                        <li>Emotional and psychological support</li>
                    </ul>
                    
                    <h2 class="text-2xl font-bold mb-4">Patient-Centric Approach</h2>
                    <p class="mb-4">We understand that fertility treatment can be emotionally challenging. Our team provides compassionate care and personalized treatment plans to ensure the best possible outcomes for every patient.</p>
                `
            }
        }
    ];

    
    const totalPages = Math.ceil(blogData.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = blogData.slice(startIndex, endIndex);

    const openReadMore = (blog: BlogData) => {
        setReadMoreModal({
            isOpen: true,
            content: blog.readMoreContent.content,
            title: blog.readMoreContent.title,
            image: blog.readMoreContent.image
        });
    };

    const closeReadMore = () => {
        setReadMoreModal({
            isOpen: false,
            content: '',
            title: '',
            image: ''
        });
    };

    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div>
            <Header />
            <div className="flex">
                <div className="flex-1 ml-24 mt-8">
                  

                    <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6">
                        <img src={'/assets/color.png'} alt="Medical Blogs" className="w-[800px] h-[400px] object-cover"/>
                    </div>

                    
                    {currentBlogs.map((blog: BlogData) => (
                        <div key={blog.id} className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
                            <img src={blog.image} alt={blog.title} className="w-[800px] h-[400px] object-cover"/>
                            <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
                                {blog.title}
                            </p>
                            
                            <div className="flex items-center gap-2 ml-5 mt-4">
                                <Bookmark className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-600 text-base">
                                    {blog.category}
                                </span>
                            </div>
                            <br></br>
                            <p className='text-gray-600 ml-4'>
                                {blog.shortDescription}
                            </p>
                            <div className="flex justify-end w-full pr-8">
                                <button
                                    onClick={() => openReadMore(blog)}
                                    className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4 transition-colors duration-300">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}


                                {blogData.length > 0 && (
                <div className="bg-white shadow-lg w-[700px] overflow-  hidden mb-6 p-4 text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-blue-800 font-semibold text-lg">
                            Page {currentPage} of {totalPages}
                        </p>
                        <p className="text-blue-600 text-sm">
                            Showing blogs {startIndex + 1} to {Math.min(endIndex, blogData.length)} of {blogData.length} total blogs
                        </p>
                        <p className="text-blue-500 text-xs mt-1">
                            {blogsPerPage} blogs per page
                        </p>
                    </div>
                </div>
            )}
            
            {/* Main Pagination Controls */}
            {blogData.length > 0 && (
                <div className="flex justify-center items-center mt-8 mb-8">
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-2 rounded ${
                                    currentPage === index + 1
                                        ? 'bg-red-500 text-white'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
                </div>
                
                <div className="w-80 mr-24 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
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

                    <div className="bg-orange-300 p-4 rounded-lg shadow-lg h-[400px] flex flex-col justify-center items-center">
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
                            
                            <h3 className='text-2xl font-bold'>Categories</h3>
                            <div className='text-gray-500'>
                                <p>Teleconsulation (12)</p><br></br>
                                <p>Checkup (22)</p><br></br>
                                <p>Pathology (14)</p><br></br>
                                <p>Medicine (100+)</p><br></br>
                                <p>Lab (9)</p><br></br>
                                <p>security (4)</p><br></br>
                                <p>Teleconsulation (12)</p><br></br>
                                <p>Teleconsulation (12)</p><br></br>
                                <p>Checkup (22)</p><br></br>
                                <p>Pathology (14)</p><br></br>
                                <p>Medicine (100+)</p><br></br>
                                <p>Lab (9)</p><br></br>
                                <p>security (4)</p><br></br>
                                <p>Teleconsulation (12)</p><br></br>
                            </div>
                            
                            <h4 className='text-2xl font-bold'>Most Search Page</h4>
                            <div className='text-semibold font-serif'>
                                <div className="flex items-center gap-2 mb-3">
                                    <img src="/assets/checkup.png" alt="Checkup" className="w-18 h-11" />
                                    <p>Checkup Cost in India <br></br><i><span className='text-gray-500'>{today}</span></i></p> 
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                                    <p>BCheckup Cost in Delhi<br></br><i><span className='text-gray-500'>{today}</span></i></p>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                                    <p>Checkup Cost in Gurgaon<br></br><i><span className='text-gray-500'>{today}</span></i></p>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
                                    <p>Checkup Cost in Mumbai<br></br><i><span className='text-gray-500'>{today}</span></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="flex justify-center items-center mt-4 mb-8">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => {
                            navigate('/medical-blogs');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-2 rounded text-red-500 hover:text-red-700 hover:bg-red-100 font-semibold"
                    >
                        1
                    </button>
                    <button 
                        onClick={() => {
                            setCurrentPage(1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-3 py-2 rounded ${
                            currentPage === 1
                                ? 'bg-red-500 text-white'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        2
                    </button>
                    <button 
                        onClick={() => {
                            setCurrentPage(3);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-3 py-2 rounded ${
                            currentPage === 3
                                ? 'bg-red-500 text-white'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100' 
                        }`}
                    >
                        3
                    </button>
                </div>
            </div>
            
            {/* <Footer /> */}
            
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

            {readMoreModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-3xl font-bold text-gray-800 pr-4">
                                    {readMoreModal.title}
                                </h2>
                                <button
                                    onClick={closeReadMore}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                            
                            {readMoreModal.image && (
                                <img 
                                    src={readMoreModal.image} 
                                    alt={readMoreModal.title}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                            )}
                            
                            <div 
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: readMoreModal.content }}
                            />
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeReadMore}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ContactModal 
                isOpen={isContactModalOpen} 
                onClose={() => setIsContactModalOpen(false)} 
            />
        </div>
    );
};

export default MedicalBlogsPage2;
