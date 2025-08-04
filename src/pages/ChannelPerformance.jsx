// import React from "react";
// import Blinkit from "../assets/img/blinkit.svg";
// import Zepto from "../assets/img/zepto.svg";
// import Flipkart from "../assets/img/flipkartlogo.svg";

// const Channels = () => {
//   const logos = [
//     {
//       name: "Blinkit",
//       bgColor: "bg-yellow-400",
//       img: Blinkit,
//     },
//     {
//       name: "Zepto",
//       bgColor: "bg-[#3b006a]",
//       img: Zepto,
//     },
//     {
//       name: "Flipkart",
//       bgColor: "bg-white",
//       img: Flipkart,
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col  gap-8 p-4">
//       {logos.map((logo, index) => (
//         <div
//           key={index}
//           className={`w-80 h-32 py-10 flex items-center justify-center ${logo.bgColor} rounded shadow-md`}
//         >
//           <img src={logo.img} alt={logo.name} className="h-24 object-contain" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Channels;





// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import BlinkitLogo from "../assets/img/blinkit.svg";
// import ZeptoLogo from "../assets/img/zepto.svg";
// import FlipkartLogo from "../assets/img/flipkartlogo.svg";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const channelLogos = {
//     Blinkit: BlinkitLogo,
//     Zepto: ZeptoLogo,
//     Flipkart: FlipkartLogo,
//   };

//   const channelColors = {
//     Blinkit: "bg-yellow-400",
//     Zepto: "bg-[#3b006a]",
//     Flipkart: "bg-white",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quick-commerce-executive");
//         // Filter data for the current channel
//         const channelData = response.data.filter(item => item.Channel === channelName);
//         setData(channelData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [channelName]);

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

//   // Calculate metrics
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

//   // Prepare data for charts (example - you might need to group by month)
//   const prepareChartData = () => {
//     // This is a simplified example - you should group by month based on PO Creation Date
//     const monthlyData = {};
    
//     data.forEach(item => {
//       const date = new Date(item["PO Creation Date"]);
//       const month = date.toLocaleString('default', { month: 'short' });
      
//       if (!monthlyData[month]) {
//         monthlyData[month] = {
//           name: month,
//           sales: 0,
//           revenue: 0,
//           lostRevenue: 0,
//         };
//       }
      
//       monthlyData[month].sales += parseFloat(item["PO Sales"] || 0);
//       monthlyData[month].revenue += parseFloat(item["Received_Revenue"] || 0);
//       monthlyData[month].lostRevenue += parseFloat(item["Unshipped_Revenue"] || 0);
//     });
    
//     return Object.values(monthlyData);
//   };

//   const chartData = prepareChartData();

//   // Get top selling SKUs
//   const getTopSellingSKUs = () => {
//     const skuMap = {};
    
//     data.forEach(item => {
//       if (!skuMap[item.SKU]) {
//         skuMap[item.SKU] = {
//           sku: item.SKU,
//           ordered: 0,
//           delivered: 0,
//         };
//       }
      
//       skuMap[item.SKU].ordered += parseInt(item["PO QTY"] || 0);
//       skuMap[item.SKU].delivered += parseInt(item["Received QTY"] || 0);
//     });
    
//     return Object.values(skuMap)
//       .sort((a, b) => b.ordered - a.ordered)
//       .slice(0, 5); // Top 5 SKUs
//   };

//   const topSKUs = getTopSellingSKUs();

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className={`flex items-center p-4 ${channelColors[channelName]} rounded-lg shadow mb-6`}>
//           <img 
//             src={channelLogos[channelName]} 
//             alt={channelName} 
//             className="h-16 object-contain mr-4" 
//           />
//           <h1 className="text-3xl font-bold text-gray-800">{channelName} Dashboard</h1>
//         </div>
        
//         {/* Sales Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">Sales</h3>
//             <p className="text-2xl font-bold">{metrics.sales}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
//             <p className="text-2xl font-bold">₹{metrics.revenue}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">Lost Revenue</h3>
//             <p className="text-2xl font-bold">₹{metrics.lostRevenue}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">Fulfillment Rate</h3>
//             <p className="text-2xl font-bold">{metrics.fulfillmentRate}%</p>
//           </div>
//         </div>
        
//         {/* P0 Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">Total PO Received</h3>
//             <p className="text-2xl font-bold">{metrics.totalPOReceived}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">PO Fulfilled</h3>
//             <p className="text-2xl font-bold">{metrics.poFulfilled}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-700">PO Pending</h3>
//             <p className="text-2xl font-bold">{metrics.poPending}</p>
//           </div>
//         </div>
        
//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Sales vs Revenue Chart */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Sales vs Revenue</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="sales" fill="#8884d8" name="Sales" />
//                   <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
          
//           {/* Lost Revenue Chart */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Lost Revenue</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="lostRevenue" fill="#ff6b6b" name="Lost Revenue" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
        
//         {/* Top Selling SKUs */}
//         <div className="bg-white p-4 rounded-lg shadow mb-6">
//           <h3 className="text-lg font-semibold mb-4">Top Selling SKUs</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {topSKUs.map((sku, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sku.sku}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sku.ordered}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sku.delivered}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;



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

//   if (loading) return <div className="p-4">Loading...</div>;

//   // Calculate metrics
//   const calculateMetrics = () => {
//     if (data.length === 0) {
//       return {
//         sales: 832,
//         revenue: 18300,
//         lostRevenue: 868,
//         fulfillmentRate: 17432,
//         totalPOReceived: 868,
//         poFulfilled: 850,
//         poPending: 18
//       };
//     }
    
//     const sales = data.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
//     const revenue = data.reduce((sum, item) => sum + parseFloat(item["Received_Revenue"] || 0), 0);
//     const lostRevenue = data.reduce((sum, item) => sum + parseFloat(item["Unshipped_Revenue"] || 0), 0);
//     const fulfillmentRate = (data.reduce((sum, item) => sum + parseFloat(item["fulfillment_rate"] || 0), 0) / data.length) * 100;
    
//     const uniquePOs = [...new Set(data.map(item => item["PO Number"]))];
//     const totalPOReceived = uniquePOs.length;
    
//     const fulfilledPOs = [...new Set(
//       data.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
//     )];
//     const poFulfilled = fulfilledPOs.length;
//     const poPending = totalPOReceived - poFulfilled;
    
//     return {
//       sales: Math.round(sales),
//       revenue: Math.round(revenue),
//       lostRevenue: Math.round(lostRevenue),
//       fulfillmentRate: Math.round(fulfillmentRate),
//       totalPOReceived,
//       poFulfilled,
//       poPending,
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">{channelName}</h1>
      
//       {/* Sales Overview */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//         <div className="grid grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.sales}</div>
//             <div className="text-gray-500">Sales</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.revenue}</div>
//             <div className="text-gray-500">Revenue</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.lostRevenue}</div>
//             <div className="text-gray-500">Lost Revenue</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.fulfillmentRate}</div>
//             <div className="text-gray-500">Fulfillment Rate</div>
//           </div>
//         </div>
//       </div>
      
//       {/* P0 Summary */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">P0 Summary</h2>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.totalPOReceived}</div>
//             <div className="text-gray-500">Total PO Received</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.poFulfilled}</div>
//             <div className="text-gray-500">PO Fulfilled</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">{metrics.poPending}</div>
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



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("monthly");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/quick-commerce");
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
//     const revenue = data.reduce((sum, item) => sum + parseFloat(item["Revenue"] || 0), 0);
    
//     // Lost Revenue (sum of Revenue Lost)
//     const lostRevenue = data.reduce((sum, item) => sum + parseFloat(item["Revenue Lost"] || 0), 0);
    
//     // Fulfillment Rate (average of fulfillment_rate)
//     const fulfillmentRate = data.reduce((sum, item) => sum + parseFloat(item["Avg. Fulfillment Rate (%)"] || 0), 0) / data.length;
    
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
//       fulfillmentRate: fulfillmentRate.toFixed(2),
//       totalPOReceived,
//       poFulfilled,
//       poPending,
//     };
//   };

//   const prepareChartData = () => {
//     const monthlyData = {};
    
//     data.forEach(item => {
//       const month = item["Year-Month"];
//       if (!monthlyData[month]) {
//         monthlyData[month] = {
//           sales: 0,
//           revenue: 0,
//           lostRevenue: 0
//         };
//       }
      
//       monthlyData[month].sales += parseFloat(item["PO Sales"] || 0);
//       monthlyData[month].revenue += parseFloat(item["Revenue"] || 0);
//       monthlyData[month].lostRevenue += parseFloat(item["Revenue Lost"] || 0);
//     });
    
//     const sortedMonths = Object.keys(monthlyData).sort();
//     const monthLabels = sortedMonths.map(month => {
//       const [year, monthNum] = month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return `${monthNames[parseInt(monthNum) - 1]} ${year.slice(2)}`;
//     });
    
//     return {
//       labels: monthLabels,
//       salesData: sortedMonths.map(month => monthlyData[month].sales),
//       revenueData: sortedMonths.map(month => monthlyData[month].revenue),
//       lostRevenueData: sortedMonths.map(month => monthlyData[month].lostRevenue)
//     };
//   };

//   const getTopSKUs = () => {
//     const skuMap = {};
    
//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;
      
//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           revenue: 0,
//           poQty: 0,
//           fulfilledQty: 0
//         };
//       }
      
//       skuMap[sku].revenue += parseFloat(item["Revenue"] || 0);
//       skuMap[sku].poQty += parseFloat(item["PO Qty"] || 0);
//       skuMap[sku].fulfilledQty += parseFloat(item["Fulfilled PO Qty"] || 0);
//     });
    
//     return Object.entries(skuMap)
//       .sort((a, b) => b[1].revenue - a[1].revenue)
//       .slice(0, 5)
//       .map(([sku, data]) => ({
//         sku,
//         revenue: Math.round(data.revenue),
//         poQty: Math.round(data.poQty),
//         fulfilledQty: Math.round(data.fulfilledQty),
//         fulfillmentRate: data.poQty 
//           ? Math.round((data.fulfilledQty / data.poQty) * 100)
//           : 0
//       }));
//   };

//   const metrics = calculateMetrics();
//   const chartData = prepareChartData();
//   const topSKUs = getTopSKUs();

//   const salesVsRevenueChart = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Sales',
//         data: chartData.salesData,
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         borderColor: 'rgb(53, 162, 235)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Revenue',
//         data: chartData.revenueData,
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         borderColor: 'rgb(75, 192, 192)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const lostRevenueChart = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Lost Revenue',
//         data: chartData.lostRevenueData,
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         borderColor: 'rgb(255, 99, 132)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `₹${context.raw.toLocaleString('en-IN')}`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function(value) {
//             return '₹' + value.toLocaleString('en-IN');
//           }
//         }
//       }
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4 bg-[#D4EAD9] min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center mb-6">
//           <button 
//             onClick={() => navigate('/quick-commerce/channel-performance')}
//             className="mr-4 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100"
//           >
//             ← Back to Channels
//           </button>
//           <h1 className="text-2xl font-bold">{channelName} Dashboard</h1>
//         </div>
        
//         {/* Time Range Selector */}
//         <div className="flex justify-end mb-6">
//           <div className="bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200">
//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="focus:outline-none"
//             >
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="quarterly">Quarterly</option>
//             </select>
//           </div>
//         </div>
        
//         {/* Sales Overview */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">₹{metrics.sales?.toLocaleString('en-IN') || 0}</div>
//               <div className="text-gray-600">Total Sales</div>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">₹{metrics.revenue?.toLocaleString('en-IN') || 0}</div>
//               <div className="text-gray-600">Revenue</div>
//             </div>
//             <div className="bg-red-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">₹{metrics.lostRevenue?.toLocaleString('en-IN') || 0}</div>
//               <div className="text-gray-600">Lost Revenue</div>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">{metrics.fulfillmentRate || 0}%</div>
//               <div className="text-gray-600">Fulfillment Rate</div>
//             </div>
//           </div>
//         </div>
        
//         {/* PO Summary */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">PO Summary</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-yellow-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">{metrics.totalPOReceived || 0}</div>
//               <div className="text-gray-600">Total PO Received</div>
//             </div>
//             <div className="bg-teal-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">{metrics.poFulfilled || 0}</div>
//               <div className="text-gray-600">PO Fulfilled</div>
//             </div>
//             <div className="bg-orange-50 p-4 rounded-lg text-center">
//               <div className="text-3xl font-bold">{metrics.poPending || 0}</div>
//               <div className="text-gray-600">PO Pending</div>
//             </div>
//           </div>
//         </div>
        
//         {/* Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Sales vs Revenue</h2>
//             <div className="h-80">
//               <Bar data={salesVsRevenueChart} options={chartOptions} />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Lost Revenue</h2>
//             <div className="h-80">
//               <Bar data={lostRevenueChart} options={chartOptions} />
//             </div>
//           </div>
//         </div>
        
//         {/* Top Selling SKUs */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Top Selling SKUs</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfilled Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment Rate</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {topSKUs.map((sku, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sku.sku}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{sku.revenue.toLocaleString('en-IN')}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sku.poQty.toLocaleString('en-IN')}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sku.fulfilledQty.toLocaleString('en-IN')}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sku.fulfillmentRate}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import TabsNavigation from "../components/TabsNavigation";
// import SalesRevenueCharts from "../components/SalesRevenueCharts";
// import BasicBarChart from "../components/BasicBarChart";
// import SaleVsRevenue from "../components/SalesRevenueCharts";
// import POSalesVsUnshippedRevenue from "../components/POSalesVsUnshippedRevenue";
// import TopSellingSKUs from "../components/TopSellingSKUs";
// import OrderSummaryChart from "../components/OrderSummaryChart";
// import AllPOsTable from "../components/AllPOsTable";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [activeTab, setActiveTab] = useState("executive");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/quick-commerce");
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

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//     if (tabId === "channelPerformance") {
//       navigate("/quick-commerce/channel-performance");
//     }
//   };

//   // Calculate all required metrics
//   const calculateMetrics = () => {
//     if (data.length === 0) {
//       return {
//         sales: 832,
//         revenue: 18300,
//         lostRevenue: 868,
//         fulfillmentRate: 17432,
//         totalPOReceived: 868,
//         poFulfilled: 850,
//         poPending: 18
//       };
//     }
    
//     const sales = data.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
//     const revenue = data.reduce((sum, item) => sum + parseFloat(item["Revenue"] || 0), 0);
//     const lostRevenue = data.reduce((sum, item) => sum + parseFloat(item["Revenue Lost"] || 0), 0);
//     const fulfillmentRate = data.reduce((sum, item) => sum + parseFloat(item["Avg. Fulfillment Rate (%)"] || 0), 0) / data.length;
    
//     const uniquePOs = [...new Set(data.map(item => item["PO Number"]))];
//     const totalPOReceived = uniquePOs.length;
    
//     const fulfilledPOs = [...new Set(
//       data.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
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

//   const prepareChartData = () => {
//     const monthlyData = {};
    
//     data.forEach(item => {
//       const month = item["Year-Month"];
//       if (!monthlyData[month]) {
//         monthlyData[month] = {
//           sales: 0,
//           revenue: 0,
//           lostRevenue: 0
//         };
//       }
      
//       monthlyData[month].sales += parseFloat(item["PO Sales"] || 0);
//       monthlyData[month].revenue += parseFloat(item["Revenue"] || 0);
//       monthlyData[month].lostRevenue += parseFloat(item["Revenue Lost"] || 0);
//     });
    
//     const sortedMonths = Object.keys(monthlyData).sort();
//     const monthLabels = sortedMonths.map(month => {
//       const [year, monthNum] = month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return `${monthNames[parseInt(monthNum) - 1]} ${year.slice(2)}`;
//     });
    
//     return {
//       labels: monthLabels,
//       salesData: sortedMonths.map(month => monthlyData[month].sales),
//       revenueData: sortedMonths.map(month => monthlyData[month].revenue),
//       lostRevenueData: sortedMonths.map(month => monthlyData[month].lostRevenue)
//     };
//   };

//   const getTopSKUs = () => {
//     const skuMap = {};
    
//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;
      
//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           revenue: 0,
//           poQty: 0,
//           fulfilledQty: 0
//         };
//       }
      
//       skuMap[sku].revenue += parseFloat(item["Revenue"] || 0);
//       skuMap[sku].poQty += parseFloat(item["PO Qty"] || 0);
//       skuMap[sku].fulfilledQty += parseFloat(item["Fulfilled PO Qty"] || 0);
//     });
    
//     return Object.entries(skuMap)
//       .sort((a, b) => b[1].revenue - a[1].revenue)
//       .slice(0, 5)
//       .map(([sku, data]) => ({
//         sku,
//         revenue: Math.round(data.revenue),
//         poQty: Math.round(data.poQty),
//         fulfilledQty: Math.round(data.fulfilledQty),
//         fulfillmentRate: data.poQty 
//           ? Math.round((data.fulfilledQty / data.poQty) * 100)
//           : 0
//       }));
//   };

//   const metrics = calculateMetrics();
//   const chartData = prepareChartData();
//   const topSKUs = getTopSKUs();

//   const salesVsRevenueChart = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Sales',
//         data: chartData.salesData,
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         borderColor: 'rgb(53, 162, 235)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Revenue',
//         data: chartData.revenueData,
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         borderColor: 'rgb(75, 192, 192)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const lostRevenueChart = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Lost Revenue',
//         data: chartData.lostRevenueData,
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         borderColor: 'rgb(255, 99, 132)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `₹${context.raw.toLocaleString('en-IN')}`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function(value) {
//             return '₹' + value.toLocaleString('en-IN');
//           }
//         }
//       }
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4 bg-[#D4EAD9] min-h-screen">
//       <div className=" mx-auto">
//          <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />
//         <div className="flex items-center">
//           <button 
//             onClick={() => navigate('/quick-commerce/channel-performance')}
//             className="mr-4 px-4 py-2 text-xl font-semibold"
//           >
//             ←  {channelName}
//           </button>
//           {/* <h1 className="text-2xl font-bold">{channelName} Dashboard</h1> */}
//         </div>
//           <>
//           <div className="flex justify-between gap-5">
//               {/* Sales Overview */}
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="bg-blue-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">₹{metrics.sales?.toLocaleString('en-IN') || 0}</div>
//                   <div className="text-gray-600">Total Sales</div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">₹{metrics.revenue?.toLocaleString('en-IN') || 0}</div>
//                   <div className="text-gray-600">Revenue</div>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">₹{metrics.lostRevenue?.toLocaleString('en-IN') || 0}</div>
//                   <div className="text-gray-600">Lost Revenue</div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">{metrics.fulfillmentRate || 0}%</div>
//                   <div className="text-gray-600">Fulfillment Rate</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* PO Summary */}
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <h2 className="text-xl font-semibold mb-4">PO Summary</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-yellow-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">{metrics.totalPOReceived || 0}</div>
//                   <div className="text-gray-600">Total PO Received</div>
//                 </div>
//                 <div className="bg-teal-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">{metrics.poFulfilled || 0}</div>
//                   <div className="text-gray-600">PO Fulfilled</div>
//                 </div>
//                 <div className="bg-orange-50 p-4 rounded-lg text-center">
//                   <div className="text-xl font-bold">{metrics.poPending || 0}</div>
//                   <div className="text-gray-600">PO Pending</div>
//                 </div>
//               </div>
//             </div>
            
//           </div>
//            <div className="flex flex-row gap-4">
//         <SaleVsRevenue />
//         <POSalesVsUnshippedRevenue />
//       </div>
//            <div className="flex flex-row gap-4">
//         <TopSellingSKUs />
//         <OrderSummaryChart />
//       </div>
//       <AllPOsTable />
     
//           </>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;



// // ChannelDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import TabsNavigation from "../components/TabsNavigation";
// import SalesRevenueCharts from "../components/SalesRevenueCharts";
// import BasicBarChart from "../components/BasicBarChart";
// import SaleVsRevenue from "../components/SalesRevenueCharts";
// import POSalesVsUnshippedRevenue from "../components/POSalesVsUnshippedRevenue";
// import TopSellingSKUs from "../components/TopSellingSKUs";
// import OrderSummaryChart from "../components/OrderSummaryChart";
// import AllPOsTable from "../components/AllPOsTable";
// import FilterSidebar from "../components/FilterSidebar"; // New component

// const ChannelDashboard = () => {
//   const { channelName } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
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
//         setData(channelData);
//         setFilteredData(channelData); // Initialize filteredData with all data
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
//     let result = [...data];
    
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
//         item.SKU?.toLowerCase().includes(filters.sku.toLowerCase())
//       );
//     }
    
//     if (filters.poStatus) {
//       result = result.filter(item => 
//         item['PO Status']?.toLowerCase() === filters.poStatus.toLowerCase()
//       );
//     }
    
//     setFilteredData(result);
//   }, [filters, data]);

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
//         sales: 832,
//         revenue: 18300,
//         lostRevenue: 868,
//         fulfillmentRate: 17432,
//         totalPOReceived: 868,
//         poFulfilled: 850,
//         poPending: 18
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

//   // Prepare chart data using filteredData
//   const prepareChartData = () => {
//     const monthlyData = {};
    
//     filteredData.forEach(item => {
//       const month = item["Year-Month"];
//       if (!monthlyData[month]) {
//         monthlyData[month] = {
//           sales: 0,
//           revenue: 0,
//           lostRevenue: 0
//         };
//       }
      
//       monthlyData[month].sales += parseFloat(item["PO Sales"] || 0);
//       monthlyData[month].revenue += parseFloat(item["Revenue"] || 0);
//       monthlyData[month].lostRevenue += parseFloat(item["Revenue Lost"] || 0);
//     });
    
//     const sortedMonths = Object.keys(monthlyData).sort();
//     const monthLabels = sortedMonths.map(month => {
//       const [year, monthNum] = month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return `${monthNames[parseInt(monthNum) - 1]} ${year.slice(2)}`;
//     });
    
//     return {
//       labels: monthLabels,
//       salesData: sortedMonths.map(month => monthlyData[month].sales),
//       revenueData: sortedMonths.map(month => monthlyData[month].revenue),
//       lostRevenueData: sortedMonths.map(month => monthlyData[month].lostRevenue)
//     };
//   };

//   const metrics = calculateMetrics();
//   const chartData = prepareChartData();

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
//             <>
//               <div className="flex justify-between gap-5">
//                 {/* Sales Overview */}
//                 <div className="bg-white rounded-lg shadow p-6 mb-6">
//                   <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="bg-blue-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">₹{metrics.sales?.toLocaleString('en-IN') || 0}</div>
//                       <div className="text-gray-600">Total Sales</div>
//                     </div>
//                     <div className="bg-green-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">₹{metrics.revenue?.toLocaleString('en-IN') || 0}</div>
//                       <div className="text-gray-600">Revenue</div>
//                     </div>
//                     <div className="bg-red-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">₹{metrics.lostRevenue?.toLocaleString('en-IN') || 0}</div>
//                       <div className="text-gray-600">Lost Revenue</div>
//                     </div>
//                     <div className="bg-purple-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">{metrics.fulfillmentRate || 0}%</div>
//                       <div className="text-gray-600">Fulfillment Rate</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* PO Summary */}
//                 <div className="bg-white rounded-lg shadow p-6 mb-6">
//                   <h2 className="text-xl font-semibold mb-4">PO Summary</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-yellow-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">{metrics.totalPOReceived || 0}</div>
//                       <div className="text-gray-600">Total PO Received</div>
//                     </div>
//                     <div className="bg-teal-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">{metrics.poFulfilled || 0}</div>
//                       <div className="text-gray-600">PO Fulfilled</div>
//                     </div>
//                     <div className="bg-orange-50 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold">{metrics.poPending || 0}</div>
//                       <div className="text-gray-600">PO Pending</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-row gap-4">
//                 <SaleVsRevenue data={filteredData} />
//                 <POSalesVsUnshippedRevenue data={filteredData} />
//               </div>
              
//               <div className="flex flex-row gap-4">
//                 <TopSellingSKUs data={filteredData} />
//                 <OrderSummaryChart data={filteredData} />
//               </div>
              
//               <AllPOsTable data={filteredData} />
//             </>
//           </div>
          
//           {/* Right Filters (Fixed) */}
//           <FilterSidebar 
//             filters={filters} 
//             setFilters={setFilters}
//             data={data}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelDashboard;




// src/pages/ChannelDashboard.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TabsNavigation from "../components/TabsNavigation";
import SaleVsRevenue from "../components/SalesRevenueCharts";
import POSalesVsUnshippedRevenue from "../components/POSalesVsUnshippedRevenue";
import TopSellingSKUs from "../components/TopSellingSKUs";
import OrderSummaryChart from "../components/OrderSummaryChart";
import AllPOsTable from "../components/AllPOsTable";
import FilterSidebar from "../components/FilterSidebar";

const ChannelDashboard = () => {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("executive");
  
  // Filter state
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    poNumber: "",
    sku: "",
    poStatus: "",
  });

  // Fetch data only once
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

  // Apply filters when filter state changes
  useEffect(() => {
    if (!allData.length) return;
    
    let result = [...allData];
    
    if (filters.year) {
      result = result.filter(item => {
        const dateParts = item['PO Creation Date']?.split('-');
        return dateParts && dateParts[2] === filters.year;
      });
    }
    
    if (filters.month) {
      result = result.filter(item => {
        const dateParts = item['PO Creation Date']?.split('-');
        return dateParts && dateParts[1] === filters.month;
      });
    }
    
    if (filters.poNumber) {
      result = result.filter(item => 
        item['PO Number']?.toLowerCase().includes(filters.poNumber.toLowerCase())
      );
    }
    
    if (filters.sku) {
      result = result.filter(item => 
        item.SKU?.toLowerCase() === filters.sku.toLowerCase()
      );
    }
    
    if (filters.poStatus) {
      result = result.filter(item => 
        item['PO Status']?.toLowerCase() === filters.poStatus.toLowerCase()
      );
    }
    
    setFilteredData(result);
  }, [filters, allData]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "channelPerformance") {
      navigate("/quick-commerce/channel-performance");
    }
  };

  // Calculate metrics using filteredData
  const calculateMetrics = () => {
    if (filteredData.length === 0) {
      return {
        sales: 0,
        revenue: 0,
        lostRevenue: 0,
        fulfillmentRate: 0,
        totalPOReceived: 0,
        poFulfilled: 0,
        poPending: 0
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
  };

  const metrics = calculateMetrics();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 bg-[#D4EAD9] min-h-screen">
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
        
        <div className="flex gap-4">
          {/* Left Content (Scrollable) */}
          <div className="flex-1 overflow-auto">
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
          </div>
          
          {/* Right Filters (Fixed) */}
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters}
            data={allData}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;