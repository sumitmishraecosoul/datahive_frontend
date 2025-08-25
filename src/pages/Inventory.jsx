
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InventoryTable from "../components/InventoryTable";
// import MetricCard from "../components/MetricCard";
// import { FaBoxOpen } from "react-icons/fa";
// import Select from "react-select";

// const Inventory = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSKUs, setSelectedSKUs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [skuOptions, setSkuOptions] = useState([]);

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/inventory");
//         setData(response.data);
//         setFilteredData(response.data);

//         const uniqueSKUs = [...new Set(response.data.map((row) => row.SKU).filter(Boolean))];
//         setSkuOptions(uniqueSKUs.map((sku) => ({ label: sku, value: sku })));
//         setSelectedSKUs([{ label: "All", value: "All" }]);
//       } catch (err) {
//         console.error("Error loading inventory:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   const handleSKUFilter = (selected) => {
//     setSelectedSKUs(selected);

//     if (selected.some((item) => item.value === "All")) {
//       setFilteredData(data);
//     } else {
//       const selectedValues = selected.map((item) => item.value);
//       setFilteredData(data.filter((row) => selectedValues.includes(row.SKU)));
//     }
//   };

//   const numericCols =
//     data.length > 0
//       ? Object.keys(data[0]).filter((key) => !isNaN(parseFloat(data[0][key])) && key !== "SKU")
//       : [];

//   const totals = numericCols.reduce((acc, key) => {
//     acc[key] = filteredData.reduce((sum, row) => sum + parseFloat(row[key] || 0), 0);
//     return acc;
//   }, {});

//   return (
//     <div className="px-6 py-6 max-w-7xl mx-auto">
//       <div className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-2">
//         <FaBoxOpen className="text-amber-600" />
//         Inventory Snapshot
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading inventory data...</div>
//       ) : (
//         <>
//           {/* Filters and Metrics */}
//           <div className="flex flex-col-reverse md:flex-row justify-between gap-6 mb-6">
//             {/* Metrics */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
//               {numericCols.map((key) => (
//                 <div
//                   key={key}
//                   className="bg-blue-100 text-sm rounded-md shadow px-4 py-3 text-gray-700"
//                 >
//                   <span className="font-semibold text-blue-800">{key}</span>{" "}
//                   Total: {totals[key].toLocaleString(undefined, { minimumFractionDigits: 2 })}
//                 </div>
//               ))}
//             </div>

//             {/* Filter */}
//             <div className="md:w-64">
//               <label className="text-sm font-semibold text-gray-700 mb-1 block">
//                 Select SKU(s):
//               </label>
//               <Select
//                 isMulti
//                 options={[{ label: "All", value: "All" }, ...skuOptions]}
//                 value={selectedSKUs}
//                 onChange={handleSKUFilter}
//                 className="text-sm"
//                 closeMenuOnSelect={true}
//               />
//             </div>
//           </div>

//           {/* Green Header */}
//           <div className="bg-green-500 text-white p-3 rounded-full text-center font-bold mb-4">
//             Sellable Stock as of Today
//           </div>

//           {/* Table */}
//           <InventoryTable data={filteredData} />
//         </>
//       )}
//     </div>
//   );
// };

// export default Inventory;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InventoryTable from "../components/InventoryTable";
// import Select from "react-select";
// import { FaBoxOpen } from "react-icons/fa";

// const TABS = ["Overview", "Shipments", "Warehouse", "Amazon", "ZOHO"];

// const Inventory = () => {
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSKUs, setSelectedSKUs] = useState([]);
//   const [skuOptions, setSkuOptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (activeTab === "Overview") {
//       fetchInventory();
//     }
//   }, [activeTab]);

//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/inventory");
//       setData(response.data);
//       setFilteredData(response.data);

//       const uniqueSKUs = [...new Set(response.data.map((row) => row.SKU).filter(Boolean))];
//       setSkuOptions(uniqueSKUs.map((sku) => ({ label: sku, value: sku })));
//       setSelectedSKUs([{ label: "All", value: "All" }]);
//     } catch (err) {
//       console.error("Error loading inventory:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSKUFilter = (selected) => {
//     setSelectedSKUs(selected);
//     if (selected.some((item) => item.value === "All")) {
//       setFilteredData(data);
//     } else {
//       const selectedValues = selected.map((item) => item.value);
//       setFilteredData(data.filter((row) => selectedValues.includes(row.SKU)));
//     }
//   };

//   const numericCols = data.length
//     ? Object.keys(data[0]).filter((key) => !isNaN(parseFloat(data[0][key])) && key !== "SKU")
//     : [];

//   const totals = numericCols.reduce((acc, key) => {
//     acc[key] = filteredData.reduce((sum, row) => sum + parseFloat(row[key] || 0), 0);
//     return acc;
//   }, {});

//   return (
//     <div className="px-6 py-6 max-w-7xl mx-auto">
//       {/* Section Tabs */}
//       <div className="flex gap-4 mb-6">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition ${
//               activeTab === tab
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Section Content */}
//       {activeTab === "Overview" && (
//         <>
//           <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
//             <FaBoxOpen className="text-green-600" />
//             Overall Inventory
//           </div>

//           {loading ? (
//             <div className="text-center text-gray-500">Loading inventory data...</div>
//           ) : (
//             <>
//               {/* Metrics + Filter Row */}
//               <div className="flex flex-col-reverse md:flex-row justify-between gap-6 mb-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
//                   {numericCols.map((key) => (
//                     <div
//                       key={key}
//                       className="bg-white border border-gray-200 shadow-sm rounded-md px-4 py-3"
//                     >
//                       <div className="text-xs text-gray-500 font-medium">{key}</div>
//                       <div className="text-blue-700 font-semibold text-base">
//                         ₹ {totals[key].toLocaleString()}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="md:w-64">
//                   <label className="text-sm font-semibold text-gray-700 mb-1 block">
//                     Filter by SKU:
//                   </label>
//                   <Select
//                     isMulti
//                     options={[{ label: "All", value: "All" }, ...skuOptions]}
//                     value={selectedSKUs}
//                     onChange={handleSKUFilter}
//                     className="text-sm"
//                     closeMenuOnSelect={true}
//                   />
//                 </div>
//               </div>

//               <div className="bg-green-500 text-white p-3 rounded-full text-center font-bold mb-4">
//                 Sellable Stock as of Today
//               </div>

//               <InventoryTable data={filteredData} />
//             </>
//           )}
//         </>
//       )}

//       {activeTab !== "Overview" && (
//         <div className="bg-white p-10 text-center text-gray-400 border rounded-xl shadow-inner">
//           <h2 className="text-lg font-semibold text-gray-600 mb-2">
//             {activeTab} screen will be added next...
//           </h2>
//           <p className="text-sm">Please upload the Figma design for the <strong>{activeTab}</strong> tab.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inventory;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InventoryTable from "../components/InventoryTable";
// import Select from "react-select";
// import { FaBoxOpen } from "react-icons/fa";

// const tabs = ["Overview", "Shipments", "Warehouse", "Amazon", "ZOHO"];

// const Inventory = () => {
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSKUs, setSelectedSKUs] = useState([]);
//   const [skuOptions, setSkuOptions] = useState([]);

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/inventory");
//         setData(res.data);
//         setFilteredData(res.data);

//         const uniqueSKUs = [...new Set(res.data.map((row) => row.SKU).filter(Boolean))];
//         setSkuOptions(uniqueSKUs.map((sku) => ({ label: sku, value: sku })));
//         setSelectedSKUs([{ label: "All", value: "All" }]);
//       } catch (err) {
//         console.error("Failed to load inventory data:", err);
//       }
//     };

//     fetchInventory();
//   }, []);

//   const handleSKUFilter = (selected) => {
//     setSelectedSKUs(selected);

//     if (selected.some((item) => item.value === "All")) {
//       setFilteredData(data);
//     } else {
//       const selectedValues = selected.map((item) => item.value);
//       setFilteredData(data.filter((row) => selectedValues.includes(row.SKU)));
//     }
//   };

//   const metricStyles = "bg-white shadow rounded-lg p-4 text-sm";

//   return (
//     <div className="p-6 max-w-[1400px] mx-auto">
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-full font-medium ${
//               activeTab === tab
//                 ? "bg-emerald-400 text-white"
//                 : "bg-gray-300 text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Overview Tab Content */}
//       {activeTab === "Overview" && (
//         <>
//           {/* Section: Overall Inventory */}
//           <div className="bg-white shadow rounded-xl p-6 mb-6">
//             <h3 className="text-lg font-semibold mb-4">Overall Inventory</h3>
//             <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 text-sm">
//               <div className={metricStyles}>
//                 <p className="text-blue-700 font-semibold">Sellable Stock Value</p>
//                 <p className="text-gray-600 text-xs">3G - ₹265k</p>
//                 <p className="text-gray-500 text-xs">Updike - $169k</p>
//               </div>
//               <div className={metricStyles}>
//                 <p className="text-yellow-700 font-semibold">Stock Value by Material</p>
//                 <p className="text-gray-600 text-xs">868</p>
//                 <p className="text-gray-500 text-xs">₹25000 Revenue</p>
//               </div>
//               <div className={metricStyles}>
//                 <p className="text-purple-700 font-semibold">Active Orders To fulfill</p>
//                 <p className="text-gray-600 text-xs">3G - 10 Orders</p>
//                 <p className="text-gray-500 text-xs">₹2500 Cost</p>
//               </div>
//               <div className={metricStyles}>
//                 <p className="text-red-600 font-semibold">Low Stocks</p>
//                 <p className="text-gray-600 text-xs">12 Ordered</p>
//                 <p className="text-gray-500 text-xs">2 Not in stock</p>
//               </div>
//             </div>
//           </div>

//           {/* Section: Filters */}
//           <div className="flex flex-wrap items-center gap-4 mb-4">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
//               Search SKU
//             </button>
//             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm">
//               Material
//             </button>
//             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm">
//               Switch to Cases View
//             </button>
//             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm">
//               Download all
//             </button>

//             <div className="min-w-[200px]">
//               <Select
//                 isMulti
//                 options={[{ label: "All", value: "All" }, ...skuOptions]}
//                 value={selectedSKUs}
//                 onChange={handleSKUFilter}
//                 className="text-sm"
//               />
//             </div>
//           </div>

//           {/* Section: Table Header */}
//           <div className="bg-gray-100 text-gray-700 text-center py-2 rounded-md font-semibold mb-2 text-sm">
//             Sellable Stock as of (Date)
//           </div>

//           {/* Section: Table */}
//           <InventoryTable data={filteredData} />
//         </>
//       )}

//       {/* Other Tabs Placeholder */}
//       {activeTab !== "Overview" && (
//         <div className="text-center text-gray-500 py-10">
//           <p>📦 {activeTab} content will appear here.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inventory;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";
// import { FaSearch } from "react-icons/fa";

// const Inventory = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [skuOptions, setSkuOptions] = useState([]);
//   const [selectedSku, setSelectedSku] = useState(null);
//   const [viewMode, setViewMode] = useState("packets");
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("Overview");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/inventory");
//         setData(response.data);
//         setFilteredData(response.data);

//         const skus = [...new Set(response.data.map((item) => item.SKU))];
//         setSkuOptions(skus.map((sku) => ({ label: sku, value: sku })));
//       } catch (err) {
//         console.error("Error fetching inventory data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSkuSelect = (option) => {
//     setSelectedSku(option);
//     if (option) {
//       setFilteredData(data.filter((item) => item.SKU === option.value));
//     } else {
//       setFilteredData(data);
//     }
//   };

//   const handleDownload = () => {
//     const csvContent = [
//       Object.keys(data[0]).join(","),
//       ...data.map((row) => Object.values(row).join(","))
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "inventory_data.csv");
//     link.click();
//   };

//   const toggleView = () => {
//     setViewMode((prev) => (prev === "packets" ? "cases" : "packets"));
//   };

//   const today = new Date().toLocaleDateString();

//   const tabs = ['Overview', 'Shipments', 'Warehouse', 'Amazon', 'ZOHO'];

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex gap-4 justify-start flex-wrap">
//         {tabs.map((tab, idx) => (
//           <button
//             key={idx}
//             onClick={() => setActiveTab(tab)}
//             className={`rounded-full px-6 py-2 font-semibold shadow-md transition-all duration-200 ${
//               activeTab === tab ? 'bg-teal-400 text-white' : 'bg-gray-300 text-gray-700'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeTab === "Overview" && (
//         <>
//           <div className="bg-white p-6 rounded-lg shadow space-y-4">
//             <h2 className="text-xl font-bold">Overall Inventory</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//               <div>
//                 <p className="text-blue-600 font-medium">Sellable Stock Value</p>
//                 <p className="font-bold">3G - ₹265k</p>
//                 <p className="text-xs text-gray-500">Updike - $169k</p>
//               </div>
//               <div>
//                 <p className="text-yellow-600 font-medium">Stock Value by Material</p>
//                 <p className="font-bold">868 ₹25000</p>
//                 <p className="text-xs text-gray-500">Last 7 days Revenue</p>
//               </div>
//               <div>
//                 <p className="text-purple-600 font-medium">Active Orders To fulfill</p>
//                 <p className="font-bold">3G- 10 Orders ₹2500</p>
//                 <p className="text-xs text-gray-500">Cost</p>
//               </div>
//               <div>
//                 <p className="text-red-600 font-medium">Low Stocks</p>
//                 <p className="font-bold">12 Ordered, 2 Not in stock</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow">
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//               <h2 className="text-lg font-bold">Sellable Stock as of ({today})</h2>
//               <div className="flex gap-2 flex-wrap">
//                 <div className="w-52">
//                   <Select
//                     options={skuOptions}
//                     value={selectedSku}
//                     onChange={handleSkuSelect}
//                     placeholder="Search SKU"
//                   />
//                 </div>
//                 <button className="border px-4 py-2 rounded-md text-sm font-semibold">
//                   Material
//                 </button>
//                 <button
//                   onClick={toggleView}
//                   className="border px-4 py-2 rounded-md text-sm font-semibold"
//                 >
//                   Switch to {viewMode === "packets" ? "Cases" : "Packets"} View
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="border px-4 py-2 rounded-md text-sm font-semibold"
//                 >
//                   Download all
//                 </button>
//               </div>
//             </div>

//             {loading ? (
//               <p className="text-gray-500">Loading data...</p>
//             ) : (
//               <div className="overflow-x-auto max-h-[500px] border rounded-md">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-100 sticky top-0">
//                     <tr>
//                       {Object.keys(data[0] || {}).map((col, idx) => (
//                         <th key={idx} className="px-4 py-2 font-semibold text-gray-600">
//                           {col}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredData.map((row, idx) => (
//                       <tr key={idx} className="border-b hover:bg-gray-50">
//                         {Object.keys(row).map((col, i) => (
//                           <td
//                             key={i}
//                             className={`px-4 py-2 ${
//                               col === "Availability"
//                                 ? row[col] === "In- stock"
//                                   ? "text-green-600"
//                                   : row[col] === "Out of stock"
//                                   ? "text-red-500"
//                                   : "text-yellow-600"
//                                 : ""
//                             }`}
//                           >
//                             {row[col]}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {activeTab !== "Overview" && (
//         <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500">
//           {activeTab} content coming soon...
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inventory;











import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import QuickEcommerce from "./QuickEcommerce";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [skuOptions, setSkuOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [viewMode, setViewMode] = useState("unit");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/inventory");
        const raw = res.data;
        setData(raw);
        setFilteredData(raw);

        const uniqueSKUs = [...new Set(raw.map((item) => item.SKU))].filter(Boolean);
        const uniqueMaterials = [...new Set(raw.map((item) => item["Material"]))].filter((m) => m && m !== "0");

        setSkuOptions(uniqueSKUs.map((s) => ({ label: s, value: s })));
        setMaterialOptions(uniqueMaterials.map((m) => ({ label: m, value: m })));
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...data];

    if (selectedSku.length) {
      const skuVals = selectedSku.map((s) => s.value);
      result = result.filter((item) => skuVals.includes(item.SKU));
    }

    if (selectedMaterials.length) {
      const matVals = selectedMaterials.map((m) => m.value);
      result = result.filter((item) => matVals.includes(item["Material"]));
    }

    setFilteredData(result);
  }, [selectedSku, selectedMaterials, data]);

  const handleDownload = () => {
    const columns = ["Channel", "SKU", "Box / Case", "Material", ...Object.keys(data[0] || {}).filter(key => !["Channel", "SKU", "Box / Case", "Material"].includes(key))];
    const csv = [
      columns.join(","),
      ...filteredData.map(row => {
        return columns.map(col => {
          if (viewMode === "cases" && !isNaN(row[col]) && col !== "Box / Case") {
            const boxVal = parseFloat(row["Box / Case"]);
            return boxVal && boxVal > 0 ? (parseFloat(row[col]) / boxVal).toFixed(2) : "0";
          } else {
            return row[col];
          }
        }).join(",");
      })
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[-:]/g, "")
      .replace("T", "_")
      .slice(0, 15); // e.g., 20250702_123000

    const filename = `inventory_${timestamp}_${viewMode}.csv`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const today = new Date().toLocaleDateString();
  const tabs = ["Overview", "Shipments", "Warehouse", "Amazon", "ZOHO", "Quick Commerce"];

  const channelKeys = Object.keys(data[0] || {}).filter(
    key => !["SKU", "Box / Case", "Material", "Channel"].includes(key)
  );

  const getAdjustedValue = (row, key) => {
    if (viewMode === "cases" && !isNaN(row[key])) {
      const boxVal = parseFloat(row["Box / Case"]);
      return boxVal && boxVal > 0 ? parseFloat(row[key]) / boxVal : 0;
    }
    return parseFloat(row[key]) || 0;
  };

  const totals = channelKeys.reduce((acc, key) => {
    acc[key] = filteredData.reduce((sum, item) => sum + getAdjustedValue(item, key), 0);
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Tabs + Toggle View */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold shadow-md text-sm ${
                activeTab === tab ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      { activeTab == "Overview" && ( <button
          onClick={() => setViewMode(viewMode === "unit" ? "cases" : "unit")}
          className="border px-4 py-2 rounded-md text-sm font-semibold w-full md:w-auto"
        >
          Switch to {viewMode === "unit" ? "Cases" : "Unit"} View
        </button>)}
      </div>
      
      {activeTab === "Overview" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channelKeys.map((key, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border rounded-md p-4 shadow text-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-700">{key}</span>
                </div>
                <div>
                  <span className="text-gray-700">Total: </span>
                  <span className="font-semibold text-blue-800">
                    {totals[key].toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-4">
              <h2 className="text-lg font-bold">
                Sellable Stock as of ({today}) in {viewMode === "unit" ? "Units" : "Cases"}
              </h2>
              <div className="flex flex-col md:flex-row flex-wrap gap-2 z-50">
                <div className="w-full sm:w-52">
                  <Select
                    isMulti
                    options={skuOptions}
                    value={selectedSku}
                    onChange={setSelectedSku}
                    placeholder="Filter SKU"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </div>
                <div className="w-full sm:w-52">
                  <Select
                    isMulti
                    options={materialOptions}
                    value={selectedMaterials}
                    onChange={setSelectedMaterials}
                    placeholder="Filter Material"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="border px-4 py-2 rounded-md text-sm font-semibold w-full sm:w-auto"
                >
                  Download all
                </button>
              </div>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="overflow-x-auto max-h-[500px] border rounded-md">
                <table className="w-full text-sm text-left min-w-[600px]">
                  <thead className="bg-gray-100 sticky top-0 z-[1]">
                    <tr>
                      {["Channel", "SKU", "Box / Case", "Material"]
                        .concat(
                          Object.keys(data[0] || {}).filter(
                            (k) => !["SKU", "Box / Case", "Material", "Channel"].includes(k)
                          )
                        )
                        .map((col, idx) => (
                          <th
                            key={idx}
                            className="px-4 py-2 font-semibold text-gray-600 whitespace-nowrap"
                          >
                            {col}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        {["Channel", "SKU", "Box / Case", "Material"]
                          .concat(
                            Object.keys(row).filter(
                              (k) => !["SKU", "Box / Case", "Material", "Channel"].includes(k)
                            )
                          )
                          .map((col, idx) => (
                            <td key={idx} className="px-4 py-2 whitespace-nowrap">
                              {viewMode === "cases" && !isNaN(row[col]) && col !== "Box / Case"
                                ? (() => {
                                    const box = parseFloat(row["Box / Case"]);
                                    return box && box > 0
                                      ? (parseFloat(row[col]) / box).toFixed(2)
                                      : "0";
                                  })()
                                : row[col]}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
      

      {activeTab === "Quick Commerce" && (
        <QuickEcommerce />
      )}

      {activeTab !== "Overview" && activeTab !== "Quick Commerce" && (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500">
          {activeTab} content coming soon...
        </div>
      )}
    </div>
  );
};

export default Inventory;
