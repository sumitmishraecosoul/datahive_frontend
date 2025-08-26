// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const OrderSummaryChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/quick-commerce-executive');
//         const data = await response.json();
        
//         // Process the data to get unique PO counts by month
//         const poByMonth = {};
        
//         data.forEach(item => {
//           if (!item['PO Creation Date']) return;
          
//           const dateParts = item['PO Creation Date'].split('-');
//           if (dateParts.length !== 3) return;
          
//           const month = dateParts[1]; // "Oct" from "14-Oct-2024"
//           const poNumber = item['PO Number'];
          
//           if (!poByMonth[month]) {
//             poByMonth[month] = new Set();
//           }
//           poByMonth[month].add(poNumber);
//         });
        
//         // Convert to chart data format
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         const monthLabels = [];
//         const uniquePoCounts = [];
        
//         months.forEach(month => {
//           if (poByMonth[month]) {
//             monthLabels.push(month);
//             uniquePoCounts.push(poByMonth[month].size);
//           }
//         });
        
//         setChartData({
//           labels: monthLabels,
//           datasets: [
//             {
//               label: 'Unique PO Numbers',
//               data: uniquePoCounts,
//               backgroundColor: 'rgba(59, 130, 246, 0.7)',
//               borderColor: 'rgba(59, 130, 246, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
        
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Unique PO Numbers',
//         font: {
//           size: 16
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `Unique POs: ${context.raw}`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Number of Unique POs',
//         },
//         ticks: {
//           stepSize: 1,
//           precision: 0
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month'
//         }
//       }
//     },
//     maintainAspectRatio: false
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error: </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Order Summary - Unique PO Numbers</h2>
//       <div className="h-80">
//         {chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p className="text-gray-500">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryChart;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const OrderSummaryChart = () => {
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
//           if (!item['PO Creation Date']) return null;
//           const dateParts = item['PO Creation Date'].split('-');
//           if (dateParts.length !== 3) return null;
//           return dateParts[1]; // Get month abbreviation (Oct, Nov, etc.)
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
//       if (!item['PO Creation Date']) return;
      
//       const dateParts = item['PO Creation Date'].split('-');
//       if (dateParts.length !== 3) return;
      
//       const month = dateParts[1]; // "Oct" from "14-Oct-2024"
//       const poNumber = item['PO Number'];
      
//       if (!monthlyData[month]) {
//         monthlyData[month] = new Set();
//       }
//       monthlyData[month].add(poNumber);
//     });

//     // Sort months in chronological order
//     const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
//     const sortedMonths = Object.keys(monthlyData).sort(
//       (a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b)
//     );

//     return {
//       months: sortedMonths,
//       uniquePOs: sortedMonths.map(month => monthlyData[month].size)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
//       <h2 className="text-xl font-semibold mb-4">Monthly Unique PO Numbers</h2>
//       <div className="overflow-x-auto">
//         <div style={{ width: `${chartWidth}px`, height: '320px' }}>
//           {chartData.months.length > 0 ? (
//             <BarChart
//               series={[
//                 { 
//                   data: chartData.uniquePOs, 
//                   label: 'Unique POs', 
//                   color: '#3b82f6',
//                   barSize: 30,
//                 }
//               ]}
//               xAxis={[{
//                 scaleType: 'band',
//                 data: chartData.months,
//                 categoryGapRatio: 0.7,
//               }]}
//               yAxis={[{
//                 disableLine: true,
//                 disableTicks: true,
//                 valueFormatter: () => '',
//                 tickLabelStyle: { display: 'none' },
//               }]}
//               margin={{ top: 20, bottom: 50, left: 10, right: 20 }}
//               slotProps={{
//                 legend: {
//                   direction: 'row',
//                   position: { vertical: 'top', horizontal: 'right' },
//                   padding: 0,
//                 },
//                 axis: {
//                   tickLabel: {
//                     display: 'none',
//                   }
//                 }
//               }}
//               grid={{ vertical: false, horizontal: false }}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">No data available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryChart;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import { BarChart } from '@mui/x-charts/BarChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const OrderSummaryChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartWidth, setChartWidth] = useState(600);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/quick-commerce-executive`);
        setData(response.data);
        
        // Extract available years from data
        const years = [...new Set(response.data.map(item => {
          if (!item['PO Creation Date']) return null;
          const dateParts = item['PO Creation Date'].split('-');
          if (dateParts.length !== 3) return null;
          return dateParts[2]; // Get year (2024, 2025, etc.)
        }).filter(Boolean))];
        
        setAvailableYears(years.sort());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = () => {
    const monthlyData = {};

    data.forEach(item => {
      if (!item['PO Creation Date']) return;
      
      const dateParts = item['PO Creation Date'].split('-');
      if (dateParts.length !== 3) return;
      
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];
      
      // Skip if not selected year
      if (year !== selectedYear) return;
      
      const monthYear = `${month}-${year.slice(2)}`; // Format: "May-25"
      const poNumber = item['PO Number'];
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = new Set();
      }
      monthlyData[monthYear].add(poNumber);
    });

    // Sort months in chronological order
    const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const sortedMonthYears = Object.keys(monthlyData).sort((a, b) => {
      const [aMonth, aYear] = a.split('-');
      const [bMonth, bYear] = b.split('-');
      return (parseInt(aYear) - parseInt(bYear)) || 
             (monthsOrder.indexOf(aMonth) - monthsOrder.indexOf(bMonth));
    });

    return {
      monthYears: sortedMonthYears,
      uniquePOs: sortedMonthYears.map(monthYear => monthlyData[monthYear].size)
    };
  };

  const chartData = processChartData();

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders Summary</h2>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={handleYearChange}
          >
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <div className="overflow-x-auto">
        <div style={{ width: `${chartWidth}px`, height: '320px' }}>
          {chartData.monthYears.length > 0 ? (
            <BarChart
              series={[
                { 
                  data: chartData.uniquePOs, 
                  label: 'POs', 
                  color: '#3b82f6',
                  barSize: 30,
                }
              ]}
              xAxis={[{
                scaleType: 'band',
                data: chartData.monthYears,
                categoryGapRatio: 0.7,
              }]}
              yAxis={[{
                disableLine: true,
                disableTicks: true,
                valueFormatter: () => '',
                tickLabelStyle: { display: 'none' },
              }]}
              margin={{ top: 20, bottom: 50, left: 10, right: 20 }}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'top', horizontal: 'right' },
                  padding: 0,
                },
                axis: {
                  tickLabel: {
                    display: 'none',
                  }
                }
              }}
              grid={{ vertical: false, horizontal: false }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available for {selectedYear}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryChart;