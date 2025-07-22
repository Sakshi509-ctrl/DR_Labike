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
import InternshipForm from './components/internshipform';
import ROICalculator from './components/roicalculator';


function App() {
  return (
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
        <Route path='/internshipform' element={<InternshipForm/>}/>
        <Route path='/roicalculator' element={<ROICalculator/>}/>
        
      </Routes>
    </ContactSidebarProvider>
  );
}

export default App;