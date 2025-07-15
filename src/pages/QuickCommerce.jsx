// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Number(value).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       // Clean numbers
//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     // Totals
//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? (total["Fulfilled PO Qty"] / total["PO Qty"]) * 100
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;


















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   ResponsiveContainer,
// } from "recharts";

// const metricConfig = [
//   { key: "PO Sales", label: "Total PO Sales", format: "currency" },
//   { key: "Revenue", label: "Total Revenue", format: "currency" },
//   { key: "Revenue Lost", label: "Revenue Lost", format: "currency" },
//   { key: "PO Qty", label: "Total Orders Qty", format: "number" },
//   { key: "Fulfilled PO Qty", label: "Fulfilled PO Qty", format: "number" },
//   {
//     key: "Fulfillment Rate (%)",
//     label: "Avg. Fulfillment Rate",
//     format: "percentage",
//   },
// ];

// const formatValue = (value, type) => {
//   const v = Number(value) || 0;
//   if (type === "currency") return `₹${v.toLocaleString("en-IN")}`;
//   if (type === "percentage") return `${v.toFixed(2)}%`;
//   return v.toLocaleString("en-IN");
// };

// const calcMOMYOY = (data, key) => {
//   const sorted = [...data].sort((a, b) =>
//     a["Year-Month"].localeCompare(b["Year-Month"])
//   );

//   const latestMonth = sorted[sorted.length - 1]?.["Year-Month"];
//   const prevMonth = sorted[sorted.length - 2]?.["Year-Month"];
//   const prevYear = latestMonth?.replace(/^(\d{4})-(\d{2})$/, (m, y, mo) => `${+y - 1}-${mo}`);

//   const current = sorted.find(d => d["Year-Month"] === latestMonth);
//   const previous = sorted.find(d => d["Year-Month"] === prevMonth);
//   const yearAgo = sorted.find(d => d["Year-Month"] === prevYear);

//   const MOM = previous ? ((current?.[key] - previous[key]) / previous[key]) * 100 : 0;
//   const YOY = yearAgo ? ((current?.[key] - yearAgo[key]) / yearAgo[key]) * 100 : 0;

//   return {
//     MOM: MOM.toFixed(1),
//     YOY: YOY.toFixed(1),
//   };
// };

// const QuickCommerceMetrics = () => {
//   const [monthlySummary, setMonthlySummary] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/quick-commerce");
//       const raw = res.data;

//       const grouped = {};

//       raw.forEach((row) => {
//         const month = row["Year-Month"];
//         if (!grouped[month]) {
//           grouped[month] = {
//             "Year-Month": month,
//             Revenue: 0,
//             "PO Sales": 0,
//             "Revenue Lost": 0,
//             "PO Qty": 0,
//             "Fulfilled PO Qty": 0,
//           };
//         }

//         grouped[month].Revenue += +row.Revenue;
//         grouped[month]["PO Sales"] += +row["PO Sales"];
//         grouped[month]["Revenue Lost"] += +row["Revenue Lost"];
//         grouped[month]["PO Qty"] += +row["PO Qty"];
//         grouped[month]["Fulfilled PO Qty"] += +row["Fulfilled PO Qty"];
//       });

//       const summarized = Object.values(grouped).map((monthData) => ({
//         ...monthData,
//         "Fulfillment Rate (%)": monthData["PO Qty"]
//           ? (monthData["Fulfilled PO Qty"] / monthData["PO Qty"]) * 100
//           : 0,
//       }));

//       setMonthlySummary(summarized);
//     } catch (err) {
//       console.error("Failed to fetch summary", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTrendCard = ({ key, label, format }) => {
//     const values = monthlySummary.map((d) => ({
//       month: d["Year-Month"],
//       value: +d[key],
//     }));

//     const current = values[values.length - 1]?.value || 0;
//     const { MOM, YOY } = calcMOMYOY(monthlySummary, key);

//     const isPositive = (val) => parseFloat(val) >= 0;

//     return (
//       <div
//         key={key}
//         className="bg-white rounded-xl shadow p-4 w-full sm:w-[320px]"
//       >
//         <div className="text-gray-600 text-sm font-semibold mb-1">{label}</div>
//         <div className="text-2xl font-bold text-gray-900">
//           {formatValue(current, format)}
//         </div>

//         <div className="flex justify-between text-xs mt-2 mb-2 text-gray-500">
//           <div>
//             <div className="flex items-center gap-1">
//               MOM%{" "}
//               <span className={`font-semibold ${isPositive(MOM) ? "text-green-500" : "text-red-500"}`}>
//                 {isPositive(MOM) ? "▲" : "▼"} {Math.abs(MOM)}%
//               </span>
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center gap-1">
//               YOY%{" "}
//               <span className={`font-semibold ${isPositive(YOY) ? "text-green-500" : "text-red-500"}`}>
//                 {isPositive(YOY) ? "▲" : "▼"} {Math.abs(YOY)}%
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Sparkline */}
//         <div className="h-14">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={values}>
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#5B4636"
//                 strokeWidth={2}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">📈 Quick Commerce Overview</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : (
//         <div className="flex flex-wrap gap-4">
//           {metricConfig.map(renderTrendCard)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuickCommerceMetrics;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import QuickCommerceCard from "../components/QuickCommerceCard";

// const metrics = [
//   { title: "Overall Gross Sales", key: "PO Sales", valueType: "currency", avgLabel: "avg. sale" },
//   { title: "Total Orders Qty", key: "PO Qty", valueType: "number", avgLabel: "avg. order qty" },
//   { title: "Total Customers", key: "Revenue", valueType: "currency", avgLabel: "Returning Customer" },
// ];

// const calculateChange = (current, previous) => {
//   if (previous === 0) return 0;
//   return ((current - previous) / previous) * 100;
// };

// const groupByMonth = (data) => {
//   const grouped = {};
//   data.forEach(row => {
//     const month = row["Year-Month"];
//     if (!grouped[month]) grouped[month] = {};
//     for (const metric of metrics) {
//       const val = parseFloat(row[metric.key]) || 0;
//       grouped[month][metric.key] = (grouped[month][metric.key] || 0) + val;
//     }
//   });

//   return Object.entries(grouped)
//     .map(([month, values]) => ({ month, ...values }))
//     .sort((a, b) => dayjs(a.month).isAfter(dayjs(b.month)) ? 1 : -1);
// };

// const QuickCommerce = () => {
//   const [monthlyData, setMonthlyData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/quick-commerce").then((res) => {
//       setMonthlyData(groupByMonth(res.data));
//     });
//   }, []);

//   const getLatestMetric = (metricKey) => {
//     const sorted = monthlyData;
//     const last = sorted[sorted.length - 1];
//     return last?.[metricKey] || 0;
//   };

//   const getMOM = (metricKey) => {
//     const len = monthlyData.length;
//     if (len < 2) return 0;
//     return calculateChange(monthlyData[len - 1][metricKey], monthlyData[len - 2][metricKey]);
//   };

//   const getYOY = (metricKey) => {
//     const lastMonth = monthlyData[monthlyData.length - 1]?.month;
//     const lastYear = dayjs(lastMonth).subtract(1, "year").format("YYYY-MM");

//     const curr = monthlyData.find(m => m.month === lastMonth)?.[metricKey] || 0;
//     const prev = monthlyData.find(m => m.month === lastYear)?.[metricKey] || 0;
//     return calculateChange(curr, prev);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">📊 Quick Commerce Metrics</h2>
//       <div className="flex flex-wrap gap-6">
//         {metrics.map((metric) => (
//           <QuickCommerceCard
//             key={metric.key}
//             title={metric.title}
//             value={getLatestMetric(metric.key)}
//             mom={getMOM(metric.key)}
//             yoy={getYOY(metric.key)}
//             data={monthlyData}
//             dataKey={metric.key}
//             avgLabel={metric.avgLabel}
//             valueType={metric.valueType}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuickCommerce;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Number(value).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [monthlySummary, setMonthlySummary] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map((row) => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//       computeMonthlySummary(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach((row) => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map((row) => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? (total["Fulfilled PO Qty"] / total["PO Qty"]) * 100
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const computeMonthlySummary = (rows) => {
//     const grouped = {};
//     rows.forEach((row) => {
//       const month = row["Year-Month"];
//       if (!grouped[month]) {
//         grouped[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }
//       grouped[month].Revenue += row.Revenue;
//       grouped[month]["PO Sales"] += row["PO Sales"];
//       grouped[month]["Revenue Lost"] += row["Revenue Lost"];
//       grouped[month]["PO Qty"] += row["PO Qty"];
//       grouped[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const result = Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
//     setMonthlySummary(result);
//   };

//   const renderGraphCard = (title, key, color) => (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
//       <ResponsiveContainer width="100%" height={100}>
//         <LineChart data={monthlySummary}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="month" tick={{ fontSize: 10 }} />
//           <YAxis tick={{ fontSize: 10 }} />
//           <Tooltip formatter={(value) => formatNumber(value)} />
//           <Line
//             type="monotone"
//             dataKey={key}
//             stroke={color}
//             strokeWidth={2}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Line Graphs */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             {renderGraphCard("PO Sales Trend", "PO Sales", "#8B5CF6")}
//             {renderGraphCard("Revenue Trend", "Revenue", "#10B981")}
//             {renderGraphCard("Revenue Lost Trend", "Revenue Lost", "#EF4444")}
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement
// );

// const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Number(value).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       // Clean numbers
//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     // Calculate fulfillment rate for each month
//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     // Sort by month
//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     // Totals
//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? (total["Fulfilled PO Qty"] / total["PO Qty"]) * 100
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   // const chartOptions = {
//   //   responsive: true,
//   //   plugins: {
//   //     legend: {
//   //       position: "top",
//   //     },
//   //     tooltip: {
//   //       callbacks: {
//   //         label: function(context) {
//   //           let label = context.dataset.label || "";
//   //           if (label) {
//   //             label += ": ";
//   //           }
//   //           if (context.parsed.y !== null) {
//   //             if (["PO Sales", "Revenue", "Revenue Lost"].includes(context.dataset.label)) {
//   //               label += formatCurrency(context.parsed.y);
//   //             } else if (["PO Qty", "Fulfilled PO Qty"].includes(context.dataset.label)) {
//   //               label += formatNumber(context.parsed.y);
//   //             } else if (context.dataset.label === "Avg. Fulfillment Rate (%)") {
//   //               label += formatPercentage(context.parsed.y);
//   //             }
//   //           }
//   //           return label;
//   //         },
//   //       },
//   //     },
//   //   },
//   //   scales: {
//   //     y: {
//   //       beginAtZero: true,
//   //       ticks: {
//   //         callback: function(value) {
//   //           if (["PO Sales", "Revenue", "Revenue Lost"].includes(this.scale.ctx.dataset.label)) {
//   //             return formatCurrency(value);
//   //           } else if (["PO Qty", "Fulfilled PO Qty"].includes(this.scale.ctx.dataset.label)) {
//   //             return formatNumber(value);
//   //           } else if (this.scale.ctx.dataset.label === "Avg. Fulfillment Rate (%)") {
//   //             return formatPercentage(value);
//   //           }
//   //           return value;
//   //         },
//   //       },
//   //     },
//   //   },
//   // };

//   const chartOptions = (metric) => ({
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     tooltip: {
//       callbacks: {
//         label: function(context) {
//           let label = context.dataset.label || "";
//           if (label) {
//             label += ": ";
//           }
//           if (context.parsed.y !== null) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               label += formatCurrency(context.parsed.y);
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               label += formatNumber(context.parsed.y);
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               label += formatPercentage(context.parsed.y);
//             }
//           }
//           return label;
//         },
//       },
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         callback: function(value) {
//           if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//             return formatCurrency(value);
//           } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//             return formatNumber(value);
//           } else if (metric === "Avg. Fulfillment Rate (%)") {
//             return formatPercentage(value);
//           }
//           return value;
//         },
//       },
//     },
//   },
// });

//   // const renderChart = (metric, index) => {
//   //   const chartData = {
//   //     labels: timeSeriesData.map(item => item.month),
//   //     datasets: [
//   //       {
//   //         label: metric,
//   //         data: timeSeriesData.map(item => item[metric]),
//   //         backgroundColor: [
//   //           "#3b82f6",
//   //           "#10b981",
//   //           "#f59e0b",
//   //           "#ef4444",
//   //           "#8b5cf6",
//   //           "#ec4899",
//   //         ][index % 6],
//   //         borderColor: [
//   //           "#2563eb",
//   //           "#059669",
//   //           "#d97706",
//   //           "#dc2626",
//   //           "#7c3aed",
//   //           "#db2777",
//   //         ][index % 6],
//   //         borderWidth: 1,
//   //       },
//   //     ],
//   //   };

//   //   return (
//   //     <div key={metric} className="bg-white p-4 rounded-lg shadow border mb-6">
//   //       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//   //       <div className="h-64">
//   //         {metric === "Avg. Fulfillment Rate (%)" ? (
//   //           <Line data={chartData} options={chartOptions} />
//   //         ) : (
//   //           <Bar data={chartData} options={chartOptions} />
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   const renderChart = (metric, index) => {
//   const chartData = {
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: [
//           "#3b82f6",
//           "#10b981",
//           "#f59e0b",
//           "#ef4444",
//           "#8b5cf6",
//           "#ec4899",
//         ][index % 6],
//         borderColor: [
//           "#2563eb",
//           "#059669",
//           "#d97706",
//           "#dc2626",
//           "#7c3aed",
//           "#db2777",
//         ][index % 6],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border mb-6">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         {metric === "Avg. Fulfillment Rate (%)" ? (
//           <Line data={chartData} options={chartOptions(metric)} />
//         ) : (
//           <Bar data={chartData} options={chartOptions(metric)} />
//         )}
//       </div>
//     </div>
//   );
// };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Time Series Charts */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map((metric, index) => renderChart(metric, index))}
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;






// import React, { useEffect, useState } from "react";
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

// const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Number(value).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Number(value).toFixed(1)}%`;

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       // Clean and process data
//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     // Calculate fulfillment rate for each month
//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     // Sort by month
//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
//         : 0,
//     }));

//     // Calculate totals
//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? (total["Fulfilled PO Qty"] / total["PO Qty"]) * 100
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function(value) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return formatCurrency(value);
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return formatNumber(value);
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return formatPercentage(value);
//             }
//             return value;
//           },
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Time Series Charts */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;



// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0
//     });

//     return {
//       cm1: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs) / totals.poSales) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-6 rounded-lg shadow border mb-6">
//       <h3 className="text-lg font-semibold mb-4">📊 Cost Metrics</h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {/* CM1 */}
//         <div className={`p-4 rounded text-center ${metrics.cm1 >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           <div className="text-2xl font-bold">{metrics.cm1}%</div>
//           <div className="text-sm">CM1%</div>
//         </div>
        
//         {/* CM3 */}
//         <div className={`p-4 rounded text-center ${metrics.cm3 >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           <div className="text-2xl font-bold">{metrics.cm3}%</div>
//           <div className="text-sm">CM3%</div>
//         </div>
        
//         {/* COGS */}
//         <div className="p-4 rounded text-center bg-blue-100 text-blue-800">
//           <div className="text-2xl font-bold">{metrics.cogs}%</div>
//           <div className="text-sm">COGS%</div>
//         </div>
        
//         {/* Storage Cost */}
//         <div className="p-4 rounded text-center bg-purple-100 text-purple-800">
//           <div className="text-2xl font-bold">{metrics.storageCost}%</div>
//           <div className="text-sm">Storage Cost%</div>
//         </div>
        
//         {/* TACOS */}
//         <div className="p-4 rounded text-center bg-yellow-100 text-yellow-800">
//           <div className="text-2xl font-bold">{metrics.tacos}%</div>
//           <div className="text-sm">TACOS%</div>
//         </div>
        
//         {/* Logistics Cost */}
//         <div className="p-4 rounded text-center bg-red-100 text-red-800">
//           <div className="text-2xl font-bold">{metrics.logisticsCost}%</div>
//           <div className="text-sm">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0
//     });

//     return {
//       cm1: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs) / totals.poSales) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-bold mb-4">Cost Metrics</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {/* Row 1 */}
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.cm1}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">CM1%</div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.cm3}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">CM3%</div>
//         </div>
        
//         {/* Row 2 */}
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.cogs}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">COGS%</div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">Storage Cost%</div>
//         </div>
        
//         {/* Row 3 */}
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.tacos}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">TACOS%</div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="text-3xl font-bold text-center">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-center text-gray-500 mt-1">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const PercentageMetrics = ({ data }) => {
//  const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0
//     });

//     return {
//       cm1: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs) / totals.poSales) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="mb-8">
//       <h3 className="text-lg font-semibold mb-4">Cost Metrics</h3>
//       <div className="grid grid-cols-3 gap-4">
//         {/* CM1 */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className={`text-3xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">CM1%</div>
//         </div>
        
//         {/* CM3 */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className={`text-3xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">CM3%</div>
//         </div>
        
//         {/* COGS */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className="text-3xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">COGS%</div>
//         </div>
        
//         {/* Storage Cost */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className="text-3xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">Storage Cost%</div>
//         </div>
        
//         {/* TACOS */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className="text-3xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">TACOS%</div>
//         </div>
        
//         {/* Logistics Cost */}
//         <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 w-40 h-38 flex flex-col items-center justify-center">
//           <div className="text-3xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500 mt-2">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
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

// // Formatting functions without decimals
// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       // Clean and process data
//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     // Calculate fulfillment rate for each month
//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     // Sort by month
//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     // Calculate totals
//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   // const getChartOptions = (metric) => ({
//   //   responsive: true,
//   //   plugins: {
//   //     legend: {
//   //       display: false,
//   //     },
//   //     tooltip: {
//   //       callbacks: {
//   //         label: function(context) {
//   //           if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//   //             return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//   //           } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//   //             return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//   //           } else if (metric === "Avg. Fulfillment Rate (%)") {
//   //             return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//   //           }
//   //           return context.parsed.y;
//   //         },
//   //       },
//   //     },
//   //   },
//   //   scales: {
//   //     y: {
//   //       beginAtZero: true,
//   //       grid: {
//   //         display: false,
//   //         drawBorder: false,
//   //       },
//   //       ticks: {
//   //         callback: function(value) {
//   //           if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//   //             return formatCurrency(value);
//   //           } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//   //             return formatNumber(value);
//   //           } else if (metric === "Avg. Fulfillment Rate (%)") {
//   //             return formatPercentage(value);
//   //           }
//   //           return value;
//   //         },
//   //       },
//   //     },
//   //     x: {
//   //       grid: {
//   //         display: false,
//   //       },
//   //     },
//   //   },
//   // });

//   // const getChartOptions = (metric) => ({
//   //   responsive: true,
//   //   plugins: {
//   //     legend: {
//   //       display: false,
//   //     },
//   //     tooltip: {
//   //       callbacks: {
//   //         label: function(context) {
//   //           if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//   //             return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//   //           } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//   //             return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//   //           } else if (metric === "Avg. Fulfillment Rate (%)") {
//   //             return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//   //           }
//   //           return context.parsed.y;
//   //         },
//   //       },
//   //     },
//   //   },
//   //   scales: {
//   //     y: {
//   //       beginAtZero: true,
//   //       grid: {
//   //         display: false,
//   //         drawBorder: false,
//   //       },
//   //       ticks: {
//   //         display: false, // This completely hides Y-axis values
//   //       },
//   //     },
//   //     x: {
//   //       grid: {
//   //         display: false,
//   //       },
//   //       ticks: {
//   //         callback: function(value) {
//   //           // Format x-axis labels as "Jan-2025", "Feb-2025" etc.
//   //           const [year, month] = this.getLabelForValue(value).split('-');
//   //           const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//   //                             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   //           return `${monthNames[parseInt(month) - 1]}-${year}`;
//   //         }
//   //       },
//   //     },
//   //   },
//   // });

//    const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false, // This completely hides the Y-axis including the line
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             // Format x-axis labels as "Jan-2025", "Feb-2025" etc.
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//         <PercentageMetrics data={data} />
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Time Series Charts */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;








// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;


// const SummaryView = ({ timeSeriesData }) => {
//   // Prepare and sort monthly data in descending order (newest first)
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month, // Keep original for sorting
//         Revenue: monthData.Revenue,
//         CM1: monthData["PO Sales"] - monthData["Final_Cogs"],
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: monthData["PO Sales"] - monthData["Final_Cogs"] - 
//              monthData["Logistics Cost"] - monthData["Storage Cost"]
//       };
//     });

//     // Sort in descending order (newest first)
//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   // Calculate totals
//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mr-4 flex-1">
//       <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px]">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Revenue Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
            
//             {/* CM1 Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM1</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM1)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM1)}
//               </td>
//             </tr>
            
//             {/* COGS Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">COGS</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.COGS)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.COGS)}
//               </td>
//             </tr>
            
//             {/* Logistics Cost Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Logistics</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Logistics)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Logistics)}
//               </td>
//             </tr>
            
//             {/* Storage Cost Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Storage</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Storage)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Storage)}
//               </td>
//             </tr>
            
//             {/* Ad Spend Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Ad Spend</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.AdSpend)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.AdSpend)}
//               </td>
//             </tr>
            
//             {/* CM3 Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM3</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM3)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM3)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0
//     });

//     return {
//       cm1: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs) / totals.poSales) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex-1">
//       <h3 className="text-lg font-semibold mb-4">Cost Metrics</h3>
//       <div className="grid grid-cols-3 gap-3">
//         {/* CM1 */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500">CM1%</div>
//         </div>
        
//         {/* CM3 */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500">CM3%</div>
//         </div>
        
//         {/* COGS */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500">COGS%</div>
//         </div>
        
//         {/* Storage Cost */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500">Storage Cost%</div>
//         </div>
        
//         {/* TACOS */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500">TACOS%</div>
//         </div>
        
//         {/* Logistics Cost */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row.Final_Cogs || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
         

//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Time Series Charts */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//            {/* Top Section - Summary View and Cost Metrics Side by Side */}
//           {/* <div className="flex flex-col md:flex-row gap-4 mb-6 mt-10">
//             <SummaryView timeSeriesData={timeSeriesData} />
//             <PercentageMetrics data={data} />
//           </div> */}

//           <div className="flex flex-col md:flex-row gap-4 mb-6 mt-10">
//               <div className="w-full md:w-[60%] overflow-x-auto">
//                 <SummaryView timeSeriesData={timeSeriesData} />
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <PercentageMetrics data={data} />
//               </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;




// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const SummaryView = ({ timeSeriesData }) => {
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month,
//         Revenue: monthData.Revenue,
//         CM1: monthData["PO Sales"] - monthData["Final_Cogs"],
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         CM2: (monthData["PO Sales"] - monthData["Final_Cogs"]) - 
//              (monthData["Logistics Cost"] + monthData["Storage Cost"]),
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: monthData["PO Sales"] - monthData["Final_Cogs"] - 
//              monthData["Logistics Cost"] - monthData["Storage Cost"]
//       };
//     });

//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.CM2 += curr.CM2;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     CM2: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px]">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
//              <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">COGS</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.COGS)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.COGS)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM1</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM1)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM1)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Logistics</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Logistics)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Logistics)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Storage</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Storage)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Storage)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM2</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM2)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM2)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Ad Spend</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.AdSpend)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.AdSpend)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM3</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM3)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM3)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       acc.revenue += Number(item.Revenue) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0,
//       revenue: 0
//     });

//     const cm1 = totals.poSales ? (totals.poSales - totals.finalCogs) : 0;
//     const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

//     return {
//       cm1: totals.poSales ? Math.round((cm1 / totals.poSales) * 100) : 0,
//       cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="grid grid-cols-3 gap-3">
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500">CM1%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm2}%
//           </div>
//           <div className="text-sm text-gray-500">CM2%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500">CM3%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500">COGS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500">Storage Cost%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500">TACOS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("All");
//   const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   useEffect(() => {
//     if (selectedChannel === "All") {
//       setFilteredData(data);
//       setFilteredTimeSeriesData(timeSeriesData);
//     } else {
//       setFilteredData(data.filter(item => item.Channel === selectedChannel));
      
//       const filtered = data.filter(item => item.Channel === selectedChannel);
//       const byMonth = {};

//       filtered.forEach(row => {
//         const month = row["Year-Month"];
//         if (!byMonth[month]) {
//           byMonth[month] = {
//             month,
//             Revenue: 0,
//             "PO Sales": 0,
//             "Revenue Lost": 0,
//             "PO Qty": 0,
//             "Fulfilled PO Qty": 0,
//             "Final_Cogs": 0,
//             "Logistics Cost": 0,
//             "Storage Cost": 0,
//             "Allocated Ad Spend": 0
//           };
//         }

//         byMonth[month].Revenue += row.Revenue;
//         byMonth[month]["PO Sales"] += row["PO Sales"];
//         byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//         byMonth[month]["PO Qty"] += row["PO Qty"];
//         byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//         byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//         byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//         byMonth[month]["Storage Cost"] += row["Storage Cost"];
//         byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//       });

//       const timeSeries = Object.values(byMonth).map(row => ({
//         ...row,
//         "Avg. Fulfillment Rate (%)": row["PO Qty"]
//           ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//           : 0,
//       }));

//       timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//       setFilteredTimeSeriesData(timeSeries);
//     }
//   }, [selectedChannel, data, timeSeriesData]);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row.Final_Cogs || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       setFilteredData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//     setFilteredTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto ">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           <div >
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="relative mb-6 mt-20">
//             <div className="absolute right-0 -top-8">
//               <select
//                 value={selectedChannel}
//                 onChange={(e) => setSelectedChannel(e.target.value)}
//                 className="border rounded-md px-3 py-1 text-sm bg-white shadow-sm"
//               >
//                 <option value="All">All Channels</option>
//                 <option value="Blinkit">Blinkit</option>
//                 <option value="Zepto">Zepto</option>
//                 <option value="Flipkart">Flipkart</option>
//               </select>
//             </div>
            
//             {/* <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-[60%] overflow-x-auto">
//                 <SummaryView timeSeriesData={filteredTimeSeriesData} />
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <PercentageMetrics data={filteredData} />
//               </div>
//             </div> */}
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-[60%]">
//                 <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
//                 <SummaryView timeSeriesData={filteredTimeSeriesData} />
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <h3 className="text-lg font-semibold mb-4">Cost Metrics</h3>
//                 <PercentageMetrics data={filteredData} />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;


// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const SummaryView = ({ timeSeriesData }) => {
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month,
//         Revenue: monthData.Revenue,
//         CM1: monthData["PO Sales"] - monthData["Final_Cogs"],
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         CM2: (monthData["PO Sales"] - monthData["Final_Cogs"]) - 
//              (monthData["Logistics Cost"] + monthData["Storage Cost"]),
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: monthData["PO Sales"] - monthData["Final_Cogs"] - 
//              monthData["Logistics Cost"] - monthData["Storage Cost"]
//       };
//     });

//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.CM2 += curr.CM2;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     CM2: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10 font-bold">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px] font-bold">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM1</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM1)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM1)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">COGS</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.COGS)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.COGS)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Logistics</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Logistics)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Logistics)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Storage</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Storage)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Storage)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM2</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM2)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM2)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Ad Spend</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.AdSpend)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.AdSpend)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM3</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM3)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM3)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       acc.revenue += Number(item.Revenue) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0,
//       revenue: 0
//     });

//     const cm1 = totals.poSales ? (totals.poSales - totals.finalCogs) : 0;
//     const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

//     return {
//       cm1: totals.poSales ? Math.round((cm1 / totals.poSales) * 100) : 0,
//       cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="grid grid-cols-3 gap-3">
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM1%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className={`text-2xl font-bold ${metrics.cm2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm2}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM2%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM3%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className="text-2xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">COGS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className="text-2xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">Storage Cost%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className="text-2xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">TACOS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-blue-50">
//           <div className="text-2xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("All");
//   const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   useEffect(() => {
//     if (selectedChannel === "All") {
//       setFilteredData(data);
//       setFilteredTimeSeriesData(timeSeriesData);
//     } else {
//       setFilteredData(data.filter(item => item.Channel === selectedChannel));
      
//       const filtered = data.filter(item => item.Channel === selectedChannel);
//       const byMonth = {};

//       filtered.forEach(row => {
//         const month = row["Year-Month"];
//         if (!byMonth[month]) {
//           byMonth[month] = {
//             month,
//             Revenue: 0,
//             "PO Sales": 0,
//             "Revenue Lost": 0,
//             "PO Qty": 0,
//             "Fulfilled PO Qty": 0,
//             "Final_Cogs": 0,
//             "Logistics Cost": 0,
//             "Storage Cost": 0,
//             "Allocated Ad Spend": 0
//           };
//         }

//         byMonth[month].Revenue += row.Revenue;
//         byMonth[month]["PO Sales"] += row["PO Sales"];
//         byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//         byMonth[month]["PO Qty"] += row["PO Qty"];
//         byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//         byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//         byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//         byMonth[month]["Storage Cost"] += row["Storage Cost"];
//         byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//       });

//       const timeSeries = Object.values(byMonth).map(row => ({
//         ...row,
//         "Avg. Fulfillment Rate (%)": row["PO Qty"]
//           ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//           : 0,
//       }));

//       timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//       setFilteredTimeSeriesData(timeSeries);
//     }
//   }, [selectedChannel, data, timeSeriesData]);

//   const fetchQuickCommerceData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row.Final_Cogs || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       setFilteredData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//     setFilteredTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-gray-500">Loading data...</p>
//         </div>
//       ) : (
//         <>
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="relative mb-6 mt-10 bg-gray-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-center w-full">Quick Commerce PNL</h3>
//               <div className="absolute right-4 top-4 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-200">
//                 <select
//                   value={selectedChannel}
//                   onChange={(e) => setSelectedChannel(e.target.value)}
//                   className="text-sm focus:outline-none"
//                 >
//                   <option value="All">All Channels</option>
//                   <option value="Blinkit">Blinkit</option>
//                   <option value="Zepto">Zepto</option>
//                   <option value="Flipkart">Flipkart</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-[60%]">
//                 <h4 className="text-lg font-semibold mb-2 text-center">Monthly Summary</h4>
//                 <SummaryView timeSeriesData={filteredTimeSeriesData} />
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <h4 className="text-lg font-semibold mb-2 text-center">Cost Metrics</h4>
//                 <PercentageMetrics data={filteredData} />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;






// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const SummaryView = ({ timeSeriesData }) => {
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
//       const cm1 = monthData["Revenue"] - monthData["Final_Cogs"];
//       const cm2 = cm1 - 
//              (monthData["Logistics Cost"] + monthData["Storage Cost"])
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month,
//         Revenue: monthData.Revenue,
//         CM1: cm1,
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         CM2: cm2,
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: cm2 - monthData["Allocated Ad Spend"]
//       };
//     });

//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.CM2 += curr.CM2;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     CM2: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10 font-bold">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px] font-bold">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM1</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM1)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM1)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">COGS</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.COGS)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.COGS)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Logistics</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Logistics)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Logistics)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Storage</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Storage)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Storage)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM2</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM2)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM2)}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Ad Spend</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.AdSpend)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.AdSpend)}
//               </td>
//             </tr>
//             <tr className="border-b bg-blue-50">
//               <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM3</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3 bg-blue-50">
//                   {formatCurrency(month.CM3)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold bg-blue-50">
//                 {formatCurrency(totals.CM3)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       acc.revenue += Number(item.Revenue) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0,
//       revenue: 0
//     });

//     const cm1 = totals.revenue ? (totals.revenue - totals.finalCogs) : 0;
//     const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

//     return {
//       cm1: totals.revenue ? Math.round((cm1 / totals.revenue) * 100) : 0,
//       cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
//       cm3: totals.revenue ? Math.round(((totals.revenue - totals.finalCogs - (totals.logisticsCost + totals.storageCost) - totals.adSpend) / totals.revenue) * 100) : 0,
//       cogs: totals.revenue ? Math.round((totals.finalCogs / totals.revenue) * 100) : 0,
//       storageCost: totals.revenue ? Math.round((totals.storageCost / totals.revenue) * 100) : 0,
//       tacos: totals.revenue ? Math.round((totals.adSpend / totals.revenue) * 100) : 0,
//       logisticsCost: totals.revenue ? Math.round((totals.logisticsCost / totals.revenue) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     // <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//     <div className=" h-full">
//       <div className="grid grid-cols-3 gap-3">
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM1%</div>
//         </div>
//          <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className="text-2xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">COGS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className="text-2xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">Logistics Cost%</div>
//         </div>
//          <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className="text-2xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">Storage Cost%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className={`text-2xl font-bold ${metrics.cm2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm2}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM2%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className="text-2xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">TACOS%</div>
//         </div>
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
//           <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">CM3%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TopSKUsChart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <div className="text-gray-500">No SKU data available</div>;
//   }

//   // Aggregate revenue by SKU
//   const skuRevenueMap = {};
//   data.forEach(item => {
//     if (!item.SKU) return;
//     if (!skuRevenueMap[item.SKU]) {
//       skuRevenueMap[item.SKU] = 0;
//     }
//     skuRevenueMap[item.SKU] += Number(item.Revenue) || 0;
//   });

//   // Sort by revenue and get top 10
//   const topSKUs = Object.entries(skuRevenueMap)
//     .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
//     .slice(0, 10)
//     .map(([sku, revenue]) => ({ sku, revenue }));

//   const chartData = {
//     labels: topSKUs.map(item => item.sku),
//     datasets: [{
//       label: 'Revenue',
//       data: topSKUs.map(item => item.revenue),
//       backgroundColor: '#3b82f6',
//       borderColor: '#2563eb',
//       borderWidth: 1,
//     }],
//   };


//   const options = {
//   indexAxis: 'y',
//   responsive: true,
//   plugins: {
//     legend: { display: false },
//     tooltip: {
//       callbacks: {
//         label: (context) => `Revenue: ${formatCurrency(context.raw)}`
//       }
//     }
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false  // Hides x-axis grid lines
//       },
//       ticks: {
//         callback: (value) => `₹${value / 1000}K`
//       }
//     },
//     y: {
//       grid: {
//         display: false
//       },
//       ticks: {
//         callback: (_, index) => topSKUs[index].sku
//       }
//     }
//   }
// };

//   return (
//     <div className="h-96">
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("All");
//   const [selectedMonth, setSelectedMonth] = useState("All");
//   const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [availableMonths, setAvailableMonths] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   useEffect(() => {
//     if (data.length > 0) {
//       // Extract unique months from data
//       const months = [...new Set(data.map(item => item["Year-Month"]))].sort();
//       const formattedMonths = months.map(month => {
//         const [year, monthNum] = month.split('-');
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         return {
//           value: month,
//           label: `${monthNames[parseInt(monthNum) - 1]}-${year.slice(2)}`
//         };
//       });
//       setAvailableMonths([{ value: "All", label: "All Months" }, ...formattedMonths]);
//     }
//   }, [data]);

//   useEffect(() => {
//     let filtered = [...data];
    
//     // Apply channel filter
//     if (selectedChannel !== "All") {
//       filtered = filtered.filter(item => item.Channel === selectedChannel);
//     }
    
//     // Apply month filter
//     if (selectedMonth !== "All") {
//       filtered = filtered.filter(item => item["Year-Month"] === selectedMonth);
//     }
    
//     setFilteredData(filtered);
    
//     // Prepare time series data based on filters
//     const byMonth = {};
    
//     filtered.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setFilteredTimeSeriesData(timeSeries);
    
//     // Update channel summary based on filtered data
//     computeSummary(filtered);
//   }, [selectedChannel, selectedMonth, data, timeSeriesData]);

//   const fetchQuickCommerceData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row.Final_Cogs || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       setFilteredData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//     setFilteredTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-[#D4EAD9]">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-gray-500">Loading data...</p>
//         </div>
//       ) : (
//         <>
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-4 rounded-lg mb-6">
//               <div className="bg-white p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-white p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-white p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-white p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-white p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-white p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           <div className="mt-8 ">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto bg-white">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="relative mb-6 mt-10  p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-4 bg-gray-100 px-3  py-3">
//               <h3 className="text-xl font-bold text-center w-full">Quick Commerce PNL</h3>
//               <div className="absolute right-4 top-4 flex gap-2">
//                 <div className="bg-white px-3 py-1 mt-2 mr-2 rounded-md shadow-sm border border-gray-200">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                     className="text-sm focus:outline-none"
//                   >
//                     {availableMonths.map((month, index) => (
//                       <option key={index} value={month.value}>{month.label}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="bg-white px-3 py-1 mt-2 mr-2 rounded-md shadow-sm border border-gray-200">
//                   <select
//                     value={selectedChannel}
//                     onChange={(e) => setSelectedChannel(e.target.value)}
//                     className="text-sm focus:outline-none"
//                   >
//                     <option value="All">All Channels</option>
//                     <option value="Blinkit">Blinkit</option>
//                     <option value="Zepto">Zepto</option>
//                     <option value="Flipkart">Flipkart</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full md:w-[60%]">
//                   <h4 className="text-lg font-semibold mb-2 text-center">Monthly Summary</h4>
//                   <SummaryView timeSeriesData={filteredTimeSeriesData} />
//                 </div>
//                 <div className="w-full md:w-[40%]">
//                   <h4 className="text-lg font-semibold mb-2 text-center">Cost Metrics</h4>
//                   <PercentageMetrics data={filteredData} />
//                 </div>
//               </div>
              
//              <div className="mt-8 bg-white p-4 rounded-lg shadow-md border border-gray-100">
//               <h3 className="text-xl font-bold mb-4">📊 Top 10 SKUs by Revenue</h3>
//               <TopSKUsChart data={filteredData} />
//             </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Channels from "./ChannelPerformance";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChannelPerformance from "./ChannelPerformance";
import Channel from "./Channel";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper functions
const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// SummaryView Component
const SummaryView = ({ timeSeriesData }) => {
  const prepareMonthlySummary = () => {
    const monthlyData = timeSeriesData.map(monthData => {
      const [year, monthNum] = monthData.month.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = monthNames[parseInt(monthNum) - 1];
      const cm1 = monthData["Revenue"] - monthData["Final_Cogs"];
      const cm2 = cm1 - (monthData["Logistics Cost"] + monthData["Storage Cost"]);
      
      return {
        month: `${monthName}-${year}`,
        sortKey: monthData.month,
        Revenue: monthData.Revenue,
        CM1: cm1,
        COGS: monthData["Final_Cogs"],
        Logistics: monthData["Logistics Cost"],
        Storage: monthData["Storage Cost"],
        CM2: cm2,
        AdSpend: monthData["Allocated Ad Spend"],
        CM3: cm2 - monthData["Allocated Ad Spend"]
      };
    });

    return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  };

  const monthlyData = prepareMonthlySummary();

  const totals = monthlyData.reduce((acc, curr) => {
    acc.Revenue += curr.Revenue;
    acc.CM1 += curr.CM1;
    acc.COGS += curr.COGS;
    acc.Logistics += curr.Logistics;
    acc.Storage += curr.Storage;
    acc.CM2 += curr.CM2;
    acc.AdSpend += curr.AdSpend;
    acc.CM3 += curr.CM3;
    return acc;
  }, {
    Revenue: 0,
    CM1: 0,
    COGS: 0,
    Logistics: 0,
    Storage: 0,
    CM2: 0,
    AdSpend: 0,
    CM3: 0
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 sticky left-0 bg-white z-10 font-bold">Metric</th>
              {monthlyData.map((month, index) => (
                <th key={index} className="text-right py-2 px-3 min-w-[120px] font-bold">
                  {month.month}
                </th>
              ))}
              <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Revenue</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3">
                  {formatCurrency(month.Revenue)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold">
                {formatCurrency(totals.Revenue)}
              </td>
            </tr>
            <tr className="border-b bg-blue-50">
              <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM1</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3 bg-blue-50">
                  {formatCurrency(month.CM1)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold bg-blue-50">
                {formatCurrency(totals.CM1)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">COGS</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3">
                  {formatCurrency(month.COGS)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold">
                {formatCurrency(totals.COGS)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Logistics</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3">
                  {formatCurrency(month.Logistics)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold">
                {formatCurrency(totals.Logistics)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Storage</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3">
                  {formatCurrency(month.Storage)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold">
                {formatCurrency(totals.Storage)}
              </td>
            </tr>
            <tr className="border-b bg-blue-50">
              <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM2</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3 bg-blue-50">
                  {formatCurrency(month.CM2)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold bg-blue-50">
                {formatCurrency(totals.CM2)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Ad Spend</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3">
                  {formatCurrency(month.AdSpend)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold">
                {formatCurrency(totals.AdSpend)}
              </td>
            </tr>
            <tr className="border-b bg-blue-50">
              <td className="py-2 px-3 sticky left-0 bg-blue-50 z-10 font-bold">CM3</td>
              {monthlyData.map((month, index) => (
                <td key={index} className="text-right py-2 px-3 bg-blue-50">
                  {formatCurrency(month.CM3)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold bg-blue-50">
                {formatCurrency(totals.CM3)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PercentageMetrics Component
const PercentageMetrics = ({ data }) => {
  const calculateMetrics = () => {
    if (!data || data.length === 0) return {};

    const totals = data.reduce((acc, item) => {
      acc.finalCogs += Number(item.Final_Cogs) || 0;
      acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
      acc.storageCost += Number(item["Storage Cost"]) || 0;
      acc.poSales += Number(item["PO Sales"]) || 0;
      acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
      acc.revenue += Number(item.Revenue) || 0;
      return acc;
    }, {
      finalCogs: 0,
      logisticsCost: 0,
      storageCost: 0,
      poSales: 0,
      adSpend: 0,
      revenue: 0
    });

    const cm1 = totals.revenue ? (totals.revenue - totals.finalCogs) : 0;
    const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

    return {
      cm1: totals.revenue ? Math.round((cm1 / totals.revenue) * 100) : 0,
      cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
      cm3: totals.revenue ? Math.round(((totals.revenue - totals.finalCogs - (totals.logisticsCost + totals.storageCost) - totals.adSpend) / totals.revenue) * 100) : 0,
      cogs: totals.revenue ? Math.round((totals.finalCogs / totals.revenue) * 100) : 0,
      storageCost: totals.revenue ? Math.round((totals.storageCost / totals.revenue) * 100) : 0,
      tacos: totals.revenue ? Math.round((totals.adSpend / totals.revenue) * 100) : 0,
      logisticsCost: totals.revenue ? Math.round((totals.logisticsCost / totals.revenue) * 100) : 0
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.cm1}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">CM1%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className="text-2xl font-bold text-blue-600">
            {metrics.cogs}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">COGS%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className="text-2xl font-bold text-red-600">
            {metrics.logisticsCost}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">Logistics Cost%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className="text-2xl font-bold text-purple-600">
            {metrics.storageCost}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">Storage Cost%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className={`text-2xl font-bold ${metrics.cm2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.cm2}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">CM2%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className="text-2xl font-bold text-yellow-600">
            {metrics.tacos}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">TACOS%</div>
        </div>
        <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center bg-white">
          <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.cm3}%
          </div>
          <div className="text-sm text-gray-500 font-semibold">CM3%</div>
        </div>
      </div>
    </div>
  );
};

// TopSKUsChart Component
const TopSKUsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No SKU data available</div>;
  }

  const skuRevenueMap = {};
  data.forEach(item => {
    if (!item.SKU) return;
    if (!skuRevenueMap[item.SKU]) {
      skuRevenueMap[item.SKU] = 0;
    }
    skuRevenueMap[item.SKU] += Number(item.Revenue) || 0;
  });

  const topSKUs = Object.entries(skuRevenueMap)
    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
    .slice(0, 10)
    .map(([sku, revenue]) => ({ sku, revenue }));

  const chartData = {
    labels: topSKUs.map(item => item.sku),
    datasets: [{
      label: 'Revenue',
      data: topSKUs.map(item => item.revenue),
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 1,
    }],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Revenue: ${formatCurrency(context.raw)}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          callback: (value) => `₹${value / 1000}K`
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          callback: (_, index) => topSKUs[index].sku
        }
      }
    }
  };

  return (
    <div className="h-96">
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Tab Components
const DemandSupplyTab = () => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
    <h2 className="text-2xl font-bold mb-4">Demand & Supply Dashboard</h2>
    <p className="text-gray-500">This is a placeholder for the Demand & Supply dashboard content.</p>
  </div>
);

const ProfitLossTab = () => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
    <h2 className="text-2xl font-bold mb-4">Profit & Loss Dashboard</h2>
    <p className="text-gray-500">This is a placeholder for the Profit & Loss dashboard content.</p>
  </div>
);

// QuickCommerceTab Component
const QuickCommerceTab = ({ 
  loading, 
  totals, 
  timeSeriesData, 
  channelSummary, 
  selectedChannel, 
  setSelectedChannel, 
  selectedMonth, 
  setSelectedMonth, 
  availableMonths, 
  filteredTimeSeriesData, 
  filteredData 
}) => {
  const getChartOptions = (metric) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
              return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
            } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
              return ` ${metric}: ${formatNumber(context.parsed.y)}`;
            } else if (metric === "Avg. Fulfillment Rate (%)") {
              return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
            }
            return context.parsed.y;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            const [year, month] = this.getLabelForValue(value).split('-');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${monthNames[parseInt(month) - 1]}-${year}`;
          }
        },
      },
    },
  });

  const getChartData = (metric) => ({
    labels: timeSeriesData.map(item => item.month),
    datasets: [
      {
        label: metric,
        data: timeSeriesData.map(item => item[metric]),
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
    ],
  });

  const renderChart = (metric) => (
    <div key={metric} className="bg-white p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-4">{metric}</h3>
      <div className="h-64">
        <Bar 
          data={getChartData(metric)} 
          options={getChartOptions(metric)} 
        />
      </div>
    </div>
  );

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg mb-6">
          <div className="bg-white p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
          <div className="bg-white p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
          <div className="bg-white p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
          <div className="bg-white p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
          <div className="bg-white p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
          <div className="bg-white p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "PO Sales",
            "Revenue",
            "Revenue Lost",
            "PO Qty",
            "Fulfilled PO Qty",
            "Avg. Fulfillment Rate (%)",
          ].map(metric => renderChart(metric))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100 text-xs font-semibold">
              <tr>
                <th className="px-3 py-2 border">Channel</th>
                <th className="px-3 py-2 border">Total Revenue</th>
                <th className="px-3 py-2 border">Total PO Sales</th>
                <th className="px-3 py-2 border">Revenue Lost</th>
                <th className="px-3 py-2 border">Total PO Qty</th>
                <th className="px-3 py-2 border">Fulfilled PO Qty</th>
                <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {channelSummary.map((row, idx) => (
                <tr
                  key={idx}
                  className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
                >
                  <td className="px-3 py-2 border">{row.Channel}</td>
                  <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
                  <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
                  <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
                  <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
                  <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
                  <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative mb-6 mt-10 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-gray-100 px-3 py-3">
          <h3 className="text-xl font-bold text-center w-full">Quick Commerce PNL</h3>
          <div className="absolute right-4 top-4 flex gap-2">
            <div className="bg-white px-3 py-1 mt-2 mr-2 rounded-md shadow-sm border border-gray-200">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-sm focus:outline-none"
              >
                {availableMonths.map((month, index) => (
                  <option key={index} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
            <div className="bg-white px-3 py-1 mt-2 mr-2 rounded-md shadow-sm border border-gray-200">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="text-sm focus:outline-none"
              >
                <option value="All">All Channels</option>
                <option value="Blinkit">Blinkit</option>
                <option value="Zepto">Zepto</option>
                <option value="Flipkart">Flipkart</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[60%]">
              <h4 className="text-lg font-semibold mb-2 text-center">Monthly Summary</h4>
              <SummaryView timeSeriesData={filteredTimeSeriesData} />
            </div>
            <div className="w-full md:w-[40%]">
              <h4 className="text-lg font-semibold mb-2 text-center">Cost Metrics</h4>
              <PercentageMetrics data={filteredData} />
            </div>
          </div>
          
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-4">📊 Top 10 SKUs by Revenue</h3>
            <TopSKUsChart data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

// Main QuickCommerce Component
const QuickCommerce = ({ defaultTab = "quickCommerce" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [data, setData] = useState([]);
  const [channelSummary, setChannelSummary] = useState([]);
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  // const [activeTab, setActiveTab] = useState("quickCommerce");

  const fetchQuickCommerceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/quick-commerce");
      const records = response.data;

      const cleaned = records.map(row => ({
        ...row,
        Revenue: +row.Revenue || 0,
        "PO Sales": +row["PO Sales"] || 0,
        "Revenue Lost": +row["Revenue Lost"] || 0,
        "PO Qty": +row["PO Qty"] || 0,
        "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
        "Final_Cogs": +row.Final_Cogs || 0,
        "Logistics Cost": +row["Logistics Cost"] || 0,
        "Storage Cost": +row["Storage Cost"] || 0,
        "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
        Channel: row.Channel || "Unknown",
      }));

      setData(cleaned);
      setFilteredData(cleaned);
      computeSummary(cleaned);
      prepareTimeSeriesData(cleaned);
    } catch (err) {
      console.error("Error fetching quick commerce data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "quickCommerce") {
      navigate("/quick-commerce");
    } else if (tabId === "channelPerformance") {
      navigate("/quick-commerce/channel-performance");
    } else if(tabId == "demandSupply"){
      navigate("/quick-commerce/demandSupply");
    }
    // Add other tabs if needed
  };


  const prepareTimeSeriesData = (records) => {
    const byMonth = {};

    records.forEach(row => {
      const month = row["Year-Month"];
      if (!byMonth[month]) {
        byMonth[month] = {
          month,
          Revenue: 0,
          "PO Sales": 0,
          "Revenue Lost": 0,
          "PO Qty": 0,
          "Fulfilled PO Qty": 0,
          "Final_Cogs": 0,
          "Logistics Cost": 0,
          "Storage Cost": 0,
          "Allocated Ad Spend": 0
        };
      }

      byMonth[month].Revenue += row.Revenue;
      byMonth[month]["PO Sales"] += row["PO Sales"];
      byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
      byMonth[month]["PO Qty"] += row["PO Qty"];
      byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
      byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
      byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
      byMonth[month]["Storage Cost"] += row["Storage Cost"];
      byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
    });

    const timeSeries = Object.values(byMonth).map(row => ({
      ...row,
      "Avg. Fulfillment Rate (%)": row["PO Qty"]
        ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
        : 0,
    }));

    timeSeries.sort((a, b) => a.month.localeCompare(b.month));
    setTimeSeriesData(timeSeries);
    setFilteredTimeSeriesData(timeSeries);
  };

  const computeSummary = (rows) => {
    const byChannel = {};

    rows.forEach(row => {
      const ch = row.Channel;
      if (!byChannel[ch]) {
        byChannel[ch] = {
          Channel: ch,
          Revenue: 0,
          "PO Sales": 0,
          "Revenue Lost": 0,
          "PO Qty": 0,
          "Fulfilled PO Qty": 0,
        };
      }

      byChannel[ch].Revenue += row.Revenue;
      byChannel[ch]["PO Sales"] += row["PO Sales"];
      byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
      byChannel[ch]["PO Qty"] += row["PO Qty"];
      byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
    });

    const summaryList = Object.values(byChannel).map(row => ({
      ...row,
      "Avg. Fulfillment Rate (%)": row["PO Qty"]
        ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
        : 0,
    }));

    const total = summaryList.reduce(
      (acc, curr) => {
        acc.Revenue += curr.Revenue;
        acc["PO Sales"] += curr["PO Sales"];
        acc["Revenue Lost"] += curr["Revenue Lost"];
        acc["PO Qty"] += curr["PO Qty"];
        acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
        return acc;
      },
      {
        Revenue: 0,
        "PO Sales": 0,
        "Revenue Lost": 0,
        "PO Qty": 0,
        "Fulfilled PO Qty": 0,
      }
    );

    total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
      ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
      : 0;

    summaryList.push({ Channel: "Total", ...total });
    setChannelSummary(summaryList);
    setTotals(total);
  };

  useEffect(() => {
    fetchQuickCommerceData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const months = [...new Set(data.map(item => item["Year-Month"]))].sort();
      const formattedMonths = months.map(month => {
        const [year, monthNum] = month.split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return {
          value: month,
          label: `${monthNames[parseInt(monthNum) - 1]}-${year.slice(2)}`
        };
      });
      setAvailableMonths([{ value: "All", label: "All Months" }, ...formattedMonths]);
    }
  }, [data]);

  useEffect(() => {
    let filtered = [...data];
    
    if (selectedChannel !== "All") {
      filtered = filtered.filter(item => item.Channel === selectedChannel);
    }
    
    if (selectedMonth !== "All") {
      filtered = filtered.filter(item => item["Year-Month"] === selectedMonth);
    }
    
    setFilteredData(filtered);
    
    const byMonth = {};
    
    filtered.forEach(row => {
      const month = row["Year-Month"];
      if (!byMonth[month]) {
        byMonth[month] = {
          month,
          Revenue: 0,
          "PO Sales": 0,
          "Revenue Lost": 0,
          "PO Qty": 0,
          "Fulfilled PO Qty": 0,
          "Final_Cogs": 0,
          "Logistics Cost": 0,
          "Storage Cost": 0,
          "Allocated Ad Spend": 0
        };
      }

      byMonth[month].Revenue += row.Revenue;
      byMonth[month]["PO Sales"] += row["PO Sales"];
      byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
      byMonth[month]["PO Qty"] += row["PO Qty"];
      byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
      byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
      byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
      byMonth[month]["Storage Cost"] += row["Storage Cost"];
      byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
    });

    const timeSeries = Object.values(byMonth).map(row => ({
      ...row,
      "Avg. Fulfillment Rate (%)": row["PO Qty"]
        ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
        : 0,
    }));

    timeSeries.sort((a, b) => a.month.localeCompare(b.month));
    setFilteredTimeSeriesData(timeSeries);
    
    computeSummary(filtered);
  }, [selectedChannel, selectedMonth, data, timeSeriesData]);

  const tabs = [
    { id: "quickCommerce", label: "Executive" },
    { id: "channelPerformance", label: "Channel Performance" },
    { id: "demandSupply", label: "Demand & Supply" },
    // { id: "profitLoss", label: "Profit & Loss" },
    
  ];

  // return (
  //   <div className="p-6 max-w-7xl mx-auto bg-[#D4EAD9]">
  //     <div className="flex border-b border-gray-200 mb-6">
  //       {tabs.map((tab) => (
  //         <button
  //           key={tab.id}
  //           className={`px-4 py-2 font-medium text-sm focus:outline-none ${
  //             activeTab === tab.id
  //               ? "border-b-2 border-blue-500 text-blue-600"
  //               : "text-gray-500 hover:text-gray-700"
  //           }`}
  //           // onClick={() => setActiveTab(tab.id)}
  //             onClick={() => handleTabChange(tab.id)}
  //         >
  //           {tab.label}
  //         </button>
  //       ))}
  //     </div>

  //     {loading ? (
  //       <div className="flex justify-center items-center h-64">
  //         <p className="text-gray-500">Loading data...</p>
  //       </div>
  //     ) : (
  //       <>
  //         {activeTab === "demandSupply" && <DemandSupplyTab />}
  //         {activeTab === "profitLoss" && <ProfitLossTab />}
  //         {activeTab === "quickCommerce" && (
  //           <QuickCommerceTab 
  //             loading={loading}
  //             totals={totals}
  //             timeSeriesData={timeSeriesData}
  //             channelSummary={channelSummary}
  //             selectedChannel={selectedChannel}
  //             setSelectedChannel={setSelectedChannel}
  //             selectedMonth={selectedMonth}
  //             setSelectedMonth={setSelectedMonth}
  //             availableMonths={availableMonths}
  //             filteredTimeSeriesData={filteredTimeSeriesData}
  //             filteredData={filteredData}
  //           />
  //         )}
          
  //         {/* {activeTab === "channelPerformance" && <Channel />} */}
  //         {activeTab === "channelPerformance" && <Outlet />}
  //       </>
  //     )}
  //   </div>
  // );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#D4EAD9]">
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        <>
          {activeTab === "demandSupply" && <DemandSupplyTab />}
          {activeTab === "profitLoss" && <ProfitLossTab />}
          {activeTab === "quickCommerce" && (
             <QuickCommerceTab 
              loading={loading}
              totals={totals}
              timeSeriesData={timeSeriesData}
              channelSummary={channelSummary}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              availableMonths={availableMonths}
              filteredTimeSeriesData={filteredTimeSeriesData}
              filteredData={filteredData}
            />
          )}
          
          {activeTab === "channelPerformance" && <ChannelPerformance />}
        </>
      )}
    </div>
  );

};

export default QuickCommerce;

// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const TopSKUsChart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <div className="text-gray-500">No SKU data available</div>;
//   }

//   // Aggregate revenue by SKU
//   const skuRevenueMap = {};
//   data.forEach(item => {
//     if (!item.SKU) return;
//     if (!skuRevenueMap[item.SKU]) {
//       skuRevenueMap[item.SKU] = 0;
//     }
//     skuRevenueMap[item.SKU] += Number(item.Revenue) || 0;
//   });

//   // Sort by revenue and get top 10
//   const topSKUs = Object.entries(skuRevenueMap)
//     .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
//     .slice(0, 10)
//     .map(([sku, revenue]) => ({ sku, revenue }));

//   const chartData = {
//     labels: topSKUs.map(item => item.sku),
//     datasets: [{
//       label: 'Revenue',
//       data: topSKUs.map(item => item.revenue),
//       backgroundColor: '#3b82f6',
//       borderColor: '#2563eb',
//       borderWidth: 1,
//     }],
//   };

//   const options = {
//     indexAxis: 'y',
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: (context) => `Revenue: ${formatCurrency(context.raw)}`
//         }
//       }
//     },
//     scales: {
//       x: {
//         ticks: {
//           callback: (value) => `₹${value / 1000}K`
//         }
//       },
//       y: {
//         ticks: {
//           // Show full SKU names on y-axis
//           callback: (_, index) => topSKUs[index].sku
//         }
//       }
//     }
//   };

//   return (
//     <div className="h-96">
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// const SummaryView = ({ timeSeriesData }) => {
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month,
//         Revenue: monthData.Revenue,
//         CM1: monthData["PO Sales"] - monthData["Final_Cogs"],
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         CM2: (monthData["PO Sales"] - monthData["Final_Cogs"]) - 
//              (monthData["Logistics Cost"] + monthData["Storage Cost"]),
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: monthData["PO Sales"] - monthData["Final_Cogs"] - 
//              monthData["Logistics Cost"] - monthData["Storage Cost"]
//       };
//     });

//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.CM2 += curr.CM2;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     CM2: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10 font-bold">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px] font-bold">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10 font-bold">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
//             {/* Rest of your table rows... */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const PercentageMetrics = ({ data }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       acc.revenue += Number(item.Revenue) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0,
//       revenue: 0
//     });

//     const cm1 = totals.poSales ? (totals.poSales - totals.finalCogs) : 0;
//     const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

//     return {
//       cm1: totals.poSales ? Math.round((cm1 / totals.poSales) * 100) : 0,
//       cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
//       <div className="grid grid-cols-3 gap-3">
//         {/* Your metric boxes... */}
//       </div>
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("All");
//   const [selectedMonth, setSelectedMonth] = useState("All");
//   const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [availableMonths, setAvailableMonths] = useState([]);

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   useEffect(() => {
//     if (data.length > 0) {
//       const months = [...new Set(data.map(item => item["Year-Month"]))];
//       const formattedMonths = months.map(month => {
//         const [year, monthNum] = month.split('-');
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         const shortYear = year.slice(2);
//         return {
//           value: month,
//           label: `${monthNames[parseInt(monthNum) - 1]}-${shortYear}`
//         };
//       }).sort((a, b) => b.value.localeCompare(a.value));
      
//       setAvailableMonths(formattedMonths);
//     }
//   }, [data]);

//   useEffect(() => {
//     let filtered = [...data];
    
//     if (selectedChannel !== "All") {
//       filtered = filtered.filter(item => item.Channel === selectedChannel);
//     }
    
//     if (selectedMonth !== "All") {
//       filtered = filtered.filter(item => item["Year-Month"] === selectedMonth);
//     }
    
//     setFilteredData(filtered);
    
//     const byMonth = {};
//     filtered.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += Number(row.Revenue) || 0;
//       byMonth[month]["PO Sales"] += Number(row["PO Sales"]) || 0;
//       byMonth[month]["Revenue Lost"] += Number(row["Revenue Lost"]) || 0;
//       byMonth[month]["PO Qty"] += Number(row["PO Qty"]) || 0;
//       byMonth[month]["Fulfilled PO Qty"] += Number(row["Fulfilled PO Qty"]) || 0;
//       byMonth[month]["Final_Cogs"] += Number(row["Final_Cogs"]) || 0;
//       byMonth[month]["Logistics Cost"] += Number(row["Logistics Cost"]) || 0;
//       byMonth[month]["Storage Cost"] += Number(row["Storage Cost"]) || 0;
//       byMonth[month]["Allocated Ad Spend"] += Number(row["Allocated Ad Spend"]) || 0;
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setFilteredTimeSeriesData(timeSeries);
//     computeSummary(filtered);
//   }, [selectedChannel, selectedMonth, data]);

//   const fetchQuickCommerceData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row["Final_Cogs"] || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       setFilteredData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//     setFilteredTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-gray-500">Loading data...</p>
//         </div>
//       ) : (
//         <>
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="relative mb-6 mt-10 bg-gray-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-center w-full">Quick Commerce PNL</h3>
//               <div className="absolute right-4 top-4 flex gap-2">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="text-sm focus:outline-none bg-white px-3 py-1 rounded-md shadow-sm border border-gray-200"
//                 >
//                   <option value="All">All Months</option>
//                   {availableMonths.map((month) => (
//                     <option key={month.value} value={month.value}>{month.label}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedChannel}
//                   onChange={(e) => setSelectedChannel(e.target.value)}
//                   className="text-sm focus:outline-none bg-white px-3 py-1 rounded-md shadow-sm border border-gray-200"
//                 >
//                   <option value="All">All Channels</option>
//                   <option value="Blinkit">Blinkit</option>
//                   <option value="Zepto">Zepto</option>
//                   <option value="Flipkart">Flipkart</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-[60%]">
//                 <h4 className="text-lg font-semibold mb-2 text-center">Monthly Summary</h4>
//                 <SummaryView timeSeriesData={filteredTimeSeriesData} />
//               </div>
//               <div className="w-full md:w-[40%]">
//                 <h4 className="text-lg font-semibold mb-2 text-center">Cost Metrics</h4>
//                 <PercentageMetrics data={filteredData} />
//               </div>
//             </div>

//             <div className="mt-8 bg-white p-4 rounded-lg shadow-md border border-gray-100">
//               <h3 className="text-xl font-bold mb-4">📊 Top 10 SKUs by Revenue</h3>
//               <TopSKUsChart data={filteredData} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;


// import React, { useEffect, useState } from "react";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value) => `₹${Math.round(Number(value)).toLocaleString("en-IN")}`;
// const formatNumber = (value) => Math.round(Number(value)).toLocaleString("en-IN");
// const formatPercentage = (value) => `${Math.round(Number(value))}%`;

// const SummaryView = ({ timeSeriesData, selectedChannel }) => {
//   const prepareMonthlySummary = () => {
//     const monthlyData = timeSeriesData.map(monthData => {
//       const [year, monthNum] = monthData.month.split('-');
//       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//       const monthName = monthNames[parseInt(monthNum) - 1];
      
//       return {
//         month: `${monthName}-${year}`,
//         sortKey: monthData.month,
//         Revenue: monthData.Revenue,
//         CM1: monthData["PO Sales"] - monthData["Final_Cogs"],
//         COGS: monthData["Final_Cogs"],
//         Logistics: monthData["Logistics Cost"],
//         Storage: monthData["Storage Cost"],
//         CM2: (monthData["PO Sales"] - monthData["Final_Cogs"]) - 
//              (monthData["Logistics Cost"] + monthData["Storage Cost"]),
//         AdSpend: monthData["Allocated Ad Spend"],
//         CM3: monthData["PO Sales"] - monthData["Final_Cogs"] - 
//              monthData["Logistics Cost"] - monthData["Storage Cost"]
//       };
//     });

//     return monthlyData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
//   };

//   const monthlyData = prepareMonthlySummary();

//   const totals = monthlyData.reduce((acc, curr) => {
//     acc.Revenue += curr.Revenue;
//     acc.CM1 += curr.CM1;
//     acc.COGS += curr.COGS;
//     acc.Logistics += curr.Logistics;
//     acc.Storage += curr.Storage;
//     acc.CM2 += curr.CM2;
//     acc.AdSpend += curr.AdSpend;
//     acc.CM3 += curr.CM3;
//     return acc;
//   }, {
//     Revenue: 0,
//     CM1: 0,
//     COGS: 0,
//     Logistics: 0,
//     Storage: 0,
//     CM2: 0,
//     AdSpend: 0,
//     CM3: 0
//   });

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex-1 min-w-[600px]">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Monthly Summary</h3>
//         {selectedChannel && (
//           <span className="text-sm bg-gray-100 px-2 py-1 rounded">
//             Channel: {selectedChannel}
//           </span>
//         )}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr>
//               <th className="text-left py-2 px-3 sticky left-0 bg-white z-10">Metric</th>
//               {monthlyData.map((month, index) => (
//                 <th key={index} className="text-right py-2 px-3 min-w-[120px]">
//                   {month.month}
//                 </th>
//               ))}
//               <th className="text-right py-2 px-3 font-bold min-w-[120px]">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Revenue Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Revenue</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Revenue)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Revenue)}
//               </td>
//             </tr>
            
//             {/* CM1 Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM1</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM1)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM1)}
//               </td>
//             </tr>
            
//             {/* COGS Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">COGS</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.COGS)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.COGS)}
//               </td>
//             </tr>
            
//             {/* Logistics Cost Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Logistics</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Logistics)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Logistics)}
//               </td>
//             </tr>
            
//             {/* Storage Cost Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Storage</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.Storage)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.Storage)}
//               </td>
//             </tr>
            
//             {/* CM2 Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM2</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM2)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM2)}
//               </td>
//             </tr>
            
//             {/* Ad Spend Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">Ad Spend</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.AdSpend)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.AdSpend)}
//               </td>
//             </tr>
            
//             {/* CM3 Row */}
//             <tr className="border-b">
//               <td className="py-2 px-3 sticky left-0 bg-white z-10">CM3</td>
//               {monthlyData.map((month, index) => (
//                 <td key={index} className="text-right py-2 px-3">
//                   {formatCurrency(month.CM3)}
//                 </td>
//               ))}
//               <td className="text-right py-2 px-3 font-bold">
//                 {formatCurrency(totals.CM3)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const PercentageMetrics = ({ data, selectedChannel }) => {
//   const calculateMetrics = () => {
//     if (!data || data.length === 0) return {};

//     const totals = data.reduce((acc, item) => {
//       acc.finalCogs += Number(item.Final_Cogs) || 0;
//       acc.logisticsCost += Number(item["Logistics Cost"]) || 0;
//       acc.storageCost += Number(item["Storage Cost"]) || 0;
//       acc.poSales += Number(item["PO Sales"]) || 0;
//       acc.adSpend += Number(item["Allocated Ad Spend"]) || 0;
//       acc.revenue += Number(item.Revenue) || 0;
//       return acc;
//     }, {
//       finalCogs: 0,
//       logisticsCost: 0,
//       storageCost: 0,
//       poSales: 0,
//       adSpend: 0,
//       revenue: 0
//     });

//     const cm1 = totals.poSales ? (totals.poSales - totals.finalCogs) : 0;
//     const cm2 = cm1 - (totals.logisticsCost + totals.storageCost);

//     return {
//       cm1: totals.poSales ? Math.round((cm1 / totals.poSales) * 100) : 0,
//       cm2: totals.revenue ? Math.round((cm2 / totals.revenue) * 100) : 0,
//       cm3: totals.poSales ? Math.round(((totals.poSales - totals.finalCogs - totals.logisticsCost - totals.storageCost) / totals.poSales) * 100) : 0,
//       cogs: totals.poSales ? Math.round((totals.finalCogs / totals.poSales) * 100) : 0,
//       storageCost: totals.poSales ? Math.round((totals.storageCost / totals.poSales) * 100) : 0,
//       tacos: totals.poSales ? Math.round((totals.adSpend / totals.poSales) * 100) : 0,
//       logisticsCost: totals.poSales ? Math.round((totals.logisticsCost / totals.poSales) * 100) : 0
//     };
//   };

//   const metrics = calculateMetrics();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex-1">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Cost Metrics</h3>
//         {selectedChannel && (
//           <span className="text-sm bg-gray-100 px-2 py-1 rounded">
//             Channel: {selectedChannel}
//           </span>
//         )}
//       </div>
//       <div className="grid grid-cols-3 gap-3">
//         {/* CM1 */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm1}%
//           </div>
//           <div className="text-sm text-gray-500">CM1%</div>
//         </div>
        
//         {/* CM2 */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm2}%
//           </div>
//           <div className="text-sm text-gray-500">CM2%</div>
//         </div>
        
//         {/* CM3 */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className={`text-2xl font-bold ${metrics.cm3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {metrics.cm3}%
//           </div>
//           <div className="text-sm text-gray-500">CM3%</div>
//         </div>
        
//         {/* COGS */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-blue-600">
//             {metrics.cogs}%
//           </div>
//           <div className="text-sm text-gray-500">COGS%</div>
//         </div>
        
//         {/* Storage Cost */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {metrics.storageCost}%
//           </div>
//           <div className="text-sm text-gray-500">Storage Cost%</div>
//         </div>
        
//         {/* TACOS */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-yellow-600">
//             {metrics.tacos}%
//           </div>
//           <div className="text-sm text-gray-500">TACOS%</div>
//         </div>
        
//         {/* Logistics Cost */}
//         <div className="p-3 rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center">
//           <div className="text-2xl font-bold text-red-600">
//             {metrics.logisticsCost}%
//           </div>
//           <div className="text-sm text-gray-500">Logistics Cost%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuickCommerce = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [channelSummary, setChannelSummary] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeSeriesData, setTimeSeriesData] = useState([]);
//   const [filteredTimeSeriesData, setFilteredTimeSeriesData] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("All");

//   useEffect(() => {
//     fetchQuickCommerceData();
//   }, []);

//   useEffect(() => {
//     if (selectedChannel === "All") {
//       setFilteredData(data);
//       setFilteredTimeSeriesData(timeSeriesData);
//     } else {
//       setFilteredData(data.filter(item => item.Channel === selectedChannel));
      
//       // Filter time series data by channel
//       const filtered = data.filter(item => item.Channel === selectedChannel);
//       const byMonth = {};

//       filtered.forEach(row => {
//         const month = row["Year-Month"];
//         if (!byMonth[month]) {
//           byMonth[month] = {
//             month,
//             Revenue: 0,
//             "PO Sales": 0,
//             "Revenue Lost": 0,
//             "PO Qty": 0,
//             "Fulfilled PO Qty": 0,
//             "Final_Cogs": 0,
//             "Logistics Cost": 0,
//             "Storage Cost": 0,
//             "Allocated Ad Spend": 0
//           };
//         }

//         byMonth[month].Revenue += row.Revenue;
//         byMonth[month]["PO Sales"] += row["PO Sales"];
//         byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//         byMonth[month]["PO Qty"] += row["PO Qty"];
//         byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//         byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//         byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//         byMonth[month]["Storage Cost"] += row["Storage Cost"];
//         byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//       });

//       const timeSeries = Object.values(byMonth).map(row => ({
//         ...row,
//         "Avg. Fulfillment Rate (%)": row["PO Qty"]
//           ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//           : 0,
//       }));

//       timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//       setFilteredTimeSeriesData(timeSeries);
//     }
//   }, [selectedChannel, data, timeSeriesData]);

//   const fetchQuickCommerceData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quick-commerce");
//       const records = response.data;

//       const cleaned = records.map(row => ({
//         ...row,
//         Revenue: +row.Revenue || 0,
//         "PO Sales": +row["PO Sales"] || 0,
//         "Revenue Lost": +row["Revenue Lost"] || 0,
//         "PO Qty": +row["PO Qty"] || 0,
//         "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
//         "Final_Cogs": +row.Final_Cogs || 0,
//         "Logistics Cost": +row["Logistics Cost"] || 0,
//         "Storage Cost": +row["Storage Cost"] || 0,
//         "Allocated Ad Spend": +row["Allocated Ad Spend"] || 0,
//         Channel: row.Channel || "Unknown",
//       }));

//       setData(cleaned);
//       setFilteredData(cleaned);
//       computeSummary(cleaned);
//       prepareTimeSeriesData(cleaned);
//     } catch (err) {
//       console.error("Error fetching quick commerce data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const prepareTimeSeriesData = (records) => {
//     const byMonth = {};

//     records.forEach(row => {
//       const month = row["Year-Month"];
//       if (!byMonth[month]) {
//         byMonth[month] = {
//           month,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//           "Final_Cogs": 0,
//           "Logistics Cost": 0,
//           "Storage Cost": 0,
//           "Allocated Ad Spend": 0
//         };
//       }

//       byMonth[month].Revenue += row.Revenue;
//       byMonth[month]["PO Sales"] += row["PO Sales"];
//       byMonth[month]["Revenue Lost"] += row["Revenue Lost"];
//       byMonth[month]["PO Qty"] += row["PO Qty"];
//       byMonth[month]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//       byMonth[month]["Final_Cogs"] += row["Final_Cogs"];
//       byMonth[month]["Logistics Cost"] += row["Logistics Cost"];
//       byMonth[month]["Storage Cost"] += row["Storage Cost"];
//       byMonth[month]["Allocated Ad Spend"] += row["Allocated Ad Spend"];
//     });

//     const timeSeries = Object.values(byMonth).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     timeSeries.sort((a, b) => a.month.localeCompare(b.month));
//     setTimeSeriesData(timeSeries);
//     setFilteredTimeSeriesData(timeSeries);
//   };

//   const computeSummary = (rows) => {
//     const byChannel = {};

//     rows.forEach(row => {
//       const ch = row.Channel;
//       if (!byChannel[ch]) {
//         byChannel[ch] = {
//           Channel: ch,
//           Revenue: 0,
//           "PO Sales": 0,
//           "Revenue Lost": 0,
//           "PO Qty": 0,
//           "Fulfilled PO Qty": 0,
//         };
//       }

//       byChannel[ch].Revenue += row.Revenue;
//       byChannel[ch]["PO Sales"] += row["PO Sales"];
//       byChannel[ch]["Revenue Lost"] += row["Revenue Lost"];
//       byChannel[ch]["PO Qty"] += row["PO Qty"];
//       byChannel[ch]["Fulfilled PO Qty"] += row["Fulfilled PO Qty"];
//     });

//     const summaryList = Object.values(byChannel).map(row => ({
//       ...row,
//       "Avg. Fulfillment Rate (%)": row["PO Qty"]
//         ? Math.round((row["Fulfilled PO Qty"] / row["PO Qty"]) * 100)
//         : 0,
//     }));

//     const total = summaryList.reduce(
//       (acc, curr) => {
//         acc.Revenue += curr.Revenue;
//         acc["PO Sales"] += curr["PO Sales"];
//         acc["Revenue Lost"] += curr["Revenue Lost"];
//         acc["PO Qty"] += curr["PO Qty"];
//         acc["Fulfilled PO Qty"] += curr["Fulfilled PO Qty"];
//         return acc;
//       },
//       {
//         Revenue: 0,
//         "PO Sales": 0,
//         "Revenue Lost": 0,
//         "PO Qty": 0,
//         "Fulfilled PO Qty": 0,
//       }
//     );

//     total["Avg. Fulfillment Rate (%)"] = total["PO Qty"]
//       ? Math.round((total["Fulfilled PO Qty"] / total["PO Qty"]) * 100)
//       : 0;

//     summaryList.push({ Channel: "Total", ...total });
//     setChannelSummary(summaryList);
//     setTotals(total);
//   };

//   const getChartOptions = (metric) => ({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (["PO Sales", "Revenue", "Revenue Lost"].includes(metric)) {
//               return ` ${metric}: ${formatCurrency(context.parsed.y)}`;
//             } else if (["PO Qty", "Fulfilled PO Qty"].includes(metric)) {
//               return ` ${metric}: ${formatNumber(context.parsed.y)}`;
//             } else if (metric === "Avg. Fulfillment Rate (%)") {
//               return ` ${metric}: ${formatPercentage(context.parsed.y)}`;
//             }
//             return context.parsed.y;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         display: false,
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: function(value) {
//             const [year, month] = this.getLabelForValue(value).split('-');
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return `${monthNames[parseInt(month) - 1]}-${year}`;
//           }
//         },
//       },
//     },
//   });

//   const getChartData = (metric) => ({
//     labels: timeSeriesData.map(item => item.month),
//     datasets: [
//       {
//         label: metric,
//         data: timeSeriesData.map(item => item[metric]),
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const renderChart = (metric) => (
//     <div key={metric} className="bg-white p-4 rounded-lg shadow border">
//       <h3 className="text-lg font-semibold mb-4">{metric}</h3>
//       <div className="h-64">
//         <Bar 
//           data={getChartData(metric)} 
//           options={getChartOptions(metric)} 
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading...</p>
//       ) : (
//         <>
//           {/* Key Metrics */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
//               <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
//             </div>
//           </div>

//           {/* Time Series Charts */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📈 Monthly Trends</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "PO Sales",
//                 "Revenue",
//                 "Revenue Lost",
//                 "PO Qty",
//                 "Fulfilled PO Qty",
//                 "Avg. Fulfillment Rate (%)",
//               ].map(metric => renderChart(metric))}
//             </div>
//           </div>

//           {/* Channel Table */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-gray-100 text-xs font-semibold">
//                   <tr>
//                     <th className="px-3 py-2 border">Channel</th>
//                     <th className="px-3 py-2 border">Total Revenue</th>
//                     <th className="px-3 py-2 border">Total PO Sales</th>
//                     <th className="px-3 py-2 border">Revenue Lost</th>
//                     <th className="px-3 py-2 border">Total PO Qty</th>
//                     <th className="px-3 py-2 border">Fulfilled PO Qty</th>
//                     <th className="px-3 py-2 border">Avg. Fulfillment Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {channelSummary.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className={row.Channel === "Total" ? "font-bold bg-blue-50" : ""}
//                     >
//                       <td className="px-3 py-2 border">{row.Channel}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row.Revenue)}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["PO Sales"])}</td>
//                       <td className="px-3 py-2 border">{formatCurrency(row["Revenue Lost"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatNumber(row["Fulfilled PO Qty"])}</td>
//                       <td className="px-3 py-2 border">{formatPercentage(row["Avg. Fulfillment Rate (%)"])}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Summary View and Cost Metrics with Channel Filter */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6 mt-10">
//             <div className="w-full md:w-[60%] overflow-x-auto">
//               <div className="flex justify-end mb-2">
//                 <select
//                   value={selectedChannel}
//                   onChange={(e) => setSelectedChannel(e.target.value)}
//                   className="border rounded-md px-3 py-1 text-sm"
//                 >
//                   <option value="All">All Channels</option>
//                   <option value="Blinkit">Blinkit</option>
//                   <option value="Zepto">Zepto</option>
//                   <option value="Flipkart">Flipkart</option>
//                 </select>
//               </div>
//               <SummaryView timeSeriesData={filteredTimeSeriesData} selectedChannel={selectedChannel} />
//             </div>
//             <div className="w-full md:w-[40%]">
//               <PercentageMetrics data={filteredData} selectedChannel={selectedChannel} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuickCommerce;