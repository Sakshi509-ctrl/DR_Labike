import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Eye } from 'lucide-react';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';

interface BlogData {
  _id: string;
  title: string;
  content: string;
  readMoreContent: string;
  image: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: {
    name: string;
    email: string;
  };
  adminFeedback?: string;
  approvedBy?: {
    date: string;
  };
  rejectedBy?: {
    date: string;
    reason: string;
  };
}

interface UserBlogStatusProps {
  userEmail: string;
}

const UserBlogStatus: React.FC<UserBlogStatusProps> = ({ userEmail }) => {
  const [userBlogs, setUserBlogs] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userEmail) {
      fetchUserBlogs();
    }
  }, [userEmail]);

  const fetchUserBlogs = async () => {
    try {
      setIsLoading(true);
      const blogs = await apiService.getUserBlogs(userEmail);
      setUserBlogs(blogs);
      setError('');
    } catch (err) {
      setError('Failed to fetch your blogs');
      console.error('Error fetching user blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (blog: BlogData) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleResubmit = (blog: BlogData) => {
    const blogData = {
      title: blog.title,
      content: blog.content,
      readMoreContent: blog.readMoreContent,
      image: blog.image,
      isResubmission: true,
      originalBlogId: blog._id,
      rejectionReason: blog.adminFeedback
    };
    
    localStorage.setItem('resubmitBlogData', JSON.stringify(blogData));
    
    window.location.href = '/blog-creator';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Review';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Blog Submissions</h1>
          <p className="text-gray-600">Track the status of your submitted blogs</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => setError('')}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {userBlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Submitted</h2>
            <p className="text-gray-500">You haven't submitted any blogs yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {userBlogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(blog.status)}`}>
                        {getStatusIcon(blog.status)}
                        <span className="ml-1">{getStatusText(blog.status)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(blog)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Content Preview:</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}
                  </p>
                </div>

                {blog.status === 'rejected' && blog.adminFeedback && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-red-800 mb-2 flex items-center">
                          <X className="h-4 w-4 mr-2" />
                          Blog Rejected - Action Required
                        </h4>
                        <p className="text-red-700 text-sm mb-3">
                          <strong>Rejection Reason:</strong> {blog.adminFeedback}
                        </p>
                        <div className="bg-white border border-red-200 rounded p-3">
                          <p className="text-sm text-red-600 font-medium mb-2">What to do next:</p>
                          <ul className="text-sm text-red-600 space-y-1">
                            <li>• Review the feedback above</li>
                            <li>• Make necessary improvements to your blog</li>
                            <li>• Resubmit the updated version</li>
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => handleResubmit(blog)}
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Resubmit Blog
                      </button>
                    </div>
                  </div>
                )}

                {blog.status === 'approved' && blog.adminFeedback && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Admin Feedback:</h4>
                    <p className="text-green-700 text-sm">{blog.adminFeedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{selectedBlog.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Status Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedBlog.status)}`}>
                      {getStatusIcon(selectedBlog.status)}
                      <span className="ml-1">{getStatusText(selectedBlog.status)}</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Submitted:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(selectedBlog.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedBlog.approvedBy && (
                    <div>
                      <span className="font-medium text-gray-700">Approved by:</span>
                      <span className="ml-2 text-gray-600">
                        {selectedBlog.approvedBy.name} on {new Date(selectedBlog.approvedBy.date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedBlog.rejectedBy && (
                    <div>
                      <span className="font-medium text-gray-700">Rejected by:</span>
                      <span className="ml-2 text-gray-600">
                        {selectedBlog.rejectedBy.name} on {new Date(selectedBlog.rejectedBy.date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Main Content</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog.content}</p>
                </div>
              </div>

              {selectedBlog.readMoreContent && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Read More Content</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog.readMoreContent}</p>
                  </div>
                </div>
              )}

              {selectedBlog.image && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Blog Image</h3>
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title}
                    className="w-full max-w-md h-auto rounded-lg"
                  />
                </div>
              )}

              {selectedBlog.adminFeedback && (
                <div className={`rounded-lg p-4 ${
                  selectedBlog.status === 'approved' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className={`font-medium mb-3 ${
                    selectedBlog.status === 'approved' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedBlog.status === 'approved' ? 'Admin Feedback' : 'Rejection Reason'}
                  </h3>
                  <p className={`text-sm ${
                    selectedBlog.status === 'approved' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {selectedBlog.adminFeedback}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlogStatus;
