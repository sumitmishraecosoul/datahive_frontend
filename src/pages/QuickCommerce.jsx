import React, { useEffect, useState } from "react";
import axios from "axios";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
const formatNumber = (value) => Number(value).toLocaleString("en-IN");
const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

const QuickCommerce = () => {
  const [data, setData] = useState([]);
  const [channelSummary, setChannelSummary] = useState([]);
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickCommerceData();
  }, []);

  const fetchQuickCommerceData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quick-commerce");
      const records = response.data;

      // Clean numbers
      const cleaned = records.map(row => ({
        ...row,
        Revenue: +row.Revenue || 0,
        "PO Sales": +row["PO Sales"] || 0,
        "Revenue Lost": +row["Revenue Lost"] || 0,
        "PO Qty": +row["PO Qty"] || 0,
        "Fulfilled PO Qty": +row["Fulfilled PO Qty"] || 0,
        Channel: row.Channel || "Unknown",
      }));

      setData(cleaned);
      computeSummary(cleaned);
    } catch (err) {
      console.error("Error fetching quick commerce data:", err);
    } finally {
      setLoading(false);
    }
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
        ? (row["Fulfilled PO Qty"] / row["PO Qty"]) * 100
        : 0,
    }));

    // Totals
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
      ? (total["Fulfilled PO Qty"] / total["PO Qty"]) * 100
      : 0;

    summaryList.push({ Channel: "Total", ...total });
    setChannelSummary(summaryList);
    setTotals(total);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧾 Quick Commerce Dashboard</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          {/* Key Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🧐 Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
              <div className="bg-blue-100 p-4 rounded"><strong>Total PO Sales</strong><br />{formatCurrency(totals["PO Sales"])}</div>
              <div className="bg-blue-100 p-4 rounded"><strong>Total Revenue</strong><br />{formatCurrency(totals.Revenue)}</div>
              <div className="bg-blue-100 p-4 rounded"><strong>Revenue Lost</strong><br />{formatCurrency(totals["Revenue Lost"])}</div>
              <div className="bg-blue-100 p-4 rounded"><strong>Total PO Qty</strong><br />{formatNumber(totals["PO Qty"])}</div>
              <div className="bg-blue-100 p-4 rounded"><strong>Fulfilled PO Qty</strong><br />{formatNumber(totals["Fulfilled PO Qty"])}</div>
              <div className="bg-blue-100 p-4 rounded"><strong>Avg. Fulfillment Rate</strong><br />{formatPercentage(totals["Avg. Fulfillment Rate (%)"])}</div>
            </div>
          </div>

          {/* Channel Table */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📋 Channel-wise Metrics</h3>
            <div className="overflow-x-auto">
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
        </>
      )}
    </div>
  );
};

export default QuickCommerce;
