// // SalesRevenueCharts.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const SalesRevenueCharts = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/quick-commerce-executive");
//         setData(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching chart data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="text-gray-600">Loading charts...</div>;

//   const skuGroups = {};
//   data.forEach((item) => {
//     const sku = item.SKU;
//     if (!skuGroups[sku]) {
//       skuGroups[sku] = { sales: 0, revenue: 0 };
//     }
//     skuGroups[sku].sales += parseFloat(item["PO Sales"] || 0);
//     skuGroups[sku].revenue += parseFloat(item["Received_Revenue"] || 0);
//   });

//   const labels = Object.keys(skuGroups);
//   const salesData = labels.map((sku) => skuGroups[sku].sales);
//   const revenueData = labels.map((sku) => skuGroups[sku].revenue);

//   const commonOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.dataset.label}: ₹${ctx.raw.toFixed(2)}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="bg-white p-4 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold mb-2">Sale vs Revenue</h2>
//         <Bar
//           data={{
//             labels,
//             datasets: [
//               {
//                 label: "Purchase",
//                 data: salesData,
//                 backgroundColor: "#8ECDF4",
//               },
//               {
//                 label: "Sales",
//                 data: revenueData,
//                 backgroundColor: "#72D981",
//               },
//             ],
//           }}
//           options={commonOptions}
//         />
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold mb-2">Lost Revenue</h2>
//         <Bar
//           data={{
//             labels,
//             datasets: [
//               {
//                 label: "Lost Revenue",
//                 data: labels.map((sku) => skuGroups[sku].sales - skuGroups[sku].revenue),
//                 backgroundColor: "#A78BFA",
//               },
//             ],
//           }}
//           options={commonOptions}
//         />
//       </div>
//     </div>
//   );
// };

// export default SalesRevenueCharts;




// // RevenueChartsMUI.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BarChart } from '@mui/x-charts/BarChart';

// const RevenueChartsMUI = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     purchase: [],
//     sales: [],
//     lost: [],
//   });

//   useEffect(() => {
//     const fetchRevenueData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quick-commerce-executive");
//         const data = response.data;

//         const grouped = {};
//         data.forEach((item) => {
//           const sku = item.SKU;
//           const poSales = parseFloat(item["PO Sales"] || 0);
//           const receivedRevenue = parseFloat(item["Received_Revenue"] || 0);

//           if (!grouped[sku]) {
//             grouped[sku] = { purchase: 0, sales: 0 };
//           }

//           grouped[sku].purchase += poSales;
//           grouped[sku].sales += receivedRevenue;
//         });

//         const labels = Object.keys(grouped);
//         const purchase = labels.map((sku) => grouped[sku].purchase);
//         const sales = labels.map((sku) => grouped[sku].sales);
//         const lost = labels.map((sku) => grouped[sku].purchase - grouped[sku].sales);

//         setChartData({ labels, purchase, sales, lost });
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//       }
//     };

//     fetchRevenueData();
//   }, []);

//   return (
//     <div className="bg-[#e6f4ec] p-6 min-h-screen">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
//           <BarChart
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: chartData.labels,
//                 categoryGapRatio: 0.3,
//                 barGapRatio: 0.1,
//               },
//             ]}
//             series={[
//               {
//                 label: "Purchase",
//                 data: chartData.purchase,
//                 color: "#8ECDF4",
//               },
//               {
//                 label: "Sales",
//                 data: chartData.sales,
//                 color: "#72D981",
//               },
//             ]}
//             height={300}
//           />
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Lost Revenue</h2>
//           <BarChart
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: chartData.labels,
//                 categoryGapRatio: 0.3,
//                 barGapRatio: 0.1,
//               },
//             ]}
//             series={[
//               {
//                 label: "Lost Revenue",
//                 data: chartData.lost,
//                 color: "#A78BFA",
//               },
//             ]}
//             height={300}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueChartsMUI;





// // RevenueChartsMUI.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BarChart } from "@mui/x-charts/BarChart";

// const RevenueChartsMUI = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     purchase: [],
//     received: [],
//     lost: [],
//   });

//   useEffect(() => {
//     const fetchRevenueData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/quick-commerce-executive");
//         const data = response.data;

//         const grouped = {};
//         data.forEach((item) => {
//           const sku = item.SKU;
//           const poSales = parseFloat(item["PO Sales"] || 0);
//           const receivedRevenue = parseFloat(item["Received_Revenue"] || 0);

//           if (!grouped[sku]) {
//             grouped[sku] = { purchase: 0, received: 0 };
//           }

//           grouped[sku].purchase += poSales;
//           grouped[sku].received += receivedRevenue;
//         });

//         const labels = Object.keys(grouped);
//         const purchase = labels.map((sku) => grouped[sku].purchase);
//         const received = labels.map((sku) => grouped[sku].received);
//         const lost = labels.map((sku) => grouped[sku].purchase - grouped[sku].received);

//         setChartData({ labels, purchase, received, lost });
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//       }
//     };

//     fetchRevenueData();
//   }, []);

//   return (
//     <div className="bg-[#f0f4f8] p-6 min-h-screen">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Sale vs Revenue Chart */}
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
//           <BarChart
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: chartData.labels,
//                 categoryGapRatio: 0.3,
//                 barGapRatio: 0.1,
//               },
//             ]}
//             series={[
//               {
//                 label: "PO Sales",
//                 data: chartData.purchase,
//                 color: "#8ECDF4",
//               },
//               {
//                 label: "Received Revenue",
//                 data: chartData.received,
//                 color: "#72D981",
//               },
//             ]}
//             height={300}
//           />
//         </div>

//         {/* Lost Revenue Chart */}
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Lost Revenue</h2>
//           <BarChart
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: chartData.labels,
//                 categoryGapRatio: 0.3,
//                 barGapRatio: 0.1,
//               },
//             ]}
//             series={[
//               {
//                 label: "Lost Revenue",
//                 data: chartData.lost,
//                 color: "#A78BFA",
//               },
//             ]}
//             height={300}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueChartsMUI;





// // RevenueByMonthChart.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const RevenueByMonthChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(res.data);
//       } catch (err) {
//         console.error('API fetch error:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const monthlyData = data.reduce((acc, item) => {
//     const dateStr = item['PO Creation Date'];
//     if (!dateStr) return acc;

//     const [day, monthText, year] = dateStr.split('-');
//     const monthYear = `${monthText}-${year.slice(-2)}`; // e.g. "Oct-24"

//     if (!acc[monthYear]) {
//       acc[monthYear] = {
//         sales: 0,
//         received: 0,
//       };
//     }
//     acc[monthYear].sales += parseFloat(item['PO Sales']) || 0;
//     acc[monthYear].received += parseFloat(item['Received_Revenue']) || 0;
//     return acc;
//   }, {});

//   const months = Object.keys(monthlyData);
//   const salesValues = months.map((month) => monthlyData[month].sales);
//   const receivedValues = months.map((month) => monthlyData[month].received);

//   return (
//     <div className="p-4 bg-white rounded-2xl shadow-md w-full">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Revenue by Month</h2>
//       <div className="w-full overflow-x-auto">
//         <BarChart
//           height={350}
//           series={[
//             { data: salesValues, label: 'PO Sales', color: '#3B82F6' },
//             { data: receivedValues, label: 'Received Revenue', color: '#10B981' },
//           ]}
//           xAxis={[
//             {
//               scaleType: 'band',
//               data: months,
//               categoryGapRatio: 0.3,
//               barGapRatio: 0.1,
//             },
//           ]}
//         />
//       </div>
//     </div>
//   );
// };

// export default RevenueByMonthChart;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const SaleVsRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Process data to group by month and calculate sales/revenue
//   const processChartData = () => {
//     const monthlyData = {};

//     data.forEach(item => {
//       const date = new Date(item['PO Creation Date']);
//       if (isNaN(date)) return;

//       const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().slice(2)}`;
      
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = {
//           sales: 0,
//           revenue: 0
//         };
//       }

//       monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     // Sort months chronologically
//     const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
//       const [aMonth, aYear] = a.split('-');
//       const [bMonth, bYear] = b.split('-');
//       const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return (parseInt(aYear) - parseInt(bYear)) || 
//              (months.indexOf(aMonth) - months.indexOf(bMonth));
//     });

//     return {
//       months: sortedMonths,
//       sales: sortedMonths.map(month => monthlyData[month].sales),
//       revenue: sortedMonths.map(month => monthlyData[month].revenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
      
//       <div className="flex mb-4">
//         <div className="mr-8">
//           <h3 className="text-gray-600 font-medium">Last Revenue</h3>
//           <ul className="mt-2 space-y-1">
//             {chartData.months.map((month, index) => (
//               <li key={index} className="text-gray-500">{month}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-gray-600 font-medium">Purchase</h3>
//           <ul className="mt-2 space-y-1">
//             <li className="text-gray-500">Sales</li>
//           </ul>
//         </div>
//       </div>

//       <div className="h-80">
//         <BarChart
//           series={[
//             { data: chartData.sales, label: 'Sales', color: '#3b82f6' },
//             { data: chartData.revenue, label: 'Revenue', color: '#10b981' }
//           ]}
//           xAxis={[{
//             scaleType: 'band',
//             data: chartData.months,
//             categoryGapRatio: 0.3,
//             barGapRatio: 0.1,
//           }]}
//           yAxis={[{
//             valueFormatter: (value) => `₹${value.toLocaleString('en-IN')}`
//           }]}
//           margin={{ top: 20, bottom: 50, left: 60, right: 20 }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SaleVsRevenue;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const SaleVsRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [topProducts, setTopProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate top products
//         const productMap = {};
//         response.data.forEach(item => {
//           const sku = item.SKU;
//           if (!sku) return;
          
//           if (!productMap[sku]) {
//             productMap[sku] = 0;
//           }
//           productMap[sku] += parseFloat(item['PO Sales'] || 0);
//         });
        
//         const sortedProducts = Object.entries(productMap)
//           .sort((a, b) => b[1] - a[1])
//           .slice(0, 2)
//           .map(([name]) => name);
        
//         setTopProducts(sortedProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Process data to group by month and calculate sales/revenue
//   const processChartData = () => {
//     const monthlyData = {};

//     data.forEach(item => {
//       const date = new Date(item['PO Creation Date']);
//       if (isNaN(date)) return;

//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear().toString().slice(2);
//       const monthYear = `${month}-${year}`;
      
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = {
//           sales: 0,
//           revenue: 0
//         };
//       }

//       monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     // Sort months chronologically
//     const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
//       const [aMonth, aYear] = a.split('-');
//       const [bMonth, bYear] = b.split('-');
//       const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return (parseInt(aYear) - parseInt(bYear)) || 
//              (months.indexOf(aMonth) - months.indexOf(bMonth));
//     });

//     return {
//       months: sortedMonths,
//       sales: sortedMonths.map(month => monthlyData[month].sales),
//       revenue: sortedMonths.map(month => monthlyData[month].revenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
      
//       <div className="flex mb-4">
       
//       </div>

//       <div className="h-80">
//         <BarChart
//           series={[
//             { data: chartData.sales, label: 'Sales', color: '#3b82f6' },
//             { data: chartData.revenue, label: 'Revenue', color: '#10b981' }
//           ]}
//           xAxis={[{
//             scaleType: 'band',
//             data: chartData.months,
//             categoryGapRatio: 0.3,
//             barGapRatio: 0.1,
//           }]}
//           yAxis={[{
//             valueFormatter: (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
//           }]}
//           margin={{ top: 20, bottom: 50, left: 60, right: 20 }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SaleVsRevenue;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const SaleVsRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [topProducts, setTopProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate top products
//         const productMap = {};
//         response.data.forEach(item => {
//           const sku = item.SKU;
//           if (!sku) return;
          
//           if (!productMap[sku]) {
//             productMap[sku] = 0;
//           }
//           productMap[sku] += parseFloat(item['PO Sales'] || 0);
//         });
        
//         const sortedProducts = Object.entries(productMap)
//           .sort((a, b) => b[1] - a[1])
//           .slice(0, 2)
//           .map(([name]) => name);
        
//         setTopProducts(sortedProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Process data to group by month and calculate sales/revenue
//   const processChartData = () => {
//     const monthlyData = {};

//     data.forEach(item => {
//       const date = new Date(item['PO Creation Date']);
//       if (isNaN(date)) return;

//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear().toString().slice(2);
//       const monthYear = `${month}-${year}`;
      
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = {
//           sales: 0,
//           revenue: 0
//         };
//       }

//       monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     // Sort months chronologically
//     const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
//       const [aMonth, aYear] = a.split('-');
//       const [bMonth, bYear] = b.split('-');
//       const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return (parseInt(aYear) - parseInt(bYear)) || 
//              (months.indexOf(aMonth) - months.indexOf(bMonth));
//     });

//     return {
//       months: sortedMonths,
//       sales: sortedMonths.map(month => monthlyData[month].sales),
//       revenue: sortedMonths.map(month => monthlyData[month].revenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
      
//       {/* <div className="flex mb-4">
//         <div className="mr-8">
//           <h3 className="text-gray-600 font-medium">Last Revenue</h3>
//           <ul className="mt-2 space-y-1">
//             {topProducts.map((product, index) => (
//               <li key={index} className="text-gray-500">{product}</li>
//             ))}
//             {chartData.months.map((month, index) => (
//               <li key={`month-${index}`} className="text-gray-500">{month}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-gray-600 font-medium">Purchase</h3>
//           <ul className="mt-2 space-y-1">
//             <li className="text-gray-500">Sales</li>
//           </ul>
//         </div>
//       </div> */}

//       <div className="h-80">
//         <BarChart
//           series={[
//             { 
//               data: chartData.sales, 
//               label: 'Sales', 
//               color: '#3b82f6',
//               // Reduce bar width
//               barSize: 30, // Reduced from default 50
//             },
//             { 
//               data: chartData.revenue, 
//               label: 'Revenue', 
//               color: '#10b981',
//               // Reduce bar width
//               barSize: 30, // Reduced from default 50
//             }
//           ]}
//           xAxis={[{
//             scaleType: 'band',
//             data: chartData.months,
//             // Adjust gaps to reduce bar width
//             categoryGapRatio: 0.6, // Increased from default 0.2
//             barGapRatio: 0.05, // Reduced from default 0.1
//           }]}
//           // Remove y-axis line
//           leftAxis={null}
//           // Hide y-axis line and ticks
//           yAxis={[{
//             valueFormatter: (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
//             disableLine: true, // Hide y-axis line
//             disableTicks: true, // Hide y-axis ticks
//           }]}
//           margin={{ top: 20, bottom: 50, left: 20, right: 20 }} // Reduced left margin
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//           // Hide grid lines
//           grid={{ vertical: false, horizontal: false }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SaleVsRevenue;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const SaleVsRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [topProducts, setTopProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate top products
//         const productMap = {};
//         response.data.forEach(item => {
//           const sku = item.SKU;
//           if (!sku) return;
          
//           if (!productMap[sku]) {
//             productMap[sku] = 0;
//           }
//           productMap[sku] += parseFloat(item['PO Sales'] || 0);
//         });
        
//         const sortedProducts = Object.entries(productMap)
//           .sort((a, b) => b[1] - a[1])
//           .slice(0, 2)
//           .map(([name]) => name);
        
//         setTopProducts(sortedProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Process data to group by month and calculate sales/revenue
//   const processChartData = () => {
//     const monthlyData = {};

//     data.forEach(item => {
//       const date = new Date(item['PO Creation Date']);
//       if (isNaN(date)) return;

//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear().toString().slice(2);
//       const monthYear = `${month}-${year}`;
      
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = {
//           sales: 0,
//           revenue: 0
//         };
//       }

//       monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     // Sort months chronologically
//     const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
//       const [aMonth, aYear] = a.split('-');
//       const [bMonth, bYear] = b.split('-');
//       const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return (parseInt(aYear) - parseInt(bYear)) || 
//              (months.indexOf(aMonth) - months.indexOf(bMonth));
//     });

//     return {
//       months: sortedMonths,
//       sales: sortedMonths.map(month => monthlyData[month].sales),
//       revenue: sortedMonths.map(month => monthlyData[month].revenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Sale vs Revenue</h2>
      
      
//       <div className="flex justify-between">
//         <div className="h-80">
//         <BarChart
//           series={[
//             { 
//               data: chartData.sales, 
//               label: 'Sales', 
//               color: '#3b82f6',
//               barSize: 30,
//             },
//             { 
//               data: chartData.revenue, 
//               label: 'Revenue', 
//               color: '#10b981',
//               barSize: 30,
//             }
//           ]}
//           xAxis={[{
//             scaleType: 'band',
//             data: chartData.months,
//             // Reduced gap between bars
//             categoryGapRatio: 0.7,
//             barGapRatio: 0.2,
//           }]}
//           // Hide y-axis completely
//           yAxis={[{
//             disableLine: true,
//             disableTicks: true,
//             valueFormatter: () => '', // Hide values
//             tickLabelStyle: { display: 'none' }, // Hide tick labels
//           }]}
//           margin={{ top: 20, bottom: 50, left: 10, right: 20 }} // Reduced left margin
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//             axis: {
//               tickLabel: {
//                 display: 'none', // Hide x-axis tick labels if needed
//               }
//             }
//           }}
//           // Hide grid lines
//           grid={{ vertical: false, horizontal: false }}
//           // Hide tooltip if desired
//           // tooltip={{ trigger: 'none' }}
//         />
      
//       </div>
      
//       </div>
//     </div>
//   );
// };

// export default SaleVsRevenue;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const SaleVsRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartWidth, setChartWidth] = useState(600);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate chart width based on number of months
//         const months = [...new Set(response.data.map(item => {
//           const date = new Date(item['PO Creation Date']);
//           if (isNaN(date)) return null;
//           return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().slice(2)}`;
//         }).filter(Boolean))];
        
//         setChartWidth(Math.max(600, months.length * 80));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const processChartData = () => {
//     const monthlyData = {};

//     data.forEach(item => {
//       const date = new Date(item['PO Creation Date']);
//       if (isNaN(date)) return;

//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear().toString().slice(2);
//       const monthYear = `${month}-${year}`;
      
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = {
//           sales: 0,
//           revenue: 0
//         };
//       }

//       monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
//       const [aMonth, aYear] = a.split('-');
//       const [bMonth, bYear] = b.split('-');
//       const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       return (parseInt(aYear) - parseInt(bYear)) || 
//              (months.indexOf(aMonth) - months.indexOf(bMonth));
//     });

//     return {
//       months: sortedMonths,
//       sales: sortedMonths.map(month => monthlyData[month].sales),
//       revenue: sortedMonths.map(month => monthlyData[month].revenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
//       <h2 className="text-xl font-semibold mb-4">Sales vs Revenue</h2>
//       <div className="overflow-x-auto">
//         <div style={{ width: `${chartWidth}px`, height: '320px' }}>
//           <BarChart
//             series={[
//               { 
//                 data: chartData.sales, 
//                 label: 'Sales', 
//                 color: '#3b82f6',
//                 barSize: 30,
//               },
//               { 
//                 data: chartData.revenue, 
//                 label: 'Revenue', 
//                 color: '#10b981',
//                 barSize: 30,
//               }
//             ]}
//             xAxis={[{
//               scaleType: 'band',
//               data: chartData.months,
//               categoryGapRatio: 0.7,
//               barGapRatio: 0.2,
//             }]}
//             yAxis={[{
//               disableLine: true,
//               disableTicks: true,
//               valueFormatter: () => '',
//               tickLabelStyle: { display: 'none' },
//             }]}
//             margin={{ top: 20, bottom: 50, left: 10, right: 20 }}
//             slotProps={{
//               legend: {
//                 direction: 'row',
//                 position: { vertical: 'top', horizontal: 'right' },
//                 padding: 0,
//               },
//               axis: {
//                 tickLabel: {
//                   display: 'none',
//                 }
//               }
//             }}
//             grid={{ vertical: false, horizontal: false }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };



// export default SaleVsRevenue;


// SaleVsRevenue.jsx
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const SaleVsRevenue = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const months = [...new Set(data.map(item => {
      const date = new Date(item['PO Creation Date']);
      if (isNaN(date)) return null;
      return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().slice(2)}`;
    }).filter(Boolean))];
    setChartWidth(Math.max(600, months.length * 80));
  }, [data]);

  const processChartData = () => {
    const monthlyData = {};

    data.forEach(item => {
      const date = new Date(item['PO Creation Date']);
      if (isNaN(date)) return;

      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear().toString().slice(2);
      const monthYear = `${month}-${year}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { sales: 0, revenue: 0 };
      }

      monthlyData[monthYear].sales += parseFloat(item['PO Sales'] || 0);
      monthlyData[monthYear].revenue += parseFloat(item['Received_Revenue'] || 0);
    });

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const [aMonth, aYear] = a.split('-');
      const [bMonth, bYear] = b.split('-');
      return (parseInt(aYear) - parseInt(bYear)) || (months.indexOf(aMonth) - months.indexOf(bMonth));
    });

    return {
      months: sortedMonths,
      sales: sortedMonths.map(month => monthlyData[month].sales),
      revenue: sortedMonths.map(month => monthlyData[month].revenue)
    };
  };

  const chartData = processChartData();

  if (!data || data.length === 0) return <div className="p-4">No data available</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Sales vs Revenue</h2>
      <div className="overflow-x-auto">
        <div style={{ width: `${chartWidth}px`, height: '320px' }}>
          <BarChart
            series={[
              { data: chartData.sales, label: 'Sales', color: '#3b82f6', barSize: 30 },
              { data: chartData.revenue, label: 'Revenue', color: '#10b981', barSize: 30 }
            ]}
            xAxis={[{ scaleType: 'band', data: chartData.months }]}
            yAxis={[{ valueFormatter: () => '' }]}
            margin={{ top: 20, bottom: 50, left: 10, right: 20 }}
            slotProps={{
              legend: { direction: 'row', position: { vertical: 'top', horizontal: 'right' } }
            }}
            grid={{ vertical: false, horizontal: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default SaleVsRevenue;
