import React, { useState, useEffect } from 'react';
import { RefreshCw, LogOut, Users, Mail, Phone, MessageSquare, Calendar, Hash, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';
import ViewPageModal from './ViewPageModal';
import { useNavigate } from 'react-router-dom';

interface ContactFormData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  __v: number;
  viewpage: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ContactFormData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ContactFormData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showSubmissions, setShowSubmissions] = useState<boolean>(false);
  const [showProject, setShowProject] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const contactForms = await apiService.getContactForms();
      setData(contactForms);
      setError('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await apiService.deleteContactForm(id);
        fetchData();
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete submission';
        setError(errorMessage);
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleViewPage = (item: ContactFormData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <div className={`bg-blue-400 shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-16'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>}     
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No submissions yet</p>
            </div>
          ) : (
            <div className="p-2">
              <div
                onClick={() => setShowSubmissions(!showSubmissions)}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  showSubmissions
                    ? 'bg-white border-l-4 border-indigo-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {isSidebarOpen ? (
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Submissions</span>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
                             <div
                 onClick={() => {
                   setShowSubmissions(false);
                   setShowProject(!showProject);
                 }}
                 className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                   showProject
                     ? 'bg-white border-l-4 border-indigo-500'
                     : 'hover:bg-gray-50'
                 }`}
               >
                 {isSidebarOpen ? (
                   <div className="flex items-center">
                     <MessageSquare className="h-5 w-5 text-gray-600 mr-3" />
                     <span className="font-medium text-gray-900">Project</span>
                   </div>
                 ) : (
                   <div className="flex justify-center">
                     <MessageSquare className="h-5 w-5 text-gray-600" />
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Contact Form Admin
                  </h1>
                  <p className="text-sm text-gray-500">Manage contact submissions</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {!showSubmissions && !showProject ? (
            <div className="bg-white shadow-sm rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200 text-center mt-24">
                <h1 className="text-3xl font-bold text-gray-900">WELCOME TO DASHBOARD</h1>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">
                    Click on "Submissions" or "Project" in the sidebar to view content.
                  </p>
                </div>
              </div>
            </div>
              ) : showProject ? (
             <div className="bg-white shadow-sm rounded-xl border border-gray-200">
               <div className="px-6 py-5 border-b border-gray-200">
                 <h2 className="text-xl font-semibold text-gray-900">Medical Blog Content Editor</h2>
               </div>
               <div className="p-6">
                 <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Blog Title
                     </label>
                     <input
                       type="text"
                       placeholder="Enter your blog title here..."
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Blog Change title
                     </label>
                     <input
                       type="text"
                       placeholder="Enter your blog title here..."
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                     />
                    </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Blog Content
                     </label>
                     <textarea
                       placeholder="Write your medical blog content here..."
                       rows={8}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                     />
                   </div>

                  

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Blog Image
                     </label>
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                       <div className="space-y-2">
                         <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                           <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                           </svg>
                         </div>
                         <div>
                           <p className="text-sm text-gray-600">
                             <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                               Click to upload
                             </span>{" "}
                             or drag and drop
                           </p>
                           <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div className="flex space-x-3 pt-4">
                     <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                       Save Changes
                     </button>
                     <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                       Preview
                     </button>
                     <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                       Reset
                     </button>
                   </div>
                 </div>
               </div>
             </div>
          ) : (
            <div className="bg-white shadow-sm rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Contact Form Submissions
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage and review all contact form entries
                    </p>
                  </div>
                  <button
                    onClick={fetchData}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </button>
                </div>
              </div>

              <div className="px-6 py-4">
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-600">Loading submissions...</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Hash className="h-4 w-4 mr-2" />
                              ID
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Name
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              Phone
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Timestamp
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center">
                                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                  <MessageSquare className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                                <p className="text-gray-500 text-sm">
                                  Contact form submissions will appear here once your API is connected.
                                </p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          data.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                {item._id.substring(0, 8)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <a href={`mailto:${item.email}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                  {item.email}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <a href={`tel:${item.phone}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                  {item.phone}
                                </a>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                <div className="truncate" title={item.message}>
                                  {item.message}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatTimestamp(item.timestamp)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                                    title="Delete submission"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleViewPage(item)}
                                    className="text-indigo-600 hover:text-indigo-800 transition-colors p-1 rounded"
                                    title="View page"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ViewPageModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedItem}
      />
    </div>
  );
};

export default Dashboard;
