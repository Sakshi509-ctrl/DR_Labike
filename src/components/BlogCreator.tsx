import React, { useState, useEffect } from 'react';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';
import { Save, X, Eye, EyeOff } from 'lucide-react';
import UserBlogStatus from './UserBlogStatus';

interface BlogFormData {
  title: string;
  content: string;
  readMoreContent: string;
  image: string;
}

const BlogCreator: React.FC = () => {
  const [blogForm, setBlogForm] = useState<BlogFormData>({ 
    title: '', 
    content: '', 
    readMoreContent: '', 
    image: '' 
  });
  const [editorInfo, setEditorInfo] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showReadMorePreview, setShowReadMorePreview] = useState(false);
  
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [blogId, setBlogId] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<string>('');
  const [showUserStatus, setShowUserStatus] = useState(false);
  const [isResubmission, setIsResubmission] = useState(false);
  const [originalBlogId, setOriginalBlogId] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const resubmitData = localStorage.getItem('resubmitBlogData');
    if (resubmitData) {
      try {
        const data = JSON.parse(resubmitData);
        if (data.isResubmission) {
          setIsResubmission(true);
          setOriginalBlogId(data.originalBlogId);
          setRejectionReason(data.rejectionReason);
          setBlogForm({
            title: data.title || '',
            content: data.content || '',
            readMoreContent: data.readMoreContent || '',
            image: data.image || ''
          });
          setEditorInfo({
            name: data.editorName || '',
            email: data.editorEmail || ''
          });
          
          localStorage.removeItem('resubmitBlogData');
        }
      } catch (error) {
        console.error('Error parsing resubmission data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      setIsUpdateMode(true);
      setBlogId(id);
      fetchBlogForUpdate(id);
    }
  }, []);

  const fetchBlogForUpdate = async (id: string) => {
    try {
      setIsLoading(true);
      const blog = await apiService.getBlogById(id);
      if (blog) {
        setBlogForm({
          title: blog.title || '',
          content: blog.content || '',
          readMoreContent: blog.readMoreContent || '',
          image: blog.image || ''
        });
        setEditorInfo({
          name: blog.editorName || '',
          email: blog.editorEmail || ''
        });
        setOriginalImage(blog.image || '');
      }
    } catch (err) {
      setError('Failed to fetch blog for editing');
      console.error('Error fetching blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      setError('Please fill in title and content');
      return;
    }
    
    if (!editorInfo.name.trim() || !editorInfo.email.trim()) {
      setError('Please provide editor information');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      let imageUrl = blogForm.image;
      
      
      if (selectedFile) {
        try {
          const uploadResult = await apiService.uploadBlogImage(selectedFile);
          imageUrl = uploadResult.image;
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          setError('Failed to upload image. Please try again.');
          setIsLoading(false);
          return;
        }
      } else if (isUpdateMode && !imageUrl) {
        imageUrl = originalImage;
      }
      
      const blogData = {
        title: blogForm.title.trim(),
        content: blogForm.content.trim(),
        readMoreContent: blogForm.readMoreContent.trim(),
        image: imageUrl || null,
        editorName: editorInfo.name.trim(),
        editorEmail: editorInfo.email.trim()
      };

      console.log('Sending blog data:', blogData);

      let result;
      if (isUpdateMode) {
        result = await apiService.updateBlog(blogId, blogData);
        console.log('Blog update result:', result);
      } else {
        result = await apiService.createBlog(blogData);
        console.log('Blog creation result:', result);
      }

      if (result && result.blog) {
        setBlogForm({ title: '', content: '', readMoreContent: '', image: '' });
        setEditorInfo({ name: '', email: '' });
        setSelectedFile(null);
        
        const action = isUpdateMode ? 'updated' : 'created';
        setSuccessMessage(`Blog ${action} successfully! Your blog has been sent for admin review. You'll be notified once it's approved or if any changes are needed.`);
        
        if (isUpdateMode) {
          setIsUpdateMode(false);
          setBlogId('');
          setOriginalImage('');
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: unknown) {
      console.error('Error in blog operation:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Failed to ${isUpdateMode ? 'update' : 'create'} blog`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsUpdateMode(false);
    setBlogId('');
    setOriginalImage('');
    setBlogForm({ title: '', content: '', readMoreContent: '', image: '' });
    setEditorInfo({ name: '', email: '' });
    setSelectedFile(null);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
          <button
            onClick={() => setSuccessMessage('')}
            className="ml-4 text-white hover:text-green-100"
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {error}
          <button
            onClick={() => setError('')}
            className="ml-4 text-white hover:text-red-100"
          >
            ×
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isResubmission ? 'Resubmit Blog' : isUpdateMode ? 'Edit Blog' : 'Create New Blog'}
            </h1>
            <p className="text-gray-600">
              {isResubmission 
                ? `Improving your previously rejected blog (ID: ${originalBlogId})` 
                : isUpdateMode 
                  ? 'Update your existing blog post' 
                  : 'Share your knowledge with the community'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUserStatus(!showUserStatus)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showUserStatus ? 'Hide Status' : 'View My Blogs'}
            </button>
            {isUpdateMode && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {isResubmission && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Blog Resubmission - Improving Your Content
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p className="mb-2">
                    <strong>Previous Rejection Reason:</strong>
                  </p>
                  <div className="bg-white border border-blue-200 rounded p-3 mb-3">
                    <p className="text-blue-800">{rejectionReason}</p>
                  </div>
                  <p className="text-blue-600">
                    Please review the feedback above and make necessary improvements to your blog before resubmitting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showUserStatus && (
          <div className="mb-8">
            <UserBlogStatus userEmail={editorInfo.email} />
          </div>
        )}

        {!showUserStatus && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  placeholder="Enter blog title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Content (Before Read More) *
                </label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  placeholder="Write the main content that will be visible before the read more button..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">This content will be visible to all readers initially</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read More Content
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Content that appears after clicking "Read More"</span>
                    <button
                      type="button"
                      onClick={() => setShowReadMorePreview(!showReadMorePreview)}
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      {showReadMorePreview ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide Preview
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Show Preview
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    value={blogForm.readMoreContent}
                    onChange={(e) => setBlogForm({...blogForm, readMoreContent: e.target.value})}
                    placeholder="Write additional content that will be revealed when readers click 'Read More'..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                  />
                  <p className="text-xs text-gray-500">This content will be hidden behind a "Read More" button</p>
                  
                  {showReadMorePreview && blogForm.readMoreContent && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Read More Content Preview:</h4>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">{blogForm.readMoreContent}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image
                </label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setBlogForm({ ...blogForm, image: imageUrl });
                          setSelectedFile(file);
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Select an image file (JPG, PNG, GIF, etc.)</p>
                  </div>
                  
                  {blogForm.image && (
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                      <img 
                        src={blogForm.image} 
                        alt="Preview" 
                        className="max-w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBlogForm({ ...blogForm, image: '' });
                          setSelectedFile(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Editor Name *
                  </label>
                  <input
                    type="text"
                    value={editorInfo.name}
                    onChange={(e) => setEditorInfo({...editorInfo, name: e.target.value})}
                    placeholder="Enter editor name..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Editor Email *
                  </label>
                  <input
                    type="email"
                    value={editorInfo.email}
                    onChange={(e) => setEditorInfo({...editorInfo, email: e.target.value})}
                    placeholder="Enter editor email..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                {isUpdateMode && (
                  <button
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isUpdateMode ? 'Update Blog' : 'Create Blog'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCreator;
