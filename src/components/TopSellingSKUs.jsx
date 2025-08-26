// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const TopSellingSKUs = () => {
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

//   // Process data to get top 5 SKUs by PO Sales
//   const processChartData = () => {
//     const skuMap = {};

//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;

//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           poSales: 0,
//           receivedRevenue: 0
//         };
//       }

//       skuMap[sku].poSales += parseFloat(item['PO Sales'] || 0);
//       skuMap[sku].receivedRevenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     // Sort by PO Sales descending and take top 5
//     const sortedSKUs = Object.entries(skuMap)
//       .sort((a, b) => b[1].poSales - a[1].poSales)
//       .slice(0, 5);

//     return {
//       skus: sortedSKUs.map(([sku]) => sku),
//       poSales: sortedSKUs.map(([, values]) => values.poSales),
//       receivedRevenue: sortedSKUs.map(([, values]) => values.receivedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Top Selling SKU's</h2>
      
//       <div className="h-[400px]">
//         <BarChart
//           layout="horizontal"
//           series={[
//             {
//               data: chartData.poSales,
//               label: 'PO Sales',
//               color: '#3b82f6', // Blue
//             },
//             {
//               data: chartData.receivedRevenue,
//               label: 'Received Revenue',
//               color: '#10b981', // Green
//             }
//           ]}
//           yAxis={[{
//             data: chartData.skus,
//             scaleType: 'band',
//           }]}
//           xAxis={[{
//             disableLine: true,
//             disableTicks: true,
//             valueFormatter: (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
//           }]}
//           margin={{ top: 20, bottom: 50, left: 150, right: 20 }} // Increased left margin for SKU labels
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//           grid={{ vertical: false, horizontal: false }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TopSellingSKUs;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const TopSellingSKUs = () => {
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

//   const processChartData = () => {
//     const skuMap = {};

//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;

//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           poSales: 0,
//           receivedRevenue: 0
//         };
//       }

//       skuMap[sku].poSales += parseFloat(item['PO Sales'] || 0);
//       skuMap[sku].receivedRevenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     const sortedSKUs = Object.entries(skuMap)
//       .sort((a, b) => b[1].poSales - a[1].poSales)
//       .slice(0, 5);

//     return {
//       skus: sortedSKUs.map(([sku]) => sku),
//       poSales: sortedSKUs.map(([, values]) => values.poSales),
//       receivedRevenue: sortedSKUs.map(([, values]) => values.receivedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Top Selling SKU's</h2>
      
//       <div className="h-[400px]">
//         <BarChart
//           layout="horizontal"
//           series={[
//             {
//               data: chartData.poSales,
//               label: 'PO Sales',
//               color: '#3b82f6',
//             },
//             {
//               data: chartData.receivedRevenue,
//               label: 'Received Revenue',
//               color: '#10b981',
//             }
//           ]}
//           yAxis={[{
//             data: chartData.skus,
//             scaleType: 'band',
//             // Show full SKU names
//             tickLabelStyle: {
//               fontSize: '12px',
//               textOverflow: 'unset',
//               whiteSpace: 'nowrap'
//             },
//           }]}
//           xAxis={[{
//             disableLine: true,
//             disableTicks: true,
//             // Remove all x-axis values and lines
//             valueFormatter: () => '',
//             tickLabelStyle: { display: 'none' },
//           }]}
//           // Reduced left margin to start graph from left
//           margin={{ top: 20, bottom: 50, left: 20, right: 20 }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//           grid={{ vertical: false, horizontal: false }}
//           // Remove all axis lines
//           leftAxis={null}
//           bottomAxis={null}
//         />
//       </div>
//     </div>
//   );
// };

// export default TopSellingSKUs;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const TopSellingSKUs = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [maxSkuLength, setMaxSkuLength] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate maximum SKU length for dynamic margin
//         const skus = response.data.map(item => item.SKU).filter(Boolean);
//         const maxLength = Math.max(...skus.map(sku => sku.length), 0);
//         setMaxSkuLength(maxLength);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const processChartData = () => {
//     const skuMap = {};

//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;

//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           poSales: 0,
//           receivedRevenue: 0
//         };
//       }

//       skuMap[sku].poSales += parseFloat(item['PO Sales'] || 0);
//       skuMap[sku].receivedRevenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     const sortedSKUs = Object.entries(skuMap)
//       .sort((a, b) => b[1].poSales - a[1].poSales)
//       .slice(0, 5);

//     return {
//       skus: sortedSKUs.map(([sku]) => sku),
//       poSales: sortedSKUs.map(([, values]) => values.poSales),
//       receivedRevenue: sortedSKUs.map(([, values]) => values.receivedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Top Selling SKU's</h2>
      
//       <div className="h-[400px] w-full overflow-visible">
//         <BarChart
//           layout="horizontal"
//           series={[
//             {
//               data: chartData.poSales,
//               label: 'PO Sales',
//               color: '#3b82f6',
//             },
//             {
//               data: chartData.receivedRevenue,
//               label: 'Received Revenue',
//               color: '#10b981',
//             }
//           ]}
//           yAxis={[{
//             data: chartData.skus,
//             scaleType: 'band',
//             tickLabelStyle: {
//               fontSize: '12px',
//               whiteSpace: 'nowrap',
//               overflow: 'visible',
//               textOverflow: 'clip',
//               width: 'auto',
//               paddingRight: '10px'
//             },
//           }]}
//           xAxis={[{
//             disableLine: true,
//             disableTicks: true,
//             valueFormatter: () => '',
//             tickLabelStyle: { display: 'none' },
//           }]}
//           margin={{ 
//             top: 20, 
//             bottom: 50, 
//             left: Math.max(20, maxSkuLength * 6), // Dynamic left margin based on SKU length
//             right: 20 
//           }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//           grid={{ vertical: false, horizontal: false }}
//           leftAxis={null}
//           bottomAxis={null}
//           sx={{
//             '& .MuiChartsAxis-tickLabel': {
//               overflow: 'visible',
//               textOverflow: 'unset',
//               width: 'max-content'
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TopSellingSKUs;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart } from '@mui/x-charts/BarChart';

// const TopSellingSKUs = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [maxSkuLength, setMaxSkuLength] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/quick-commerce-executive');
//         setData(response.data);
        
//         // Calculate maximum SKU length for dynamic margin
//         const skus = response.data.map(item => item.SKU).filter(Boolean);
//         const maxLength = Math.max(...skus.map(sku => sku.length), 0);
//         setMaxSkuLength(maxLength);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const processChartData = () => {
//     const skuMap = {};

//     data.forEach(item => {
//       const sku = item.SKU;
//       if (!sku) return;

//       if (!skuMap[sku]) {
//         skuMap[sku] = {
//           poSales: 0,
//           receivedRevenue: 0
//         };
//       }

//       skuMap[sku].poSales += parseFloat(item['PO Sales'] || 0);
//       skuMap[sku].receivedRevenue += parseFloat(item['Received_Revenue'] || 0);
//     });

//     const sortedSKUs = Object.entries(skuMap)
//       .sort((a, b) => b[1].poSales - a[1].poSales)
//       .slice(0, 5);

//     return {
//       skus: sortedSKUs.map(([sku]) => sku),
//       poSales: sortedSKUs.map(([, values]) => values.poSales),
//       receivedRevenue: sortedSKUs.map(([, values]) => values.receivedRevenue)
//     };
//   };

//   const chartData = processChartData();

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Top Selling SKU's</h2>
      
//       <div className="h-[400px] w-full overflow-visible">
//         <BarChart
//           layout="horizontal"
//           series={[
//             {
//               data: chartData.poSales,
//               label: 'PO Sales',
//               color: '#3b82f6',
//             },
//             {
//               data: chartData.receivedRevenue,
//               label: 'Received Revenue',
//               color: '#10b981',
//             }
//           ]}
//           yAxis={[{
//             data: chartData.skus,
//             scaleType: 'band',
//             tickLabelStyle: {
//               fontSize: '12px',
//               whiteSpace: 'nowrap',
//               overflow: 'visible',
//               textOverflow: 'clip',
//               width: 'auto',
//               paddingRight: '10px'
//             },
//           }]}
//           xAxis={[{
//             disableLine: true,
//             disableTicks: true,
//             valueFormatter: () => '',
//             tickLabelStyle: { display: 'none' },
//           }]}
//           margin={{ 
//             top: 20, 
//             bottom: 50, 
//             left: Math.max(20, maxSkuLength * 6), // Dynamic left margin based on SKU length
//             right: 20 
//           }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'right' },
//               padding: 0,
//             },
//           }}
//           grid={{ vertical: false, horizontal: false }}
//           leftAxis={null}
//           bottomAxis={null}
//           sx={{
//             '& .MuiChartsAxis-tickLabel': {
//               overflow: 'visible',
//               textOverflow: 'unset',
//               width: 'max-content'
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TopSellingSKUs;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import API_BASE_URL from '../utils/apiConfig';

const TopSellingSKUs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/quick-commerce-executive`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = () => {
    const skuMap = {};

    data.forEach(item => {
      const sku = item.SKU;
      if (!sku) return;

      if (!skuMap[sku]) {
        skuMap[sku] = {
          poSales: 0,
          receivedRevenue: 0
        };
      }

      skuMap[sku].poSales += parseFloat(item['PO Sales'] || 0);
      skuMap[sku].receivedRevenue += parseFloat(item['Received_Revenue'] || 0);
    });

    const sortedSKUs = Object.entries(skuMap)
      .sort((a, b) => b[1].poSales - a[1].poSales)
      .slice(0, 5);

    return {
      skus: sortedSKUs.map(([sku]) => sku),
      poSales: sortedSKUs.map(([, values]) => values.poSales),
      receivedRevenue: sortedSKUs.map(([, values]) => values.receivedRevenue)
    };
  };

  const chartData = processChartData();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Top Selling SKU's</h2>
      <div className="h-[400px] w-full">
        <BarChart
          layout="horizontal"
          series={[
            {
              data: chartData.poSales,
              label: 'PO Sales',
              color: '#3b82f6',
            },
            {
              data: chartData.receivedRevenue,
              label: 'Received Revenue',
              color: '#10b981',
            }
          ]}
          yAxis={[{
            data: chartData.skus,
            scaleType: 'band',
            tickLabelStyle: {
              fontSize: '12px',
              overflow: 'visible',
              width: 'max-content',
              textOverflow: 'unset',
              whiteSpace: 'nowrap',
            },
          }]}
          xAxis={[{
            disableLine: true,
            disableTicks: true,
            valueFormatter: () => '',
            tickLabelStyle: { display: 'none' },
          }]}
          margin={{ 
            top: 20,
            bottom: 50,
            left: 150, // Increased left margin for long SKU names
            right: 20
          }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'right' },
              padding: 0,
            },
          }}
          grid={{ vertical: false, horizontal: false }}
          leftAxis={null}
          bottomAxis={null}
          sx={{
            '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
              overflow: 'visible !important',
              width: 'auto !important',
              maxWidth: 'none !important'
            }
          }}
        />
      </div>
    </div>
  );
};

const SecondChart = () => {
  // Your second chart component implementation
  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Second Chart</h2>
      <div className="h-[400px] w-full">
        {/* Second chart implementation */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="flex flex-row gap-4 flex-wrap">
        <TopSellingSKUs />
      </div>
    </div>
  );
};

export default Dashboard;