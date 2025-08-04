// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quick-commerce-executive");
//         const channelData = response.data.filter(item => item.Channel === channelName);
//         setData(channelData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [channelName]);
  

//   // Calculate all required metrics
//   const calculateMetrics = () => {
//     if (data.length === 0) return {};
    
//     // Sales (sum of PO Sales)
//     const sales = data.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
    
//     // Revenue (sum of Received_Revenue)
//     const revenue = data.reduce((sum, item) => sum + parseFloat(item["Received_Revenue"] || 0), 0);
    
//     // Lost Revenue (sum of Unshipped_Revenue)
//     const lostRevenue = data.reduce((sum, item) => sum + parseFloat(item["Unshipped_Revenue"] || 0), 0);
    
//     // Fulfillment Rate (average of fulfillment_rate)
//     const fulfillmentRate = data.reduce((sum, item) => sum + parseFloat(item["fulfillment_rate"] || 0), 0) / data.length;
    
//     // Total PO Received (unique count of PO Number)
//     const uniquePOs = [...new Set(data.map(item => item["PO Number"]))];
//     const totalPOReceived = uniquePOs.length;
    
//     // PO Fulfilled (count of unique POs with status "Fulfilled")
//     const fulfilledPOs = [...new Set(
//       data.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
//     )];
//     const poFulfilled = fulfilledPOs.length;
    
//     // PO Pending (Total PO Received - PO Fulfilled)
//     const poPending = totalPOReceived - poFulfilled;
    
//     return {
//       sales: Math.round(sales),
//       revenue: Math.round(revenue),
//       lostRevenue: Math.round(lostRevenue),
//       fulfillmentRate: (fulfillmentRate * 100).toFixed(2),
//       totalPOReceived,
//       poFulfilled,
//       poPending,
//     };
//   };

//   const metrics = calculateMetrics();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">{channelName}</h1>
      
//       {/* Sales Overview */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//         <div className="grid grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.sales || 0}</div>
//             <div className="text-gray-500">Sales</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.revenue || 0}</div>
//             <div className="text-gray-500">Revenue</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.lostRevenue || 0}</div>
//             <div className="text-gray-500">Lost Revenue</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.fulfillmentRate || 0}</div>
//             <div className="text-gray-500">Fulfillment Rate</div>
//           </div>
//         </div>
//       </div>
      
//       {/* P0 Summary */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">P0 Summary</h2>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.totalPOReceived || 0}</div>
//             <div className="text-gray-500">Total PO Received</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.poFulfilled || 0}</div>
//             <div className="text-gray-500">PO Fulfilled</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.poPending || 0}</div>
//             <div className="text-gray-500">PO Pending</div>
//           </div>
//         </div>
//       </div>
      
//       {/* Sale vs Revenue */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">Sale vs Revenue</h2>
//         <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
//           <div className="text-center text-gray-400">
//             <div>Palm</div>
//             <div>Degasse</div>
//             <div>Mar</div>
//             <div>Apr</div>
//             <div>May</div>
//             <div>Jun</div>
//             <div>Aug</div>
//             <div>May</div>
//             <div>Jun</div>
//           </div>
//         </div>
//       </div>
      
//       {/* Lost Revenue */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">Lost Revenue</h2>
//         <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
//           <div className="text-center text-gray-400">
//             <div>Palm</div>
//             <div>Degasse</div>
//             <div>Mar</div>
//             <div>Apr</div>
//             <div>May</div>
//             <div>Jun</div>
//             <div>Aug</div>
//             <div>May</div>
//             <div>Jun</div>
//           </div>
//         </div>
//       </div>
      
//       {/* Top Selling SKU's */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-lg font-semibold mb-4">Top Selling SKU's</h2>
//         <div className="flex">
//           <div className="w-1/4 pr-4">
//             <div className="font-medium mb-2">SKU</div>
//             <div className="text-gray-400">Jan</div>
//             <div className="text-gray-400">Feb</div>
//             <div className="text-gray-400">Mar</div>
//             <div className="text-gray-400">Apr</div>
//             <div className="text-gray-400">May</div>
//           </div>
//           <div className="w-3/4">
//             <div className="font-medium mb-2">Order Summary</div>
//             <div className="text-gray-400">Ordered</div>
//             <div className="text-gray-400">Delivered</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;



// // src/pages/ChannelDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import TabsNavigation from "../components/TabsNavigation";
// import SaleVsRevenue from "../components/SalesRevenueCharts";
// import POSalesVsUnshippedRevenue from "../components/POSalesVsUnshippedRevenue";
// import TopSellingSKUs from "../components/TopSellingSKUs";
// import OrderSummaryChart from "../components/OrderSummaryChart";
// import AllPOsTable from "../components/AllPOsTable";
// import FilterSidebar from "../components/FilterSidebar";

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const navigate = useNavigate();
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("executive");
  
//   // Filter state
//   const [filters, setFilters] = useState({
//     year: "",
//     month: "",
//     poNumber: "",
//     sku: "",
//     poStatus: "",
//   });

//   // Fetch data only once
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/quick-commerce");
//         const channelData = response.data.filter(item => item.Channel === channelName);
//         setAllData(channelData);
//         setFilteredData(channelData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [channelName]);

//   // Apply filters when filter state changes
//   useEffect(() => {
//     if (!allData.length) return;
    
//     let result = [...allData];
    
//     if (filters.year) {
//       result = result.filter(item => {
//         const dateParts = item['PO Creation Date']?.split('-');
//         return dateParts && dateParts[2] === filters.year;
//       });
//     }
    
//     if (filters.month) {
//       result = result.filter(item => {
//         const dateParts = item['PO Creation Date']?.split('-');
//         return dateParts && dateParts[1] === filters.month;
//       });
//     }
    
//     if (filters.poNumber) {
//       result = result.filter(item => 
//         item['PO Number']?.toLowerCase().includes(filters.poNumber.toLowerCase())
//       );
//     }
    
//     if (filters.sku) {
//       result = result.filter(item => 
//         item.SKU?.toLowerCase() === filters.sku.toLowerCase()
//       );
//     }
    
//     if (filters.poStatus) {
//       result = result.filter(item => 
//         item['PO Status']?.toLowerCase() === filters.poStatus.toLowerCase()
//       );
//     }
    
//     setFilteredData(result);
//   }, [filters, allData]);

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//     if (tabId === "channelPerformance") {
//       navigate("/quick-commerce/channel-performance");
//     }
//   };

//   // Calculate metrics using filteredData
//   const calculateMetrics = () => {
//     if (filteredData.length === 0) {
//       return {
//         sales: 0,
//         revenue: 0,
//         lostRevenue: 0,
//         fulfillmentRate: 0,
//         totalPOReceived: 0,
//         poFulfilled: 0,
//         poPending: 0
//       };
//     }
    
//     const sales = filteredData.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
//     const revenue = filteredData.reduce((sum, item) => sum + parseFloat(item["Revenue"] || 0), 0);
//     const lostRevenue = filteredData.reduce((sum, item) => sum + parseFloat(item["Revenue Lost"] || 0), 0);
//     const fulfillmentRate = filteredData.reduce((sum, item) => sum + parseFloat(item["Avg. Fulfillment Rate (%)"] || 0), 0) / filteredData.length;
    
//     const uniquePOs = [...new Set(filteredData.map(item => item["PO Number"]))];
//     const totalPOReceived = uniquePOs.length;
    
//     const fulfilledPOs = [...new Set(
//       filteredData.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
//     )];
//     const poFulfilled = fulfilledPOs.length;
    
//     const poPending = totalPOReceived - poFulfilled;
    
//     return {
//       sales: Math.round(sales),
//       revenue: Math.round(revenue),
//       lostRevenue: Math.round(lostRevenue),
//       fulfillmentRate: fulfillmentRate.toFixed(2),
//       totalPOReceived,
//       poFulfilled,
//       poPending,
//     };
//   };

//   const metrics = calculateMetrics();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4 bg-[#D4EAD9] min-h-screen">
//       <div className="mx-auto">
//         <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />
//         <div className="flex items-center">
//           <button 
//             onClick={() => navigate('/quick-commerce/channel-performance')}
//             className="mr-4 px-4 py-2 text-xl font-semibold"
//           >
//             ←  {channelName}
//           </button>
//         </div>
        
//         <div className="flex gap-4">
//           {/* Left Content (Scrollable) */}
//           <div className="flex-1 overflow-auto">
//             <div className="flex justify-between gap-5">
//               {/* Sales Overview */}
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div className="bg-blue-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">₹{metrics.sales?.toLocaleString('en-IN') || 0}</div>
//                     <div className="text-gray-600">Total Sales</div>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">₹{metrics.revenue?.toLocaleString('en-IN') || 0}</div>
//                     <div className="text-gray-600">Revenue</div>
//                   </div>
//                   <div className="bg-red-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">₹{metrics.lostRevenue?.toLocaleString('en-IN') || 0}</div>
//                     <div className="text-gray-600">Lost Revenue</div>
//                   </div>
//                   <div className="bg-purple-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">{metrics.fulfillmentRate || 0}%</div>
//                     <div className="text-gray-600">Fulfillment Rate</div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* PO Summary */}
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-4">PO Summary</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-yellow-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">{metrics.totalPOReceived || 0}</div>
//                     <div className="text-gray-600">Total PO Received</div>
//                   </div>
//                   <div className="bg-teal-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">{metrics.poFulfilled || 0}</div>
//                     <div className="text-gray-600">PO Fulfilled</div>
//                   </div>
//                   <div className="bg-orange-50 p-4 rounded-lg text-center">
//                     <div className="text-xl font-bold">{metrics.poPending || 0}</div>
//                     <div className="text-gray-600">PO Pending</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-row gap-4">
//               <SaleVsRevenue data={filteredData} />
//               <POSalesVsUnshippedRevenue data={filteredData} />
//             </div>
            
//             <div className="flex flex-row gap-4">
//               <TopSellingSKUs data={filteredData} />
//               <OrderSummaryChart data={filteredData} />
//             </div>
            
//             <AllPOsTable data={filteredData} />
//           </div>
          
//           {/* Right Filters (Fixed) */}
//           <FilterSidebar 
//             filters={filters} 
//             setFilters={setFilters}
//             data={allData}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;


import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TabsNavigation from "../components/TabsNavigation";
import SaleVsRevenue from "../components/SalesRevenueCharts";
import POSalesVsUnshippedRevenue from "../components/POSalesVsUnshippedRevenue";
import TopSellingSKUs from "../components/TopSellingSKUs";
import OrderSummaryChart from "../components/OrderSummaryChart";
import AllPOsTable from "../components/AllPOsTable";
import FilterSidebar from "../components/FilterSidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChannelDashboard = () => {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("executive");
  
  // Filter state
  const [filters, setFilters] = useState({
    year: '',
    poNumber: '',
    month: '',
    sku: '',
    poStatus: ''
  });

  // Extract available filter options
  const filterOptions = useMemo(() => {
    if (allData.length === 0) return {};
    
    // Extract unique values for each filter
    const years = [...new Set(allData.map(item => {
      if (!item['PO Creation Date']) return null;
      const dateParts = item['PO Creation Date'].split('-');
      return dateParts[2]; // Year part
    }).filter(Boolean))];
    
    const poNumbers = [...new Set(allData.map(item => item['PO Number']))].filter(Boolean);
    const months = [...new Set(allData.map(item => {
      if (!item['PO Creation Date']) return null;
      const dateParts = item['PO Creation Date'].split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[parseInt(dateParts[1]) - 1];
    }).filter(Boolean))];
    
    const skus = [...new Set(allData.map(item => item.SKU))].filter(Boolean);
    const poStatuses = [...new Set(allData.map(item => item['PO Status']))].filter(Boolean);
    
    return {
      years: years.sort(),
      poNumbers,
      months,
      skus,
      poStatuses
    };
  }, [allData]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/quick-commerce");
        const channelData = response.data.filter(item => item.Channel === channelName);
        setAllData(channelData);
        setFilteredData(channelData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [channelName]);

  // Apply filters when they change
  useEffect(() => {
    if (allData.length === 0) return;
    
    let result = [...allData];
    
    // Apply each filter
    if (filters.year) {
      result = result.filter(item => {
        if (!item['PO Creation Date']) return false;
        const dateParts = item['PO Creation Date'].split('-');
        return dateParts[2] === filters.year;
      });
    }
    if (filters.poNumber) {
      result = result.filter(item => item['PO Number'] === filters.poNumber);
    }
    if (filters.month) {
      result = result.filter(item => {
        if (!item['PO Creation Date']) return false;
        const dateParts = item['PO Creation Date'].split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[parseInt(dateParts[1]) - 1] === filters.month;
      });
    }
    if (filters.sku) {
      result = result.filter(item => item.SKU === filters.sku);
    }
    if (filters.poStatus) {
      result = result.filter(item => item['PO Status'] === filters.poStatus);
    }
    
    setFilteredData(result);
  }, [filters, allData]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "channelPerformance") {
      navigate("/quick-commerce/channel-performance");
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      year: '',
      poNumber: '',
      month: '',
      sku: '',
      poStatus: ''
    });
  };

  // Calculate metrics based on filtered data
  const metrics = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        sales: 832,
        revenue: 18300,
        lostRevenue: 868,
        fulfillmentRate: 17432,
        totalPOReceived: 868,
        poFulfilled: 850,
        poPending: 18
      };
    }
    
    const sales = filteredData.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
    const revenue = filteredData.reduce((sum, item) => sum + parseFloat(item["Revenue"] || 0), 0);
    const lostRevenue = filteredData.reduce((sum, item) => sum + parseFloat(item["Revenue Lost"] || 0), 0);
    const fulfillmentRate = filteredData.reduce((sum, item) => sum + parseFloat(item["Avg. Fulfillment Rate (%)"] || 0), 0) / filteredData.length;
    
    const uniquePOs = [...new Set(filteredData.map(item => item["PO Number"]))];
    const totalPOReceived = uniquePOs.length;
    
    const fulfilledPOs = [...new Set(
      filteredData.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
    )];
    const poFulfilled = fulfilledPOs.length;
    
    const poPending = totalPOReceived - poFulfilled;
    
    return {
      sales: Math.round(sales),
      revenue: Math.round(revenue),
      lostRevenue: Math.round(lostRevenue),
      fulfillmentRate: fulfillmentRate.toFixed(2),
      totalPOReceived,
      poFulfilled,
      poPending,
    };
  }, [filteredData]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 bg-[#D4EAD9] min-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Content (Left Side - Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto">
            <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/quick-commerce/channel-performance')}
                className="mr-4 px-4 py-2 text-xl font-semibold"
              >
                ←  {channelName}
              </button>
            </div>
            
            {/* Dashboard Content */}
            <>
              <div className="flex justify-between gap-5">
                {/* Sales Overview */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">₹{metrics.sales?.toLocaleString('en-IN') || 0}</div>
                      <div className="text-gray-600">Total Sales</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">₹{metrics.revenue?.toLocaleString('en-IN') || 0}</div>
                      <div className="text-gray-600">Revenue</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">₹{metrics.lostRevenue?.toLocaleString('en-IN') || 0}</div>
                      <div className="text-gray-600">Lost Revenue</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">{metrics.fulfillmentRate || 0}%</div>
                      <div className="text-gray-600">Fulfillment Rate</div>
                    </div>
                  </div>
                </div>
                
                {/* PO Summary */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">PO Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">{metrics.totalPOReceived || 0}</div>
                      <div className="text-gray-600">Total PO Received</div>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">{metrics.poFulfilled || 0}</div>
                      <div className="text-gray-600">PO Fulfilled</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">{metrics.poPending || 0}</div>
                      <div className="text-gray-600">PO Pending</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row gap-4">
                <SaleVsRevenue data={filteredData} />
                <POSalesVsUnshippedRevenue data={filteredData} />
              </div>
              
              <div className="flex flex-row gap-4">
                <TopSellingSKUs data={filteredData} />
                <OrderSummaryChart data={filteredData} />
              </div>
              
              <AllPOsTable data={filteredData} />
            </>
          </div>
        </div>
        
        {/* Filters Sidebar (Right Side - Fixed) */}
        <div className="w-full md:w-80 sticky top-4 self-start">
          <FilterSidebar 
            options={filterOptions} 
            currentFilters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;