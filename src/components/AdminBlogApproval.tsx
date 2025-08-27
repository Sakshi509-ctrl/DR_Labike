import React, { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
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
  createdBy?: {
    name: string;
    email: string;
  };
  adminFeedback?: string;
}

const AdminBlogApproval: React.FC = () => {
  const [pendingBlogs, setPendingBlogs] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({
    feedback: '',
    rejectionReason: ''
  });
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const fetchPendingBlogs = async () => {
    try {
      setIsLoading(true);
      const blogs = await apiService.getPendingBlogs();
      
      const validBlogs = Array.isArray(blogs) ? blogs.filter(blog => 
        blog && 
        blog._id && 
        blog.title && 
        blog.content &&
        typeof blog === 'object'
      ) : [];
      
      setPendingBlogs(validBlogs);
      setError('');
    } catch (err) {
      setError('Failed to fetch pending blogs');
      console.error('Error fetching pending blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (blog: BlogData) => {
    try {
      console.log('Approving blog:', blog._id, 'Title:', blog.title);
      
      if (!blog._id || !blog.title) {
        setError('Invalid blog data');
        console.error('Invalid blog object:', blog);
        return;
      }
      
      await apiService.approveBlog(blog._id, {
        adminName: 'sakshi',
        adminEmail: 'guptasakshi9838@gmail.com',
        feedback: adminData.feedback
      });

      setSuccessMessage(`Blog "${blog.title}" approved successfully!`);
      setShowModal(false);
      setSelectedBlog(null);
      setAdminData({ feedback: '', rejectionReason: '' });
      fetchPendingBlogs(); 
    } catch (err) {
      setError('Failed to approve blog');
      console.error('Error approving blog:', err);
    }
  };

  const handleReject = async (blog: BlogData) => {
    if (!adminData.rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      await apiService.rejectBlog(blog._id, {
        adminName: 'sakshi',
        adminEmail: 'guptasakshi9838@gmail.com',
        reason: adminData.rejectionReason
      });

      setSuccessMessage(`Blog "${blog.title}" rejected successfully!`);
      setShowModal(false);
      setSelectedBlog(null);
      setAdminData({ feedback: '', rejectionReason: '' });
      fetchPendingBlogs();
    } catch (err) {
      setError('Failed to reject blog');
      console.error('Error rejecting blog:', err);
    }
  };

  const openModal = (blog: BlogData, action: 'approve' | 'reject') => {
    setSelectedBlog(blog);
    setActionType(action);
    setShowModal(true);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    setActionType(null);
    setAdminData({ feedback: '', rejectionReason: '' });
    setError('');
  };

  const [successMessage, setSuccessMessage] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pending blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Approval System</h1>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
            <button
              onClick={() => setSuccessMessage('')}
              className="ml-4 text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

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

        {pendingBlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Pending Blogs</h2>
            <p className="text-gray-500">All blogs have been reviewed or there are no new submissions.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingBlogs
              .filter(blog => blog && blog._id && blog.title)
              .map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                     <p className="text-sm text-gray-500">
                       Submitted by {blog.createdBy?.name || 'Unknown User'} ({blog.createdBy?.email || 'No email'}) on{' '}
                       {new Date(blog.createdAt).toLocaleDateString()}
                     </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(blog)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-2" />
                       Approve
                    </button>
                    
                    <button
                      onClick={() => openModal(blog, 'reject')}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Main Content:</h4>
                  <p className="text-gray-600 text-sm">{blog.content}</p>
                </div>

                {blog.readMoreContent && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Read More Content:</h4>
                    <p className="text-gray-600 text-sm">{blog.readMoreContent}</p>
                  </div>
                )}

                {blog.image && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Image:</h4>
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === 'approve' ? 'Approve Blog' : 'Reject Blog'}
            </h2>
            
            <div className="space-y-4">
              {actionType === 'approve' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback (Optional)
                  </label>
                  <textarea
                    value={adminData.feedback}
                    onChange={(e) => setAdminData({ ...adminData, feedback: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Any feedback for the author..."
                  />
                </div>
              ) : (
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Rejection Reason *
                   </label>
                   <textarea
                     value={adminData.rejectionReason}
                     onChange={(e) => setAdminData({ ...adminData, rejectionReason: e.target.value })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     rows={4}
                     placeholder="Please provide a reason for rejection..."
                     required
                   />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => actionType === 'approve' ? handleApprove(selectedBlog) : handleReject(selectedBlog)}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  actionType === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogApproval;
