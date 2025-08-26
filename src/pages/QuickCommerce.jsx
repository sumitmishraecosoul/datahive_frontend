
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
import API_BASE_URL from '../utils/apiConfig';

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
      console.log('Fetching quick commerce from:', `${API_BASE_URL}/api/quick-commerce`);
      const response = await axios.get(`${API_BASE_URL}/api/quick-commerce`);
      console.log('Quick Commerce API Response:', response.data);
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

  return (
    <div className="p-6 mx-auto bg-[#D4EAD9]">
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
