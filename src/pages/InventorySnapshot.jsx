import React, { useState } from "react";
import MetricCard from "../components/MetricCard";
// import InventoryTable from "../components/InventoryTable";
import { loadInventoryCSV } from "../utils/loadCSV";
import InventoryTable from "../components/InventoryTable";

const InventorySnapshot = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSKUs, setSelectedSKUs] = useState(["All"]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    loadInventoryCSV(file, (parsedData) => {
      setData(parsedData);
      setFilteredData(parsedData);
    });
  };

  const handleSKUFilter = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedSKUs(selected);

    if (selected.includes("All")) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((row) => selected.includes(row.SKU)));
    }
  };

  const numericCols = data.length > 0
    ? Object.keys(data[0]).filter((key) => typeof data[0][key] === "number")
    : [];

  const totals = numericCols.reduce((acc, key) => {
    acc[key] = filteredData.reduce((sum, row) => sum + (row[key] || 0), 0);
    return acc;
  }, {});

  const uniqueSKUs = [...new Set(data.map((row) => row.SKU).filter(Boolean))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Inventory Snapshot</h2>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <input type="file" accept=".csv" onChange={handleFileUpload} className="border p-2 rounded-md" />
        <select multiple value={selectedSKUs} onChange={handleSKUFilter}
          className="border p-2 rounded-md w-full md:w-64 h-40"
        >
          <option value="All">All</option>
          {uniqueSKUs.map((sku) => (
            <option key={sku} value={sku}>{sku}</option>
          ))}
        </select>
      </div>

      {numericCols.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">🧐 Key Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {numericCols.map((key) => (
              <MetricCard key={key} label={key} value={totals[key]} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-green-500 text-white p-3 rounded-full text-center font-bold mb-2">
        Sellable Stock as of Today
      </div>

      <InventoryTable data={filteredData} />
    </div>
  );
};

export default InventorySnapshot;
