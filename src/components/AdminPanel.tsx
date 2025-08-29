import React, { useState, useEffect } from 'react';
import { Trash2, Eye, RefreshCw, X, Edit, Calendar, FileText } from 'lucide-react';
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from '../services/apiService';

interface ChangeLog {
  _id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  editorName: string;
  editorEmail: string;
  editorDetails?: {
    name: string;
    email: string;
    timestamp: string;
  };
  timestamp: string;
  blogId?: { _id: string; title?: string };
  changes?: { title?: string; content?: string; image?: string };
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

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

interface Booking {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  appointmentDate: string;
  bookingTime: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  adminNotes?: string;
}

type ActiveSection = 'summary' | 'overview' | 'Submissions' | 'blogs' | 'bookings';

const AdminPanel: React.FC = () => {
  const [logs, setLogs] = useState<ChangeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [deleting, setDeleting] = useState<string>(''); 
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState<{ email: string; name: string; creates: number; updates: number; allEmails?: string[] } | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [deletingBlog, setDeletingBlog] = useState<string>('');
  
  const [contactSubmissions, setContactSubmissions] = useState<ContactFormData[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactFormData | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', image: '' });
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [bookingToReject, setBookingToReject] = useState<Booking | null>(null);
  
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [logsRes, blogsRes, submissionsRes] = await Promise.all([
          apiService.getChangeLogs(),
          apiService.getBlogs(),
          apiService.getContactForms()
        ]);
        setLogs(Array.isArray(logsRes) ? logsRes : logsRes?.data || []);
        setBlogs(Array.isArray(blogsRes) ? blogsRes : blogsRes?.data || []);
        setContactSubmissions(Array.isArray(submissionsRes) ? submissionsRes : submissionsRes?.data || []);
        
        const storedBookings = localStorage.getItem('adminBookings');
        console.log(' Loading bookings from localStorage...');
        console.log('Raw storedBookings:', storedBookings);
        
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings);
          console.log('Parsed bookings:', parsedBookings);
          const bookingsWithDates = parsedBookings.map((booking: any) => ({
            ...booking,
            submittedAt: new Date(booking.submittedAt)
          }));
          console.log('Bookings with dates:', bookingsWithDates);
          setBookings(bookingsWithDates);
        } else {
          console.log('No bookings found in localStorage');
        }
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(checkForNewBookings, 5000);
    return () => clearInterval(interval);
  }, [bookings.length]);

  const refreshAll = async () => {
    const [logsRes, blogsRes, submissionsRes] = await Promise.all([
      apiService.getChangeLogs(),
      apiService.getBlogs(),
      apiService.getContactForms()
    ]);
    setLogs(Array.isArray(logsRes) ? logsRes : logsRes?.data || []);
    setBlogs(Array.isArray(blogsRes) ? blogsRes : blogsRes?.data || []);
    setContactSubmissions(Array.isArray(submissionsRes) ? submissionsRes : submissionsRes?.data || []);
  };

  const refreshBookings = () => {
    console.log('🔄 Refreshing bookings...');
    const storedBookings = localStorage.getItem('adminBookings');
    console.log('Stored bookings:', storedBookings);
    
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings);
      console.log('Parsed bookings on refresh:', parsedBookings);
      const bookingsWithDates = parsedBookings.map((booking: any) => ({
        ...booking,
        submittedAt: new Date(booking.submittedAt)
      }));
      console.log('Bookings with dates on refresh:', bookingsWithDates);
      setBookings(bookingsWithDates);
    } else {
      console.log('No bookings found on refresh');
      setBookings([]);
    }
    setSuccessMessage('Bookings refreshed successfully!');
  };

  const checkForNewBookings = () => {
    const storedBookings = localStorage.getItem('adminBookings');
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings);
      const bookingsWithDates = parsedBookings.map((booking: any) => ({
        ...booking,
        submittedAt: new Date(booking.submittedAt)
      }));
      
      if (bookingsWithDates.length > bookings.length) {
        setBookings(bookingsWithDates);
        setSuccessMessage('New booking received!');
      }
    }
  };

  const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete the blog "${blogTitle}"?`)) return;
    
    try {
      setDeletingBlog(blogId);
      await apiService.deleteBlog(blogId);
      await refreshAll();
      setSuccessMessage(`Blog "${blogTitle}" deleted successfully!`);
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

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setEditForm({
      title: blog.title,
      content: blog.content,
      image: blog.image || ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editingBlog) return;
    
    if (!editForm.title.trim() || !editForm.content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    try {
      setError('');
      let result;
      
      if (editingBlog._id) {
        result = await apiService.updateBlog(editingBlog._id, editForm);
        if (result) {
          setSuccessMessage('Blog updated successfully!');
        }
      } else {
        result = await apiService.createBlog(editForm);
        if (result) {
          setSuccessMessage('Blog created successfully!');
        }
      }
      
      if (result) {
        await refreshAll();
        setEditingBlog(null);
        setEditForm({ title: '', content: '', image: '' });
      }
    } catch (err: unknown) {
      console.error('Error saving blog:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to save blog');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setEditForm({ title: '', content: '', image: '' });
  };

  const handleDeleteEditor = async (email: string) => {
    if (!window.confirm(`Are you sure you want to delete all blogs by ${email}?`)) return;
    
    try {
      setDeleting(email);
      console.log('Deleting editor summary for:', email);
      await apiService.delete(`/editorSummary/${email}`);
      console.log('Editor summary deleted successfully');
      await refreshAll();
      setSuccessMessage(`Editor ${email} and all associated blogs deleted successfully!`);
    } catch (err: unknown) {
      console.error('Delete editor error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete editor summary');
      }
    } finally {
      setDeleting('');
    }
  };

  const handleViewEditor = (log: ChangeLog) => {
    const editorEmail = log.editorEmail;
    const editorName = log.editorName;
    
    const consolidatedUser = consolidatedUsers.find(user => 
      user.name.toLowerCase() === editorName.toLowerCase()
    );
    
    if (consolidatedUser) {
      setSelectedEditor({
        email: consolidatedUser.email,
        name: consolidatedUser.name,
        creates: consolidatedUser.creates,
        updates: consolidatedUser.updates,
        allEmails: consolidatedUser.allEmails
      });
    } else {
      const creates = logs.filter(l => l.editorEmail === editorEmail && l.action === 'CREATE').length;
      const updates = logs.filter(l => l.editorEmail === editorEmail && l.action === 'UPDATE').length;
      
      setSelectedEditor({ 
        email: editorEmail, 
        name: editorName, 
        creates, 
        updates 
      });
    }
    
    setViewModalOpen(true);
  };

  const getBlogCreator = (blogId: string) => {
    const createLog = logs.find(log => 
      log.blogId?._id === blogId && log.action === 'CREATE'
    );
    
    if (createLog) {
      return {
        name: createLog.editorName,
        email: createLog.editorEmail
      };
    }
    
    return null;
  };

  const getBlogsByEditor = (editorEmail: string, editorName: string) => {
    const consolidatedUser = consolidatedUsers.find(user => 
      user.name.toLowerCase() === editorName.toLowerCase() ||
      user.allEmails.includes(editorEmail)
    );
    
    if (consolidatedUser && consolidatedUser.ownedBlogs.length > 0) {
      return blogs.filter(blog => consolidatedUser.ownedBlogs.includes(blog._id));
    }
    
    const associatedBlogIds = logs
      .filter(log => {
        const isSameUser = log.editorEmail === editorEmail || 
        log.editorName.toLowerCase() === editorName.toLowerCase();
        
        return isSameUser && 
               (log.action === 'CREATE' || log.action === 'UPDATE') &&
               log.blogId?._id;
      })
      .map(log => log.blogId!._id);
    
    const uniqueBlogIds = [...new Set(associatedBlogIds)];
    
    return blogs.filter(blog => uniqueBlogIds.includes(blog._id));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getConsolidatedUsers = () => {
    const userMap = new Map<string, { 
      email: string; 
      name: string; 
      creates: number; 
      updates: number; 
      lastAction: string; 
      allEmails: string[];
      ownedBlogs: string[]; 
    }>();
    
    logs.forEach(log => {
      const name = log.editorName.toLowerCase();
      const email = log.editorEmail;
      const blogId = log.blogId?._id;
      
      if (!userMap.has(name)) {
        userMap.set(name, {
          email: email,
          name: log.editorName,
          creates: 0,
          updates: 0,
          lastAction: log.timestamp,
          allEmails: [email],
          ownedBlogs: []
        });
      }
      
      const user = userMap.get(name)!;
      
      if (!user.allEmails.includes(email)) {
        user.allEmails.push(email);
      }
      
      if (blogId && !user.ownedBlogs.includes(blogId)) {
        user.ownedBlogs.push(blogId);
      }
      
      if (log.action === 'CREATE') user.creates++;
      if (log.action === 'UPDATE') user.updates++;
      
      if (new Date(log.timestamp) > new Date(user.lastAction)) {
        user.lastAction = log.timestamp;
      }
    });
    
    return Array.from(userMap.values()).sort((a, b) => new Date(b.lastAction).getTime() - new Date(a.lastAction).getTime());
  };

  const consolidatedUsers = getConsolidatedUsers();

  const fetchContactSubmissions = async () => {
    try {
      setSubmissionsLoading(true);
      const submissions = await apiService.getContactForms();
      setContactSubmissions(Array.isArray(submissions) ? submissions : submissions?.data || []);
      setError('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submissions';
      setError(errorMessage);
      console.error('Error fetching submissions:', err);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      await apiService.deleteContactForm(id);
      setSuccessMessage('Submission deleted successfully!');
      fetchContactSubmissions();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete submission';
      setError(errorMessage);
    }
  };

  const handleViewSubmission = (submission: ContactFormData) => {
    setSelectedSubmission(submission);
    setIsSubmissionModalOpen(true);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const bookingToApprove = bookings.find(b => b.id === bookingId);
      if (!bookingToApprove) {
        setError('Booking not found');
        return;
      }

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'approved' as const }
            : booking
        )
      );

      const storedBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
      const updatedBookings = storedBookings.map((booking: any) => 
        booking.id === bookingId 
          ? { ...booking, status: 'approved' }
          : booking
      );
      localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));

      const emailjs = (await import('@emailjs/browser')).default;
      
      const approvalParams = {
        to_name: bookingToApprove.name,
        to_email: bookingToApprove.email,
        email_to: bookingToApprove.email,  
        name: bookingToApprove.name,       
        email: bookingToApprove.email,    
        phoneNumber: bookingToApprove.phoneNumber, 
        description: bookingToApprove.description, 
        booking_id: bookingId,
        appointment_date: bookingToApprove.appointmentDate,
        booking_time: bookingToApprove.bookingTime,
        status: 'APPROVED'
      };

      console.log('Sending approval email with params:', approvalParams);
      console.log('Template ID:', 'template_6nhdzb8'); 
      console.log('Service ID:', 'service_5nj4a3q');

      await emailjs.send(
        'service_5nj4a3q',
        'template_6nhdzb8', 
        approvalParams,
        '2hoyAdYKGd3tKVKWC'
      );

      setSuccessMessage('Booking approved! User will receive confirmation email.');
    } catch (error) {
      console.error('Error approving booking:', error);
      setError('Error approving booking. Please try again.');
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        setError('Booking not found');
        return;
      }

      setBookingToReject(booking);
      setIsRejectionModalOpen(true);
    } catch (error) {
      console.error('Error preparing rejection:', error);
      setError('Error preparing rejection. Please try again.');
    }
  };

  const confirmRejection = async () => {
    if (!bookingToReject || !rejectionReason.trim()) {
      setError('Rejection reason is required');
      return;
    }

    try {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingToReject.id 
            ? { ...booking, status: 'rejected' as const, adminNotes: rejectionReason.trim() }
            : booking
        )
      );

      const storedBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
      const updatedBookings = storedBookings.map((booking: any) => 
        booking.id === bookingToReject.id 
          ? { ...booking, status: 'rejected', adminNotes: rejectionReason.trim() }
          : booking
      );
      localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));

      const emailjs = (await import('@emailjs/browser')).default;
      
      const rejectionParams = {
        to_name: bookingToReject.name,
        to_email: bookingToReject.email,
        email_to: bookingToReject.email,  
        name: bookingToReject.name,       
        email: bookingToReject.email,     
        phoneNumber: bookingToReject.phoneNumber, 
        description: bookingToReject.description, 
        booking_id: bookingToReject.id,
        appointment_date: bookingToReject.appointmentDate,
        booking_time: bookingToReject.bookingTime,
        status: 'REJECTED',
        reason: rejectionReason.trim()
      };

        console.log(' Sending rejection email with params:', rejectionParams);
      console.log(' Rejection reason being sent:', rejectionReason.trim());
      console.log(' Template ID:', 'template_d0nyhpn');
      console.log(' Service ID:', 'service_5nj4a3q');
      console.log(' User email:', bookingToReject.email);

      await emailjs.send(
        'service_5nj4a3q',
        'template_d0nyhpn', 
        rejectionParams,
        '2hoyAdYKGd3tKVKWC'
      );

      console.log(' Sending rejection email with params:', rejectionParams);
      console.log(' Rejection reason being sent:', rejectionReason.trim());
      console.log(' Template ID:', 'template_d0nyhpn');
      console.log(' Service ID:', 'service_5nj4a3q');
      console.log(' User email:', bookingToReject.email);

      await emailjs.send(
        'service_5nj4a3q',
        'template_d0nyhpn', 
        rejectionParams,
        '2hoyAdYKGd3tKVKWC'
      );

      console.log(' Rejection reason being sent:', rejectionReason.trim());
      console.log(' Template ID:', 'template_d0nyhpn');
      console.log(' Service ID:', 'service_5nj4a3q');
      console.log(' User email:', bookingToReject.email);

      await emailjs.send(
        'service_5nj4a3q',
        'template_d0nyhpn', 
        rejectionParams,
        '2hoyAdYKGd3tKVKWC'
      );

      setSuccessMessage(` Booking rejected successfully! 

 Rejection email sent to: ${bookingToReject.email}
 Rejection reason: "${rejectionReason.trim()}"

The user will receive an email explaining why their booking was rejected.`);
      
      setIsRejectionModalOpen(false);
      setRejectionReason('');
      setBookingToReject(null);
    } catch (error) {
      console.error('Error rejecting booking:', error);
      setError('Error rejecting booking. Please try again.');
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) return;

    try {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      
      const existingBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
      const updatedBookings = existingBookings.filter((booking: any) => booking.id !== bookingId);
      localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));
      
      console.log('✅ Booking deleted successfully!');
      console.log('Remaining bookings:', updatedBookings);
      
      setSuccessMessage('Booking deleted successfully!');
      
     
      if (isBookingModalOpen && selectedBooking?.id === bookingId) {
        setIsBookingModalOpen(false);
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Error deleting booking. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
                <p className="text-gray-600 mt-1">Monitor editor activity and manage editor summaries</p>
              </div>
              <div className="flex space-x-3">
               
                <button
                  onClick={refreshAll}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">Users</h2>
              </div>
              
              {consolidatedUsers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No editor activity found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blogs Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blogs Updated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consolidatedUsers.map((summary, index) => (
                        <tr key={summary.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {summary.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {summary.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {summary.creates}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {summary.updates}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTimestamp(summary.lastAction)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewEditor({ editorEmail: summary.email, editorName: summary.name } as ChangeLog)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded"
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEditor(summary.email)}
                                disabled={deleting === summary.email}
                                className="text-red-600 hover:text-red-800 transition-colors p-2 rounded disabled:opacity-50"
                                title="Delete editor and all blogs"
                              >
                                {deleting === summary.email ? (
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

          </div>
        );

      case 'summary':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h2 className="text-lg font-semibold">Users</h2>
            </div>
            
            {consolidatedUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No editor activity found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blogs Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blogs Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {consolidatedUsers.map((summary, index) => (
                      <tr key={summary.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {summary.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {summary.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {summary.creates}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {summary.updates}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTimestamp(summary.lastAction)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewEditor({ editorEmail: summary.email, editorName: summary.name } as ChangeLog)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEditor(summary.email)}
                              disabled={deleting === summary.email}
                              className="text-red-600 hover:text-red-800 transition-colors p-2 rounded disabled:opacity-50"
                              title="Delete editor and all blogs"
                            >
                              {deleting === summary.email ? (
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
        );

             case 'blogs':
         return (
           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
             <div className="px-6 py-4 bg-blue-600 text-white">
               <div className="flex justify-between items-center">
                
               
               </div>
             </div>
             
             {blogs.length === 0 ? (
               <div className="text-center py-8">
                 <p className="text-gray-500">No blogs found.</p>
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
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
                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{blog.content}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(blog.createdAt)}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {blog.updatedAt && blog.updatedAt !== blog.createdAt ? formatTimestamp(blog.updatedAt) : '-'}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex space-x-2">
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
         );

       case 'Submissions':
         return (
           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
             <div className="px-6 py-4 bg-blue-600 text-white">
               <div className="flex justify-between items-center">
                 <div>
                   <h2 className="text-lg font-semibold">Contact Form Submissions</h2>
                   <p className="text-purple-100 text-sm mt-1">Manage and review all contact form entries</p>
                 </div>
                 <button
                   onClick={fetchContactSubmissions}
                   disabled={submissionsLoading}
                   className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                 >
                   <RefreshCw className={`h-4 w-4 mr-2 ${submissionsLoading ? 'animate-spin' : ''}`} />
                   Refresh Data
                 </button>
               </div>
             </div>

            {error && (
              <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {submissionsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Loading submissions...</span>
              </div>
            ) : contactSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No contact form submissions found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contactSubmissions.map((submission, index) => (
                      <tr key={submission._id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{submission.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(submission.timestamp)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewSubmission(submission)}
                              className="text-blue-400 hover:text-indigo-900 transition-colors"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubmission(submission._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete submission"
                            >
                              <Trash2 className="h-4 w-4" />
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
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                <p className="text-gray-600 mt-1">Monitor and manage appointment booking requests</p>
              </div>
              <div className="flex space-x-3">
               
                <button
                  onClick={refreshBookings}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">Recent Bookings</h2>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 mb-4">Click "Manage Bookings" above to approve or reject booking requests.</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking, index) => (
                        <tr key={booking.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.phoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.appointmentDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleViewBooking(booking)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded"
                                    title="View Details"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleApproveBooking(booking.id)}
                                    className="text-green-600 hover:text-green-800 transition-colors p-2 rounded"
                                    title="Approve Booking"
                                  >
                                    ✅
                                  </button>
                                  <button
                                    onClick={() => handleRejectBooking(booking.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors p-2 rounded"
                                    title="Reject Booking"
                                  >
                                    ❌
                                  </button>
                                </>
                              )}
                              {booking.status === 'approved' && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Approved</span>
                              )}
                              {booking.status === 'rejected' && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Rejected</span>
                              )}
                             
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-800 transition-colors p-2 rounded ml-2"
                                title="Delete Booking"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a section from the sidebar.</p>
          </div>
        );
    }
  };

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
            <h1 className="text-white text-lg font-bold uppercase underline rounded-lg shadow-lg p-2">Admin Dashboard</h1  >
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('summary')}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === 'summary'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Users</span>
            </button>
           
            <button
              onClick={() => setActiveSection('Submissions')}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === 'Submissions'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Queries</span>
            </button>
            
            <button
              onClick={() => setActiveSection('blogs')}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === 'blogs'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Edit className="h-5 w-5" />
              
              <span>Blogs</span>
            </button>

            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === 'bookings'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </button>

            <a
              href="/admin-blog-approval"
              className="w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 text-blue-200 hover:bg-blue-800 hover:text-white"
            >
              <FileText className="h-5 w-5" />
              <span>Blog Approval</span>
            </a>
          </nav>
        </div>

        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {isSubmissionModalOpen && selectedSubmission && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsSubmissionModalOpen(false);
            setSelectedSubmission(null);
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-betlen items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Submission Details</h3>
              <button
                onClick={() => {
                  setIsSubmissionModalOpen(false);
                  setSelectedSubmission(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-900">{selectedSubmission.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-900">{selectedSubmission.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2 text-gray-900">{selectedSubmission.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Message:</span>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Timestamp:</span>
                <span className="ml-2 text-gray-900">{formatTimestamp(selectedSubmission.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewModalOpen && selectedEditor && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setViewModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Details</h3>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEditor.name}</h2>
                  <p className="text-gray-600">{selectedEditor.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">{selectedEditor.creates + selectedEditor.updates}</div>
                  <div className="text-sm text-purple-600">Total Actions</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center bg-white rounded-lg p-3 border border-purple-100">
                  <div className="text-xl font-bold text-blue-600">{selectedEditor.creates}</div>
                  <div className="text-xs text-blue-600">Blogs Created</div>
                </div>
                <div className="text-center bg-white rounded-lg p-3 border border-purple-100">
                  <div className="text-xl font-bold text-green-600">{selectedEditor.updates}</div>
                  <div className="text-xs text-green-600">Blogs Updated</div>
                </div>
                <div className="text-center bg-white rounded-lg p-3 border border-purple-100">
                  <div className="text-xl font-bold text-purple-600">{selectedEditor.creates + selectedEditor.updates}</div>
                  <div className="text-xs text-purple-600">Total Activity</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-medium text-gray-700">Primary Email:</span>
                <span className="ml-2 text-gray-900">{selectedEditor.email}</span>
              </div>
              {selectedEditor.allEmails && selectedEditor.allEmails.length > 1 && (
                <div>
                  <span className="font-medium text-gray-700">All Emails:</span>
                  <div className="ml-2 mt-1">
                    {selectedEditor.allEmails.map((email) => (
                      <span key={email} className="inline-block bg-gray-100 px-2 py-1 rounded text-sm text-gray-700 mr-2 mb-1">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-900">{selectedEditor.name}</span>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-blue-900 mb-3">Blog Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedEditor.creates}</div>
                    <div className="text-sm text-blue-700">Blogs Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedEditor.updates}</div>
                    <div className="text-sm text-green-700">Blogs Updated</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-lg font-semibold text-gray-700">
                    Total Activity: {selectedEditor.creates + selectedEditor.updates}
                  </div>
                  <div className="text-sm text-gray-600">Combined actions</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-300 rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Blogs by {selectedEditor.name}
              </h2>
              
              {(() => {
                const userBlogs = getBlogsByEditor(selectedEditor.email, selectedEditor.name);
                if (userBlogs.length === 0) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No blogs created by this user.</p>
                    </div>
                  );
                }
                
                return (
                  <div>
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Found {userBlogs.length} blog(s)</span> created by {selectedEditor.name}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {userBlogs.map((blog) => (
                        <div key={blog._id} className="border border-gray-800 rounded-lg p-4 bg-gray-100">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-gray-900">{blog.title}</h4>
                              <p className="text-gray-700 mt-2 line-clamp-3">{blog.content}</p>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs text-gray-500">
                                  <span className="font-medium">Created:</span> {formatTimestamp(blog.createdAt)}
                                </p>
                                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                  <p className="text-xs text-blue-600">
                                    <span className="font-medium">Updated:</span> {formatTimestamp(blog.updatedAt)}
                                  </p>
                                )}
                                {(() => {
                                  const creator = getBlogCreator(blog._id);
                                  if (creator) {
                                    return (
                                      <p className="text-xs text-green-600">
                                        <span className="font-medium">Creator:</span> {creator.name} ({creator.email})
                                      </p>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
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
                                className="text-red-600 hover:text-red-800 transition-colors p-2 rounded disabled:opacity-50"
                                title="Delete blog"
                              >
                                {deletingBlog === blog._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div>
                <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="editTitle"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Blog title"
                />
              </div>
              <div>
                <label htmlFor="editContent" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  id="editContent"
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={10}
                  placeholder="Blog content"
                />
              </div>
              <div>
                <label htmlFor="editImage" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                <input
                  type="url"
                  id="editImage"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://example.com/image.jpg"
                />
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

      {isBookingModalOpen && selectedBooking && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsBookingModalOpen(false);
            setSelectedBooking(null);
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Booking Details</h3>
              <button
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setSelectedBooking(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Patient Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-900">{selectedBooking.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-900">{selectedBooking.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="ml-2 text-gray-900">{selectedBooking.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="ml-2">{getStatusBadge(selectedBooking.status)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Appointment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Booking ID:</span>
                    <span className="ml-2 text-gray-900 font-mono">{selectedBooking.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Requested Date:</span>
                    <span className="ml-2 text-gray-900">{selectedBooking.appointmentDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Requested Time:</span>
                    <span className="ml-2 text-gray-900">{selectedBooking.bookingTime}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Submitted:</span>
                    <span className="ml-2 text-gray-900">{formatTimestamp(selectedBooking.submittedAt.toISOString())}</span>
                  </div>
                </div>
              </div>

             
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Reason for Visit</h4>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedBooking.description}</p>
              </div>

             
              {selectedBooking.adminNotes && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">
                    {selectedBooking.status === 'rejected' ? 'Rejection Reason' : 'Admin Notes'}
                  </h4>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedBooking.adminNotes}</p>
                </div>
              )}

             
              {selectedBooking.status === 'pending' && (
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Take Action</h4>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        handleApproveBooking(selectedBooking.id);
                        setIsBookingModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                    >
                      ✅ Approve Booking
                    </button>
                    <button
                      onClick={() => {
                        setBookingToReject(selectedBooking);
                        setIsRejectionModalOpen(true);
                        setIsBookingModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center"
                    >
                      ❌ Reject Booking
                    </button>
                  </div>
                </div>
              )}

             
              {selectedBooking.status !== 'pending' && (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Current Status</h4>
                  <div className="text-lg">
                    {getStatusBadge(selectedBooking.status)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    This booking has already been {selectedBooking.status}.
                  </p>
                </div>
              )}

              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-4 text-center">Danger Zone</h4>
                <div className="text-center">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
                        handleDeleteBooking(selectedBooking.id);
                        setIsBookingModalOpen(false);
                        setSelectedBooking(null);
                      }
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center mx-auto"
                  >
                    🗑️ Delete Booking Permanently
                  </button>
                  <p className="text-sm text-red-600 mt-2">
                    This will permanently remove the booking from the system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRejectionModalOpen && bookingToReject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsRejectionModalOpen(false);
            setRejectionReason('');
            setBookingToReject(null);
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reject Booking</h3>
              <button
                onClick={() => {
                  setIsRejectionModalOpen(false);
                  setRejectionReason('');
                  setBookingToReject(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Are you sure you want to reject this booking? This action cannot be undone.
                Please provide a reason for rejection.
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={4}
                placeholder="Reason for rejection (e.g., 'No longer needed', 'Appointment cancelled')"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRejectionModalOpen(false);
                    setRejectionReason('');
                    setBookingToReject(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRejection}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
