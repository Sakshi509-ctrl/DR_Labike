import React from "react";

const MinimalHeader = () => (
  <header className="w-full bg-white shadow">
    <div className="flex items-center justify-between px-12 py-6">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <span className="text-[#1a2a5c]">DR</span>{" "}
        <span className="text-green-600">Labike</span>
      </div>
      {/* Nav */}
      <nav>
        <ul className="flex gap-12 text-gray-600 text-2xl font-normal">
          <li>Opportunity</li>
          <li>ROI Calculator</li>
          <li>The Offer</li>
          <li>Services</li>
        </ul>
      </nav>
      {/* Invest Now Button */}
      <button className="bg-[#1a2a5c] text-white text-2xl font-normal rounded-full px-10 py-3">
        Invest Now
      </button>
    </div>
  </header>
);

export default MinimalHeader; 