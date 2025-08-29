
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import ContactSidebar, { ContactSidebarProvider } from './components/ContactSidebar';
import {Routes, Route } from 'react-router-dom';
import TestimonialPage from './components/TestimonialPage';
import BlogsPage from './components/BlogsPage';
import BlogDetailPage from './components/BlogDetailPage';
import Home from './pages/Home';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';
import Franchise from './components/Franchise';
import Internship from './components/internship';
import MarketChart from './components/marketing';
import ROICalculator from './components/roicalculator';
import Footer from './components/footer';
import InquiryPage from './components/InquiryPage';
import CertificateVerification from './components/CertificateVerification';
import PrivacyPolicy from './components/PrivacyPolicy';
import ShippingPolicy from './components/shippingpolicy';
import TermsAndConditions from './components/terms&conditions';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import MedicalBlogs from './components/medicalBlogs';
import MedicalBlogsPage2 from './components/medicalBlogsPage2';
import Projects from './components/project';
import EditMedicalPage from './components/editmedical';
import Readmore from './components/pcodRead';
import IvfRead from './components/ivfRead';
import DigRead from './components/digRead';
import FamiliesRead from './components/familiesRead';
import OTPReset from './components/OTPReset';
import BlogChangeLogs from './components/blogchangelogs';
import BlogFullPage from './components/BlogFullPage';
import AdminPanel from './components/AdminPanel';
import UserActivityView from './components/UserActivityView';
import UserPanel from './components/UserPanel';
import AdminBlogApproval from './components/AdminBlogApproval';
import UserBlogStatus from './components/UserBlogStatus';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <AuthProvider>
    <ContactSidebarProvider>
      <Sidebar />
      <ContactSidebar />
      <Routes>
        <Route path="/" element={<><Header /><Home/></>} />
        <Route path="/testimonials" element={<TestimonialPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/franchise" element={<Franchise />} />    
        <Route path="/internship" element={<Internship/>}/>
        <Route path='/marketing' element={<MarketChart/>}/>
        <Route path='/roicalculator' element={<ROICalculator/>}/>
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/certificate-verification" element={<CertificateVerification />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medical-blogs" element={<MedicalBlogs />} />
        <Route path="/medical-blogs/page2" element={<MedicalBlogsPage2 />} />
        <Route path="/blog/:blogId" element={<BlogFullPage />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="editmedical" element={<EditMedicalPage/>}/>
        <Route path="/readmore" element={<Readmore />} />
        <Route path="/ivfread" element={<IvfRead />} />
        <Route path="/digRead" element={<DigRead/>} />
        <Route path="/familiesRead" element={<FamiliesRead/>}/>
        <Route path="/OTPReset" element={<OTPReset/>}/>
        <Route path="/blogchangelogs" element={<BlogChangeLogs/>}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/admin-blog-approval" element={<AdminBlogApproval/>}/>
        <Route path="/userpanel/:email" element={<UserActivityView/>}/>
        <Route path="/user-blog-panel/:email" element={<UserPanel/>}/>
        <Route path="/userpanel" element={<UserPanel/>}/>
        <Route path="/user-blog-status/:email" element={<UserBlogStatus userEmail=""/>}/>
        <Route path="/booking" element={<BookingPage />} />
        </Routes>
    </ContactSidebarProvider>
    </AuthProvider>
  );
}

export default App;