import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';

interface BlogData {
	_id: string;
	title: string;
	content: string;
	readMoreContent: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}



const MedicalBlogs = () => {
	const navigate = useNavigate();
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [blogs, setBlogs] = useState<BlogData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const blogsPerPage = 5;


	
	const today = new Date().toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	  });

	useEffect(() => {
		fetchBlogs();
	}, []);



	
	const fetchBlogs = async () => {
		try {
			setIsLoading(true);
			const blogsData = await apiService.getBlogs();
			setBlogs(blogsData);
			setError('');
		} catch (err) {
			setError('Failed to fetch blogs');
			console.error('Error fetching blogs:', err);
		} finally {
			setIsLoading(false);
		}
	};

	// Calculate pagination
	const totalPages = Math.ceil(blogs.length / blogsPerPage);
	const startIndex = (currentPage - 1) * blogsPerPage;
	const endIndex = startIndex + blogsPerPage;
	const currentBlogs = blogs.slice(startIndex, endIndex);

	const formatDateTime = (isoString: string) => {
		try {
			return new Date(isoString).toLocaleString('en-IN', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return '';
		}
	};

	const openReadMore = (blog: BlogData) => {
		navigate(`/blog/${blog._id}`);
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
				 {isLoading ? (
				   <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6 p-8 text-center">
				     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
				     <p className="text-gray-600 mt-4">Loading medical blogs...</p>
				   </div>
				 ) : error ? (
				   <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6 p-8 text-center">
				     <p className="text-red-600">{error}</p>
				     <button 
				       onClick={fetchBlogs}
				       className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
				     >
				       Retry
				     </button>
				   </div>
				 ) : blogs.length > 0 ? (
				   <>
				     {currentBlogs.length > 0 ? (
				       currentBlogs.map((blog) => (
				         <div key={blog._id} className="mb-6">
				           <div className="bg-white shadow-lg w-[700px] overflow-hidden">
				             <img src={blog.image} alt={blog.title} className="w-[800px] h-[400px] object-cover"/>
				           </div>

				           <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[200px]">
				             <div className="flex flex-col items-center justify-center min-h-[200px]">
				               <h1 className="text-3xl font-bold text-gray-800 mb-1 mt-4 text-center px-4">
				                   {blog.title}
				               </h1>
				               <div className="self-end mr-4 mb-2 text-gray-500 text-sm">
				               Date : {formatDateTime(blog.updatedAt || blog.createdAt)}
				               </div>
				               <div className="self-start mb-4 ml-4">
				                   
				                   
				               </div>
				               <p className="text-gray-600 mb-4 ml-4 px-4 text-center">
				                {blog.content}
				                </p>
				                <div className="flex justify-end w-full pr-8">
				                  <button
				                    className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4" 
				                    onClick={() => openReadMore(blog)}>
				                    Read More 
				                  </button>
				                </div>
				             </div>
				           </div>
				         </div>
				       ))
				     ) : (
				       <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6 p-8 text-center">
				         <p className="text-gray-600">No blogs on this page. Use pagination to navigate.</p>
				       </div>
				     )}
				   </>
				 ) : (
				   <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6 p-8 text-center">
				   </div>
				 )}
				 
				 {blogs.length > 0 && (
				   <div className="bg-white shadow-lg w-[700px] overflow-hidden mb-6 p-4 text-center">
				     <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
				       <p className="text-blue-800 font-semibold text-lg">
				         Page {currentPage} of {totalPages}
				       </p>
				       <p className="text-blue-600 text-sm">
				         Showing blogs {startIndex + 1} to {Math.min(endIndex, blogs.length)} of {blogs.length} total blogs
				       </p>
				       <p className="text-blue-500 text-xs mt-1">
				         {blogsPerPage} blogs per page
				       </p>
				       <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
				         <p><strong>Debug Info:</strong></p>
				         <p>Current Page: {currentPage}</p>
				         <p>Start Index: {startIndex}</p>
				         <p>End Index: {endIndex}</p>
				         <p>Blogs on this page: {currentBlogs.length}</p>
				         <p>Total blogs: {blogs.length}</p>
				       </div>
				     </div>
				   </div>
				 )}


				
				<div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
				   	<img src={'/assets/lord.png'} alt="Lord" className="w-[800px] h-[400px] object-cover"/>
				   <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
				 Get instant and accurate diagnostic services Pathology tests at a super affordable cost from DrLaBike clinic.
				 </p>
				
				
				 <div className="flex items-center gap-2 ml-5 mt-4">
				 <Bookmark className="w-5 h-5 text-gray-500" />
				 <span className="text-gray-600 text-base">news and media</span>
				 </div>
				 
				 <div className="flex justify-end w-full pr-8">
				       <button
				         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4" onClick={()=>navigate('/digRead')}>
				         Read More
				       </button>
				     </div>
				 </div>
				
				 <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
				   <img src={'/assets/pcod.png'} alt="Lord" className="w-[800px] h-[400px] object-cover"/>
				   <p className='text-2xl font-normal font-semibold mt-9 ml-5'>
				 PCOD Diet Chart                                 
				 </p>
				 <div className="flex items-center gap-2 ml-5 mt-4">
				 <Bookmark className="w-5 h-5 text-gray-500" />
				 <span className="text-gray-600 text-base">
				 fertility treatment</span>
				 </div>
				 <p className='text-gray-700 mt-4 ml-5'>
				 A PCOD Diet Chart plan includes meals rich in fiber, low glycemic, Antioxidant-Rich, Green Leafy, Lean proteins and healthy fats.
				</p>

				 <div className="flex justify-end w-full pr-8">
				       <button
				         	className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4" onClick={() => navigate('/readmore')}>
				         Read More
				       </button>
				     </div>
				 </div>
				
				 
				   <div className="bg-white shadow-lg w-[700px] overflow-hidden mt-4 min-h-[600px]">
				       <img src={'/assets/ivff.png'} alt="Lord" className="w-[800px] h-[400px] object-cover"/>
				       <p className='text-2xl font-semibold mt-9 ml-5'>
				       After how many weeks IVF pregnancy is considered safe ?  </p>
			
				
				   <div className="flex items-center gap-2 ml-5 mt-4">
				 <Bookmark className="w-5 h-5 text-gray-500" />
				 <span className="text-gray-600 text-base">surrogacy cost</span>
				 </div>
				 <p className='text-gray-700 mt-4 ml-5'>
				 IVF pregnancy is considered safe after first trimester.Every trimester is a critical time to receive routine prenatal care.               </p>

				 <div className="flex justify-end w-full pr-8">
				       <button
				         className="w-36 h-10 bg-red-500 hover:bg-blue-800 text-white font-bold rounded-lg shadow text-base mb-4" onClick={() => navigate('/ivfread')}>
				         Read More
				       </button>
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
				   <p className="text-2xl text-white text-center mb-4 font-semibold mt-0">CHECKUP PACKAGE</p>
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
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Mobile Number
						</label>
						<input 
						  type="tel" 
						  placeholder="Enter your mobile number" 
						  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					  </div>
					  
					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
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
						   <p>Checkup Cost in Delhi <br></br><i><span className='text-gray-500'>{today}</span></i> </p>
						 </div>
						 <div className="flex items-center gap-2 mb-3">
						   <img src="/assets/checkup.png" alt="Checkup" className="w-20 h-11" />
						   <p>Checkup Cost in Gurgaon <br></br><i><span className='text-gray-500'>{today}</span></i></p>
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
				
			
			{blogs.length > 0 && (
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

			<div className="flex justify-center items-center mt-8 mb-8">
				<div className="flex items-center space-x-2">
					<button 
						onClick={() => setCurrentPage(1)}
						className={`px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer ${
							currentPage === 1 ? 'bg-red-100 rounded' : ''
						}`}
					>
						1
					</button>
					<button 
						onClick={() => navigate('/medical-blogs/page2')}
						className="px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
					>
						2
					</button>
					<button 
						onClick={() => setCurrentPage(3)}
						className="px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
					>
						3
					</button>
				</div>
			</div>
			</div>
		);
}
export default MedicalBlogs;
