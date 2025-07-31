import React from 'react';
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
import Header from './Header';
import Footer from './footer';


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


          
        <Footer/>
        <div className="w-full flex justify-center font-bold text-gray-600 mt-4">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
  </div>
);

export default Gallery; 