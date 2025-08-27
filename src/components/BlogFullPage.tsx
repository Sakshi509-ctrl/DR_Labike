import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { ArrowLeft } from 'lucide-react';
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
  editorName?: string;
  editorEmail?: string;
}

const BlogFullPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blogId) {   
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      console.log('Fetching blog with ID:', blogId);
      setIsLoading(true);
      const blogData = await apiService.getBlogById(blogId!);
      setBlog(blogData);
      setError('');
    } catch (err) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Blog not found'}</p>
            <button
              onClick={goBack}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-8">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blogs
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            
            {blog.readMoreContent ? (
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                  {blog.readMoreContent}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">No additional content available for this blog.</p>
                <p className="text-sm mt-2">The read more content field is empty.</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={goBack}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 inline" />
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFullPage;
