import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Mobile from '../../public/assets/Mobile-DJxZHcjJ.png';
import Mini from '../../public/assets/mini-ZWdABhCJ.png';
import BMI from '../../public/assets/bmi-CuuxtqjX.png';
import Automicro from '../../public/assets/automicro-Bd87Lc0m.png';
import Accusmear from '../../public/assets/Accusmear-Device-DenfSAYc.png';
import Accurapid from '../../public/assets/Accurapid-stainer-DhPV0lcp.png';
import Accurine from '../../public/assets/Accurine-Analyzer-CG-GTGql.png';
import Tele from '../../public/assets/Tele-MRnbjJfz.png';
import Pathology from '../../public/assets/pt-C9ig0ImT.png';
import Medicine from '../../public/assets/medi-XN3tLmo1.png';
import Injection from '../../public/assets/injection-C6C2jwlg.png';
import I1 from '../../public/assets/i1-BPfNmFtl.png';
import I from '../../public/assets/i-BF82gZgm.jpg';
import Drlabikelogo from '../../public/assets/DrLabike-New-logo-trans (1)-D1SuIxFX.png';
import Header from './Header';


const Gallery = () => (
  <div style={{ height: '100vh', overflowY: 'auto', padding: '2rem', background: '#f8fcfb' }}>
    <Header />

    <section>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>Our Innovation</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>

        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Mobile} alt="Mobile Lab" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Mobile Lab</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Mini} alt="Mini Lab" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Mini Lab</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={BMI} alt="BMI machine" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>BMI machine</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Automicro} alt="Automicrosope" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Automicroscope</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Accusmear} alt="Accusmear Device" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accusmear Device</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Accurapid} alt="Accurapid Stainer" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accurapid Stainer</div>
        </div>
        <div style={{ width: 250, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Accurine} alt="Accurine analyzer" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Accurine analyzer</div>
        </div>
      </div>
    </section>

    <section style={{ marginTop: '4rem' }}>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>Services That We Provide</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Tele} alt="Teleconsultation" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Teleconsultation</div>
        </div>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Pathology} alt="Pathology Tests" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Pathology Tests</div>
        </div>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 16, textAlign: 'center', marginBottom: 24 }}>
          <img src={Medicine} alt="Medicine" style={{ width: 300, height: 300, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>Medicine</div>
        </div>
      </div>
    </section>

    <section style={{ marginTop: '4rem' }}>
      <h2 style={{ background: '#aaf0fa', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem', fontFamily: 'serif' }}>DrLaBike Camp</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0rem' }}>
        <img src={Injection} alt="Camp 1" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
        <img src={I1} alt="Camp 2" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
        <img src={I} alt="Camp 3" style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 0 }} />
      </div>
    </section>
    <div className="w-full mt-16 mb-8 flex flex-col md:flex-row items-start gap-8 text-white bg-black rounded-xl p-8">

        <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-1/5 mb-8 md:mb-0">
          <img src={Drlabikelogo} alt="DrLaBike Logo" className="w-24 h-auto mb-2" />
          <span className="text-lg font-bold">DrLaBike</span>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-sm">

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

          <div>
            <h3 className="text-lg font-bold mb-3">Policies</h3>
            <ul className="space-y-2">
              <li>&#9654; Privacy Policy</li>
              <li>&#9654; Shipping Policy</li>
              <li>&#9654; Terms & Conditions</li>
              <li>&#9654; Refund & Cancellation</li>
            </ul>
          </div>

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

            <div className="mt-4">
              <div className="font-bold mb-2">Follow Us</div>
              <div className="flex gap-4 mb-4">
                <a href="https://www.facebook.com/drlabike" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-600" /></a>
                <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdrlabike%2F&is_from_rle" aria-label="Instagram" className="ml-4"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
                <a href="https://x.com/account/access" aria-label="Twitter" className="ml-4"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
                <a href="https://www.youtube.com/channel/UC9k-Me74MlQOgsmRWObyh6Q" aria-label="YouTube" className="ml-4"><Youtube className="w-5 h-5 hover:text-red-600" /></a>
              </div>
            </div>
          </div>
        </div>
        
        </div>
        <div className="w-full flex justify-center font-bold text-gray-600 mt-4">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
  </div>
);

export default Gallery; 