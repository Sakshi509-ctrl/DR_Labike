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
      </Routes>
    </ContactSidebarProvider>
    </AuthProvider>
  );
}

export default App;