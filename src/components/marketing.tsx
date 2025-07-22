import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type MarketData = {
  name: string;
  current: number;
  projected: number;
};

const data: MarketData[] = [
  {
    name: "Diagnostics Market",
    current: 2128.70,
    projected: 7847.90
  },
  {
    name: "Franchise Market",
    current: 9600.00,
    projected: 145000.00,
  },
  {
    name: "mHealth Market",
    current: 2498.10,
    projected: 6944.10
  },
  {
    name: "Digital Health Market",
    current: 3880.00,
    projected: 39700.00
  },
];

const MarketChart = () => {
  const [selectedMarket, setSelectedMarket] = useState<Pick<MarketData, 'name' | 'projected'> | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBarClick = (data: any) => {
    setSelectedMarket({
      name: data.name,
      projected: data.projected,
    });
  };

  return (
    
    <div className="max-w-5xl h-[350px] md:w-[120%] shadow rounded-lg  ml-0">
        <h2 className="text-xl font-bold text-center mb-5  ">Market Size & Projections (in Million USD)</h2>
      <div className="flex justify-center gap-4 mb-2">
        
        <div className="flex items-center gap-2">
            
          <span className="inline-block w-9 h-3 bg-[#1a2a5c] border-2 border-gray-700 "></span>
          
          <span className="text-gray-700 text-sm">Current Value (USD Million)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-9 h-3 bg-[#7ed957] border-2 border-green-400 "></span>
          <span className="text-gray-700 text-sm">Projected Value (USD Million)</span>
        </div>
      </div>
      
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 40, left: 10, bottom: 20 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-10} textAnchor="end" />
          <YAxis
            scale="log"
            domain={[1000, 150000]}
            width={110}
            tickFormatter={(tick) => {
              if (tick === 4000) return '';
              return `${tick.toLocaleString()}`;
            }}
          />
<Tooltip formatter={(value) => `$${value.toLocaleString()}M`} />
          <Bar dataKey="current" fill="#1a2a5c" name="Current Value (USD Million)" onClick={handleBarClick} />
          <Bar dataKey="projected" fill="#7ed957" name="Projected Value (USD Million)" onClick={handleBarClick} />
        </BarChart>
      </ResponsiveContainer>

      {selectedMarket && (
        <div className="mt-4 text-center text-lg font-medium">
          📈 <strong>{selectedMarket.name}</strong> Projected Value:{" "}
          <span className="text-green-600">${selectedMarket.projected.toLocaleString()} Million</span>
        </div>
      )}
    </div>
  );
};

export default MarketChart;
