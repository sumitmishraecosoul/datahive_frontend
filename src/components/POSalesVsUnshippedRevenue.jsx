// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const POSalesVsUnshippedRevenue = () => {
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

//   // Process data to group by month and calculate PO Sales vs Unshipped Revenue
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
//           poSales: 0,
//           unshippedRevenue: 0
//         };
//       }

//       monthlyData[monthYear].poSales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].unshippedRevenue += parseFloat(item['Unshipped_Revenue'] || 0);
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
//       poSales: sortedMonths.map(month => monthlyData[month].poSales),
//       unshippedRevenue: sortedMonths.map(month => monthlyData[month].unshippedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">PO Sales vs Unshipped Revenue</h2>
      
//       <div className="flex justify-between">
//         <div className="h-80">
//           <BarChart
//             series={[
//               { 
//                 data: chartData.poSales, 
//                 label: 'PO Sales', 
//                 color: '#3b82f6', // Blue
//                 barSize: 30,
//               },
//               { 
//                 data: chartData.unshippedRevenue, 
//                 label: 'Unshipped Revenue', 
//                 color: '#ef4444', // Red
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

// export default POSalesVsUnshippedRevenue;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const POSalesVsUnshippedRevenue = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartWidth, setChartWidth] = useState(600); // Initial width

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Adjust width based on number of months
//         const months = [...new Set(response.data.map(item => {
//           const date = new Date(item['PO Creation Date']);
//           if (isNaN(date)) return null;
//           return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().slice(2)}`;
//         }).filter(Boolean))];
        
//         setChartWidth(Math.max(600, months.length * 80)); // 80px per month
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
//           poSales: 0,
//           unshippedRevenue: 0
//         };
//       }

//       monthlyData[monthYear].poSales += parseFloat(item['PO Sales'] || 0);
//       monthlyData[monthYear].unshippedRevenue += parseFloat(item['Unshipped_Revenue'] || 0);
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
//       poSales: sortedMonths.map(month => monthlyData[month].poSales),
//       unshippedRevenue: sortedMonths.map(month => monthlyData[month].unshippedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">PO Sales vs Unshipped Revenue</h2>
      
//       <div className="overflow-x-auto">
//         <div style={{ width: `${chartWidth}px`, height: '320px' }}>
//           <BarChart
//             series={[
//               { 
//                 data: chartData.poSales, 
//                 label: 'PO Sales', 
//                 color: '#3b82f6',
//                 barSize: 30,
//               },
//               { 
//                 data: chartData.unshippedRevenue, 
//                 label: 'Unshipped Revenue', 
//                 color: '#ef4444',
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

// export default POSalesVsUnshippedRevenue;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
const POSalesVsUnshippedRevenue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
        setData(response.data);
        
        // Calculate chart width based on number of months
        const months = [...new Set(response.data.map(item => {
          const date = new Date(item['PO Creation Date']);
          if (isNaN(date)) return null;
          return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().slice(2)}`;
        }).filter(Boolean))];
        
        setChartWidth(Math.max(600, months.length * 80));
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
      const date = new Date(item['PO Creation Date']);
      if (isNaN(date)) return;

      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear().toString().slice(2);
      const monthYear = `${month}-${year}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          poSales: 0,
          unshippedRevenue: 0
        };
      }

      monthlyData[monthYear].poSales += parseFloat(item['PO Sales'] || 0);
      monthlyData[monthYear].unshippedRevenue += parseFloat(item['Unshipped_Revenue'] || 0);
    });

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const [aMonth, aYear] = a.split('-');
      const [bMonth, bYear] = b.split('-');
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return (parseInt(aYear) - parseInt(bYear)) || 
             (months.indexOf(aMonth) - months.indexOf(bMonth));
    });

    return {
      months: sortedMonths,
      poSales: sortedMonths.map(month => monthlyData[month].poSales),
      unshippedRevenue: sortedMonths.map(month => monthlyData[month].unshippedRevenue)
    };
  };

  const chartData = processChartData();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Sales vs Lost Revenue</h2>
      <div className="overflow-x-auto">
        <div style={{ width: `${chartWidth}px`, height: '320px' }}>
          <BarChart
            series={[
              { 
                data: chartData.poSales, 
                label: 'Sales', 
                color: '#3b82f6',
                barSize: 30,
              },
              { 
                data: chartData.unshippedRevenue, 
                label: 'Lost Revenue', 
                color: '#ef4444',
                barSize: 30,
              }
            ]}
            xAxis={[{
              scaleType: 'band',
              data: chartData.months,
              categoryGapRatio: 0.7,
              barGapRatio: 0.2,
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
        </div>
      </div>
    </div>
  );
};

export default POSalesVsUnshippedRevenue;