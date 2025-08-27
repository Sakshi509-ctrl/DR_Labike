import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, X, Edit, Plus, User } from 'lucide-react';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';

interface Blog {
  _id: string;
  title: string;
  content: string;
  readMoreContent?: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
  editorName?: string;
  editorEmail?: string;
  status?: 'pending' | 'approved' | 'rejected';
  adminFeedback?: string;
  rejectedBy?: string;
}

const UserPanel: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [deletingBlog, setDeletingBlog] = useState<string>('');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', readMoreContent: '', image: '', editorName: '', editorEmail: '' });

  const [userStats, setUserStats] = useState({ creates: 0, updates: 0 });
  const [readingBlog, setReadingBlog] = useState<Blog | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loginForm, setLoginForm] = useState({ name: '', email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  



  const loadUserData = async () => {
    if (!currentUser.email) {
      console.log('No user email available, skipping data load');
      return;
    }

    try {
      setLoading(true);
      console.log('Loading user data for:', currentUser.email);
      
      const [blogsRes, logsRes] = await Promise.all([
        apiService.getUserBlogs(currentUser.email),
        apiService.getChangeLogs()
      ]);
      
      const allBlogs = Array.isArray(blogsRes) ? blogsRes : blogsRes?.data || [];
      const allLogs = Array.isArray(logsRes) ? logsRes : logsRes?.data || [];
     
      console.log('Loaded blogs:', allBlogs);
      setBlogs(allBlogs); // Show all blogs in UserPanel for management 

      setUserStats({ creates: allBlogs.length, updates: allLogs.filter((log: { action: string }) => log.action === 'UPDATE').length });
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkExistingLogin = () => {
      const savedUser = localStorage.getItem('userPanelUser');
      const savedLoginState = localStorage.getItem('userPanelLoginState');
      
      if (savedUser && savedLoginState === 'true') {
        try {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
          setIsLoggedIn(true);
          setSessionStartTime(userData.sessionStart || Date.now());
          console.log('Session restored for user:', userData.name);
          return true; 
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('userPanelUser');
          localStorage.removeItem('userPanelLoginState');
        }
      }
      return false; 
    };

    const wasLoggedIn = checkExistingLogin();
    
    if (wasLoggedIn) {
      console.log('User was logged in, currentUser:', currentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser.email && isLoggedIn) {
      console.log('Current user changed, loading data for:', currentUser.email);
      loadUserData();
    }
  }, [currentUser.email, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const sessionTimeout = setTimeout(() => {
        console.log('Session expired due to timeout');
        handleLogout();
      }, 24 * 60 * 60 * 1000); 

      return () => clearTimeout(sessionTimeout);
    }
  }, [isLoggedIn]);

  const refreshUserData = async () => {
    if (!currentUser.email) {
      console.log('No user email available, skipping data refresh');
      return;
    }

    try {
      const [blogsRes, logsRes] = await Promise.all([
        apiService.getUserBlogs(currentUser.email),
        apiService.getChangeLogs()
      ]);
      
      const allBlogs = Array.isArray(blogsRes) ? blogsRes : blogsRes?.data || [];
      const allLogs = Array.isArray(logsRes) ? logsRes : logsRes?.data || [];
      
      setBlogs(allBlogs); 
      
      setUserStats({ creates: allBlogs.length, updates: allLogs.filter((log: { action: string }) => log.action === 'UPDATE').length });
    } catch (error) {
      setError('Failed to refresh data');
    }
  };

  const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete the blog "${blogTitle}"?`)) return;
    
    try {
      setDeletingBlog(blogId);
      await apiService.deleteBlog(blogId);
      await refreshUserData();
      setSuccessMessage(`Blog "${blogTitle}" deleted successfully!`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err: unknown) {
      console.error('Error deleting blog:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete blog');
      }
    } finally {
      setDeletingBlog('');
    }
  };

  const handleReadMore = (blog: Blog) => {
    setReadingBlog(blog);
  };

  const handleResubmitBlog = (blog: Blog) => {
    const blogData = {
      title: blog.title,
      content: blog.content,
      readMoreContent: blog.readMoreContent || '',
      image: blog.image || '',
      editorName: blog.editorName || currentUser.name,
      editorEmail: blog.editorEmail || currentUser.email,
      isResubmission: true,
      originalBlogId: blog._id,
      rejectionReason: blog.adminFeedback || ''
    };
    
    localStorage.setItem('resubmitBlogData', JSON.stringify(blogData));
    

    window.location.href = '/blog-creator';
  };



  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setEditForm({
      title: blog.title,
      content: blog.content,
      readMoreContent: blog.readMoreContent || '',
      image: blog.image || '',
      editorName: blog.editorName || currentUser.name,
      editorEmail: blog.editorEmail || currentUser.email
    });
  };

  const handleCreateBlog = () => {
    setEditingBlog({} as Blog);
    setEditForm({ 
      title: '', 
      content: '', 
      readMoreContent: '',
      image: '', 
      editorName: currentUser.name, 
      editorEmail: currentUser.email 
    });
  };

  const handleSaveEdit = async () => {
    if (!editingBlog) return;
    
         if (!editForm.title.trim() || !editForm.content.trim() || !editForm.editorName.trim() || !editForm.editorEmail.trim()) {
       setError('Title, content, editor name, and editor email are required');
       return;
     }
    
    try {
      setError('');
      let result;
      
      if (editingBlog._id) {
        result = await apiService.updateBlog(editingBlog._id, editForm);
        if (result) {
          setSuccessMessage('Blog updated successfully!');
          
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        }
      } else {
        result = await apiService.createBlog(editForm);
        if (result) {
          setSuccessMessage('Blog created successfully!');
          
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        }
      }
      
             if (result) {
         await refreshUserData();
         setEditingBlog(null);
         setEditForm({ 
           title: '', 
           content: '', 
           readMoreContent: '',
           image: '', 
           editorName: currentUser.name, 
           editorEmail: currentUser.email 
         });

       }
    } catch (error: unknown) {
      console.error('Error saving blog:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to save blog');
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      const imageUrl = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setEditForm({ 
      title: '', 
      content: '', 
      readMoreContent: '',
      image: '', 
      editorName: currentUser.name, 
      editorEmail: currentUser.email 
    });

  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.name.trim() || !loginForm.email.trim() || !loginForm.password.trim()) {
      setError('Please enter your name, email and password');
      return;
    }
    
    const HARDCODED_EMAIL = 'guptasakshi9838@gmail.com';
    const HARDCODED_PASSWORD = '1111';
    
    if (loginForm.email === HARDCODED_EMAIL && loginForm.password === HARDCODED_PASSWORD) {
      setLoginLoading(true);
      setError('');
      
      const userData = {
        name: loginForm.name.trim(),
        email: HARDCODED_EMAIL
      };
      
      const sessionData = {
        ...userData,
        sessionStart: Date.now()
      };
      localStorage.setItem('userPanelUser', JSON.stringify(sessionData));
      localStorage.setItem('userPanelLoginState', 'true');
      
      setCurrentUser(userData);
      setIsLoggedIn(true);
      setSessionStartTime(Date.now());
      setLoginForm({ name: '', email: '', password: '' });
      setError('');
      
      loadUserData();
      
      setLoginLoading(false);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem('userPanelUser');
    localStorage.removeItem('userPanelLoginState');
    
    // Reset all states
    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    setLoginForm({ name: '', email: '', password: '' });
    setBlogs([]);
    setUserStats({ creates: 0, updates: 0 });
    setError('');
    setSessionStartTime(null);
    setSuccessMessage('Logged out successfully');
    
    // Clear any ongoing operations
    setDeletingBlog('');
    setEditingBlog(null);
    setReadingBlog(null);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    
    console.log('User logged out, session cleared');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Check if email matches hardcoded email
    const HARDCODED_EMAIL = 'guptasakshi9838@gmail.com';
    
    if (forgotPasswordEmail.trim() !== HARDCODED_EMAIL) {
      setError('Email not found. Please use the correct email address.');
      return;
    }
    
    try {
      setOtpLoading(true);
      setError('');
      
      // Generate demo OTP for testing
      const demoOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the OTP in state so it can be displayed and used
      setOtpCode(demoOtp);
      setOtpSent(true);
      
      setSuccessMessage(`Demo OTP Generated! Use this code: ${demoOtp} (Copy this code to the OTP field below)`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 15000);
      
      console.log('Demo OTP for testing:', demoOtp);
      
    } catch (err) {
      console.error('Error in forgot password:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

    const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError('Please enter the OTP code');
      return;
    }
    
    try {
      setOtpLoading(true);
      setError('');
      
      // For demo purposes, accept any OTP (in real app, you'd verify the OTP)
      // Since this is hardcoded, we'll just show success message
      
      setSuccessMessage('OTP verified successfully! You can now set your new password.');
      setOtpVerified(true);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all password fields');
      return;
    }
    
    if (resetPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (resetPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setOtpLoading(true);
      setError('');
      
      // For demo purposes, simulate password reset
      // In a real app, you would update the password in the database
      
      setSuccessMessage('Password reset successfully! You can now login with your new password.');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      // Reset form and close modal
      setShowForgotPassword(false);
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode('');
      setResetPassword('');
      setConfirmPassword('');
      setForgotPasswordEmail('');
      
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode('');
    setResetPassword('');
    setConfirmPassword('');
    setForgotPasswordEmail('');
    
    setCurrentUser({ name: '', email: '' });
    setError('');
    
    
    localStorage.removeItem('userPanelUser');
    localStorage.removeItem('userPanelLoginState');
  };



  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const [blogsRes, logsRes] = await Promise.all([
          apiService.getBlogs(),
          apiService.getChangeLogs()
        ]);
        
        const allBlogs = Array.isArray(blogsRes) ? blogsRes : blogsRes?.data || [];
        const allLogs = Array.isArray(logsRes) ? logsRes : logsRes?.data || [];
        
        setBlogs(allBlogs.slice(0, 5)); 
        
        setUserStats({ creates: allBlogs.length, updates: allLogs.filter((log: any) => log.action === 'UPDATE').length });
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Panel</h1>
            <p className="text-gray-600">Access your blog management dashboard</p>
          </div>

                       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                             <div className="mb-6">
                 <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
                 <p className="text-gray-500 text-center mt-2">Sign in to continue</p>
                
               </div>

               <form onSubmit={handleLogin} className="space-y-6">

               <div>
                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                   Full Name
                 </label>
                 <div className="relative">
                   <input
                     id="name"
                     name="name"
                     type="text"
                     required
                     value={loginForm.name}
                     onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                     placeholder="Enter your full name"
                   />
                 </div>
               </div>

               <div>
                 <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                   Email Address
                 </label>
                 <div className="relative">
                   <input
                     id="email"
                     name="email"
                     type="email"
                     required
                     value={loginForm.email}
                     onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                     placeholder="Enter your email address"
                   />
                 </div>
               </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                
                                 <button
                   type="button"
                   onClick={() => setShowForgotPassword(true)}
                   className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
                 >
                   Forgot password?
                 </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

                             <button
                 type="submit"
                 disabled={loginLoading}
                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
               >
                 {loginLoading ? (
                   <div className="flex items-center justify-center">
                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                     Signing in...
                   </div>
                 ) : (
                   'Sign In'
                 )}
               </button>
              </form>

             {showForgotPassword && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full mx-4">
                   <div className="text-center mb-6">
                     <h3 className="text-2xl font-bold text-gray-900">Reset Password</h3>
                     <p className="text-gray-500 mt-2">
                       {!otpSent ? 'Enter your email to receive OTP' : 'Enter OTP and new password'}
                     </p>
                     <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                       <p className="text-xs text-yellow-700 text-center">
                         <strong>Demo Mode:</strong> OTP will be displayed on screen (not sent via email).
                       </p>
                     </div>
                   </div>

                   {!otpSent ? (
                     <form onSubmit={handleForgotPassword} className="space-y-6">
                       <div>
                         <label htmlFor="forgotEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                           Email Address
                         </label>
                         <input
                           id="forgotEmail"
                           type="email"
                           required
                           value={forgotPasswordEmail}
                           onChange={(e) => setForgotPasswordEmail(e.target.value)}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                           placeholder="Enter your email address"
                         />
                       </div>

                       <button
                         type="submit"
                         disabled={otpLoading}
                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                       >
                         {otpLoading ? (
                           <div className="flex items-center justify-center">
                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                             Sending OTP...
                           </div>
                         ) : (
                           'Send OTP'
                         )}
                       </button>
                     </form>
                   ) : (
                     <form onSubmit={!otpVerified ? handleVerifyOtp : handleResetPassword} className="space-y-6">
                       <div>
                         <label htmlFor="otpInput" className="block text-sm font-semibold text-gray-700 mb-2">
                           OTP Code
                         </label>
                          <input
                            id="otpInput"
                            type="text"
                            required
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-lg font-mono"
                            placeholder="Enter 6-digit OTP from email"
                            maxLength={6}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the 6-digit OTP sent to your email address
                          </p>
                        </div>

                       {otpVerified && (
                         <>
                           <div>
                             <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                               New Password
                             </label>
                             <input
                               id="newPassword"
                               type="password"
                               required
                               value={resetPassword}
                               onChange={(e) => setResetPassword(e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                               placeholder="Enter new password"
                             />
                           </div>

                           <div>
                             <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                               Confirm Password
                             </label>
                             <input
                               id="confirmPassword"
                               type="password"
                               required
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                               placeholder="Confirm new password"
                             />
                           </div>
                         </>
                       )}

                       <button
                         type="submit"
                         disabled={otpLoading}
                         className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                       >
                         {otpLoading ? (
                           <div className="flex items-center justify-center">
                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                             {!otpVerified ? 'Verifying...' : 'Resetting...'}
                           </div>
                         ) : (
                           !otpVerified ? 'Verify OTP' : 'Reset Password'
                         )}
                       </button>
                     </form>
                   )}

                   <div className="mt-6 text-center">
                     <button
                       type="button"
                       onClick={handleBackToLogin}
                       className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                     >
                       ← Back to Login
                     </button>
                   </div>
                 </div>
               </div>
             )}


            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setError('Contact administrator to create an account')}
                  className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                >
                  Contact Admin
                </button>
              </p>
            </div>
          </div>

         
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="flex">
        <div className="w-64 bg-blue-900 min-h-screen p-4">
                     <div className="mb-8 text-center">
             <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
               <User className="h-6 w-6 text-blue-900" />
             </div>
             <h1 className="text-white text-lg font-bold">User Panel</h1>
             <p className="text-blue-200 text-xs mt-1">Welcome, {currentUser.name}</p>
             <p className="text-blue-100 text-xs mt-1">{currentUser.email}</p>
             <div className="flex items-center justify-center mt-2">
               <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
               <span className="text-green-300 text-xs">Session Active</span>
             </div>
             {sessionStartTime && (
               <div className="text-center mt-2">
                 <p className="text-blue-100 text-xs">
                   Session started: {new Date(sessionStartTime).toLocaleTimeString()}
                 </p>
               </div>
             )}
           </div>

          <div className="bg-blue-800 rounded-lg p-4 mb-6">
            <h3 className="text-white text-sm font-medium mb-3">Your Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-200 text-xs">Blogs Created:</span>
                <span className="text-white font-bold">{userStats.creates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200 text-xs">Blogs Updated:</span>
                <span className="text-white font-bold">{userStats.updates}</span>
              </div>
              <div className="flex justify-between border-t border-blue-700 pt-2">
                <span className="text-blue-200 text-xs">Total Activity:</span>
                <span className="text-white font-bold">{userStats.creates + userStats.updates}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleCreateBlog}
              className="w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 bg-green-600 text-white hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Blog</span>
            </button>
            
                                     <button
              onClick={refreshUserData}
              className="w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 text-blue-200 hover:bg-blue-800 hover:text-white"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh Data</span>
            </button>
            

             
                        
            
            <button
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 text-red-200 hover:bg-red-800 hover:text-white"
            >
              <User className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Blog Management</h1>
                <p className="text-gray-600 mt-1">Create, edit, and manage your blogs</p>
              </div>
              <button
                onClick={handleCreateBlog}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Blog
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">My Blogs</h2>
              </div>
              
              {blogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't created any blogs yet.</p>
                  <button
                    onClick={handleCreateBlog}
                    className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Blog
                  </button>
                </div>
              ) : (
                <div>
                  {blogs.length === 0 && !loading ? (
                    <div className="text-center py-12">
                      <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium text-gray-900 mb-2">No blogs yet</p>
                      <p className="text-sm text-gray-500 mb-4">Create your first blog to get started!</p>
                      <button
                        onClick={handleCreateBlog}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Blog
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Preview</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {blogs.map((blog, index) => (
                            <tr key={blog._id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {blog.status === 'pending' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Pending
                                  </span>
                                )}
                                {blog.status === 'approved' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Approved
                                  </span>
                                )}
                                {blog.status === 'rejected' && (
                                  <div className="relative group">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 cursor-help">
                                      Rejected
                                    </span>
                                    {blog.adminFeedback && (
                                      <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                        <div className="text-xs font-medium text-red-800 mb-1">Rejection Reason:</div>
                                        <div className="text-xs text-red-700">{blog.adminFeedback}</div>
                                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-200"></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {!blog.status && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Unknown
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{blog.content}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(blog.createdAt)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {blog.updatedAt && blog.updatedAt !== blog.createdAt ? formatTimestamp(blog.updatedAt) : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <div className="flex space-x-2">
                                   <button
                                     onClick={() => handleReadMore(blog)}
                                     className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded"
                                     title="Read more"
                                   >
                                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                                     </svg>
                                   </button>
                                   {blog.status === 'rejected' && (
                                     <button
                                       onClick={() => handleResubmitBlog(blog)}
                                       className="text-orange-600 hover:text-orange-900 transition-colors p-2 rounded"
                                       title="Resubmit blog"
                                     >
                                       <RefreshCw className="h-4 w-4" />
                                     </button>
                                   )}
                                   <button
                                     onClick={() => handleEditBlog(blog)}
                                     className="text-indigo-600 hover:text-indigo-900 transition-colors p-2 rounded"
                                     title="Edit blog"
                                   >
                                     <Edit className="h-4 w-4" />
                                   </button>
                                   <button
                                     onClick={() => handleDeleteBlog(blog._id, blog.title)}
                                     disabled={deletingBlog === blog._id}
                                     className="text-red-600 hover:text-red-900 transition-colors p-2 rounded disabled:opacity-50"
                                     title="Delete blog"
                                   >
                                     {deletingBlog === blog._id ? (
                                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                     ) : (
                                       <Trash2 className="h-4 w-4" />
                                     )}
                                   </button>
                                 </div>
                               </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

             {editingBlog && (
         <div 
           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
           onClick={handleCancelEdit}
         >
           <div 
             className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
             onClick={(e) => e.stopPropagation()}
           >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBlog._id ? 'Edit Blog' : 'Create New Blog'}
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
                             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                 <h4 className="text-sm font-medium text-blue-900 mb-2"> Editor Information</h4>
                 <p className="text-xs text-blue-700">
                   Editor information is automatically filled with your login details. This helps track who creates or edits blogs for admin monitoring.
                 </p>
               </div>
              <div>
                <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="editTitle"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="editContent" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  id="editContent"
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={6}
                />
              </div>
              
              <div>
                <label htmlFor="editReadMoreContent" className="block text-sm font-medium text-gray-700">Read More Content</label>
                <textarea
                  id="editReadMoreContent"
                  value={editForm.readMoreContent}
                  onChange={(e) => setEditForm({ ...editForm, readMoreContent: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={6}
                />
              </div>
                                   <div>
                  <label htmlFor="editEditorName" className="block text-sm font-medium text-gray-700">
                    Editor Name * <span className="text-xs text-gray-500">(Auto-filled from login)</span>
                  </label>
                  <div className="mt-1 space-y-2">
                    <input
                      type="text"
                      id="editEditorName"
                      value={editForm.editorName}
                      onChange={(e) => setEditForm({ ...editForm, editorName: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                      placeholder="Enter editor name"
                      required
                      readOnly
                    />
                    <p className="text-xs text-gray-500">This field is automatically filled with your name for tracking purposes</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="editEditorEmail" className="block text-sm font-medium text-gray-700">
                    Editor Email * <span className="text-xs text-gray-500">(Auto-filled from login)</span>
                  </label>
                  <div className="mt-1 space-y-2">
                    <input
                      type="email"
                      id="editEditorEmail"
                      value={editForm.editorEmail}
                      onChange={(e) => setEditForm({ ...editForm, editorEmail: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                      placeholder="Enter editor email"
                      required
                      readOnly
                    />
                    <p className="text-xs text-gray-500">This field is automatically filled with your email for tracking purposes</p>
                  </div>
                </div>
               <div>
                 <label htmlFor="editImage" className="block text-sm font-medium text-gray-700">Image</label>
                 <div className="mt-1 space-y-2">
                   <input
                     type="file"
                     id="editImage"
                     accept="image/*"
                     onChange={handleFileChange}
                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                   />
                   {editForm.image && (
                     <div className="mt-2">
                       <img 
                         src={editForm.image} 
                         alt="Preview" 
                         className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                       />
                     </div>
                   )}
                 </div>
               </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingBlog._id ? 'Save Changes' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {readingBlog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setReadingBlog(null)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{readingBlog.title}</h2>
                <p className="text-sm text-gray-500 mt-1">View Mode - Click Edit to modify</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingBlog(readingBlog);
                    setEditForm({
                      title: readingBlog.title,
                      content: readingBlog.content,
                      readMoreContent: readingBlog.readMoreContent || '',
                      image: readingBlog.image || '',
                      editorName: readingBlog.editorName || currentUser.name,
                      editorEmail: readingBlog.editorEmail || currentUser.email
                    });
                    setReadingBlog(null);
                    setSuccessMessage('Switched to edit mode. You can now modify your blog.');
                    setTimeout(() => {
                      setSuccessMessage('');
                    }, 5000);
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Blog</span>
                </button>
                <button
                  onClick={() => setReadingBlog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {readingBlog.image && (
              <div className="mb-6">
                <img 
                  src={readingBlog.image} 
                  alt={readingBlog.title}
                  className="w-full max-h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
            
            <div className="prose max-w-none">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Summary</h3>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                  {readingBlog.content}
                </div>
              </div>
              
              {readingBlog.readMoreContent && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Full Article</h3>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                    {readingBlog.readMoreContent}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created by:</span> {readingBlog.editorName || 'Unknown'}
                </div>
                <div>
                  <span className="font-medium">Created on:</span> {formatTimestamp(readingBlog.createdAt)}
                </div>
                {readingBlog.updatedAt && readingBlog.updatedAt !== readingBlog.createdAt && (
                  <>
                    <div>
                      <span className="font-medium">Last updated by:</span> {readingBlog.editorName || 'Unknown'}
                    </div>
                    <div>
                      <span className="font-medium">Last updated:</span> {formatTimestamp(readingBlog.updatedAt)}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditingBlog(readingBlog);
                  setEditForm({
                    title: readingBlog.title,
                    content: readingBlog.content,
                    readMoreContent: readingBlog.readMoreContent || '',
                    image: readingBlog.image || '',
                    editorName: readingBlog.editorName || currentUser.name,
                    editorEmail: readingBlog.editorEmail || currentUser.email
                  });
                  setReadingBlog(null);
                  setSuccessMessage('Switched to edit mode. You can now modify your blog.');
                  setTimeout(() => {
                    setSuccessMessage('');
                  }, 5000);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Blog</span>
              </button>
              <button
                onClick={() => setReadingBlog(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
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

export default UserPanel; 