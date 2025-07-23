import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const patientFinancialData: Record<number, { turnover: number; expenses: number; profit: number }> = {
  200: { turnover: 55000, expenses: 30000, profit: 25000 },
  300: { turnover: 825000, expenses: 35000, profit: 47500 },
  400: { turnover: 110000, expenses: 40000, profit: 70000 },
  500: { turnover: 137500, expenses: 45000, profit: 92500 },
  600: { turnover: 165000, expenses: 50000, profit: 115000 },
};

const ROICalculator = () => {
  const [selectedPatients, setSelectedPatients] = useState(200);

  const chartData = [
    {
      name: "Monthly Turnover",
      value: patientFinancialData[selectedPatients].turnover,
      color: "#4CAF50",
    },
    {
      name: "Total Expenses",
      value: patientFinancialData[selectedPatients].expenses,
      color: "#FFC107",
    },
    {
      name: "Monthly Profit",
      value: patientFinancialData[selectedPatients].profit,
      color: "#0F1D3F",
    },
  ];

  return (
    <div className="mt-10 px-4">
      <div className="flex flex-wrap justify-center gap-2">
        {[200, 300, 400, 500].map((num) => (
          <button
            key={num}
            className={`rounded-full px-6 py-3 border-2 font-bold text-base shadow transition-colors duration-200 ${
              selectedPatients === num
                ? "bg-[#1A2B5B] text-white border-blue-900"
                : "bg-white text-[#1a2a5c] border-blue-500"
            }`}
            onClick={() => setSelectedPatients(num)}
          >
            {num} Patients/Month
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          key={600}
          className={`rounded-full px-6 py-3 border-2 font-bold text-base shadow transition-colors duration-200 ${
            selectedPatients === 600
              ? "bg-[#1A2B5B] text-white border-blue-900"
              : "bg-white text-[#1a2a5c] border-blue-500"
          }`}
          onClick={() => setSelectedPatients(600)}
        >
          600 Patients/Month
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-14 md:ml-20 ">
        <div className="bg-white rounded-xl shadow p-4 w-full md:w-[80%] max-w-5xl">
          <h2 className="text-xl font-generic text-center mb-4">Monthly Financial Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, "dataMax + 20000"]}
              tickFormatter={(tick) => `₹${tick.toLocaleString()}`}
              />
              <YAxis type="category" dataKey="name" width={140} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="value">
            {chartData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.color} />
  ))}
  <LabelList
    dataKey="value"
    position="right"
    formatter={(value) => value != null ? `₹${value.toLocaleString()}` : ""}
  />
</Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-6 w-full md:w-[40%] max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Projected Annual Profit</h2>
          <div className="text-5xl font-extrabold text-green-500 mb-2">
            ₹{(patientFinancialData[selectedPatients].profit * 12).toLocaleString()}
          </div>
          <p className="text-gray-700 text-base">
            This projection is based on the selected patient volume and our transparent 70:30 revenue sharing model for patient loads exceeding the guaranteed minimum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
