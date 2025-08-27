import React, { useState } from 'react';
import { LogOut, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();

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
          <div className="p-2">
            <div
              onClick={() => navigate('/adminpanel')}
              className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 hover:bg-gray-50`}
            >
              {isSidebarOpen ? (
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Admin Panel</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Eye className="h-5 w-5 text-gray-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-sm text-gray-500">Welcome to the admin dashboard</p>
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
          <div className="bg-white shadow-sm rounded-xl border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 text-center mt-24">
              <h1 className="text-3xl font-bold text-gray-900">WELCOME TO DASHBOARD</h1>
            </div>
            <div className="p-6">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;