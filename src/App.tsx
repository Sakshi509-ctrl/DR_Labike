import React from 'react';
import Header from './components/Header';
import About from './components/About';
import ContactSidebar from './components/ContactSidebar';
import { Routes, Route } from 'react-router-dom';
import TestimonialPage from './components/TestimonialPage';
import BlogsPage from './components/BlogsPage';
import BlogDetailPage from './components/BlogDetailPage';
import Home from './pages/Home';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Sidebar />
      <ContactSidebar />
      <Header />
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/testimonials" element={<TestimonialPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;