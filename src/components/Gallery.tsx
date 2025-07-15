import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Gallery = () => (
  <div style={{ height: '100vh', overflowY: 'auto', padding: '2rem', background: '#f8fcfb' }}>
    {/* Our Innovation Section */}
    <section>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>Our Innovation</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        {/* Example innovation cards, replace src with your images */}
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/Mobile.png" alt="Mobile Lab" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Mobile Lab</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/mini.png" alt="Mini Lab" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Mini Lab</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/bmi.png" alt="BMI machine" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>BMI machine</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/automicro.png" alt="Automicrosope" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Automicroscope</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/Accusmear-Device.png" alt="Accusmear Device" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accusmear Device</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/Accurapid-stainer.png" alt="Accurapid Stainer" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accurapid Stainer</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/Accurine-Analyzer.png" alt="Accurine analyzer" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accurine analyzer</div>
        </div>
      </div>
    </section>

    {/* Services That We Provide Section */}
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>Services That We Provide</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/tele.png" alt="Teleconsultation" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Teleconsultation</div>
        </div>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/pt.png" alt="Pathology Tests" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Pathology Tests</div>
        </div>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src="/medi.png" alt="Medicine" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Medicine</div>
        </div>
      </div>
    </section>

    {/* DrLaBike Camp Section */}
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>DrLaBike Camp</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0rem' }}>
        <img src="/injection.png" alt="Camp 1" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
        <img src="/i1.png" alt="Camp 2" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
        <img src="/i.jpg" alt="Camp 3" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
      </div>
    </section>
    <div className="max-w-6xl mx-auto mt-16 mb-8 flex flex-col md:flex-row items-start gap-8 text-white bg-black rounded-xl p-8">
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
          <img src="/DrLabike-New-logo-trans (1).png" alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
          <span className="text-lg font-bold">DrLaBike</span>
        </div>
        {/* Columns on the right */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li>&#9654; About</li>
              <li>&#9654; Gallery</li>
              <li>&#9654; Testimonial</li>
              <li>&#9654; Blogs</li>
              <li>&#9654; Inquiry</li>
              <li>&#9654; Verification</li>
            </ul>
          </div>
          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-3">Policies</h3>
            <ul className="space-y-2">
              <li>&#9654; Privacy Policy</li>
              <li>&#9654; Shipping Policy</li>
              <li>&#9654; Terms & Conditions</li>
              <li>&#9654; Refund & Cancellation</li>
            </ul>
          </div>
          {/* Address */}
          <div>
            <h3 className="text-lg font-bold mb-3">Address</h3>
            <div className="mb-2">G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📍</span>
              <span>G.F, 424-CMR Building, Near MCD School, Ghitorni, New Delhi-110030</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📞</span>
              <span>+91-706-555-0214</span>
            </div>
            {/* Follow Us Icons */}
            <div className="mt-4">
              <div className="font-bold mb-2">Follow Us</div>
              <div className="flex gap-4 mb-4">
                <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
                <a href="#" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
                <a href="#" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
                <a href="#" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
              </div>
            </div>
          </div>
        </div>
        </div>
  </div>
);

export default Gallery; 