import React from "react";
import CountUp from "react-countup";

const StatCard = ({ title, value, suffix, subText, color }) => (
  <div style={{
    padding: '20px',
    borderRadius: '16px',
    background: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
    border: color ? `2px solid ${color}` : 'none'
  }}>
    <h3 style={{ color: '#4a4a4a', fontWeight: 'bold' }}>{title}</h3>
    <h2 style={{ color: color || '#1c1c1c', fontWeight: 'bold', fontSize: '32px' }}>
      ₹<CountUp end={value} duration={2.5} separator="," />
    </h2>
    <p style={{ color: '#757575' }}>{subText}</p>
  </div>
);

export default function StatsSection() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '24px',
      padding: '40px',
      backgroundColor: '#f9fdfc'
    }}>
      <StatCard
        title="Initial Investment"
        value={500000}
        subText="To start your own diagnostic lab"
      />
      <StatCard
        title="Total Business Worth"
        value={12000000}
        subText="With our 360° comprehensive support"
        color="#0aa835"
      />
      <StatCard
        title="Earning Potential"
        value={2100000}
        subText="Projected over the first 3 years"
      />
    </div>
  );
}
