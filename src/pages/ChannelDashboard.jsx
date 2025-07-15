import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChannelDashboard = () => {
  const { channelName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quick-commerce-executive");
        const channelData = response.data.filter(item => item.Channel === channelName);
        setData(channelData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [channelName]);
  

  // Calculate all required metrics
  const calculateMetrics = () => {
    if (data.length === 0) return {};
    
    // Sales (sum of PO Sales)
    const sales = data.reduce((sum, item) => sum + parseFloat(item["PO Sales"] || 0), 0);
    
    // Revenue (sum of Received_Revenue)
    const revenue = data.reduce((sum, item) => sum + parseFloat(item["Received_Revenue"] || 0), 0);
    
    // Lost Revenue (sum of Unshipped_Revenue)
    const lostRevenue = data.reduce((sum, item) => sum + parseFloat(item["Unshipped_Revenue"] || 0), 0);
    
    // Fulfillment Rate (average of fulfillment_rate)
    const fulfillmentRate = data.reduce((sum, item) => sum + parseFloat(item["fulfillment_rate"] || 0), 0) / data.length;
    
    // Total PO Received (unique count of PO Number)
    const uniquePOs = [...new Set(data.map(item => item["PO Number"]))];
    const totalPOReceived = uniquePOs.length;
    
    // PO Fulfilled (count of unique POs with status "Fulfilled")
    const fulfilledPOs = [...new Set(
      data.filter(item => item["PO Status"] === "Fulfilled").map(item => item["PO Number"])
    )];
    const poFulfilled = fulfilledPOs.length;
    
    // PO Pending (Total PO Received - PO Fulfilled)
    const poPending = totalPOReceived - poFulfilled;
    
    return {
      sales: Math.round(sales),
      revenue: Math.round(revenue),
      lostRevenue: Math.round(lostRevenue),
      fulfillmentRate: (fulfillmentRate * 100).toFixed(2),
      totalPOReceived,
      poFulfilled,
      poPending,
    };
  };

  const metrics = calculateMetrics();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">{channelName}</h1>
      
      {/* Sales Overview */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.sales || 0}</div>
            <div className="text-gray-500">Sales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.revenue || 0}</div>
            <div className="text-gray-500">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.lostRevenue || 0}</div>
            <div className="text-gray-500">Lost Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.fulfillmentRate || 0}</div>
            <div className="text-gray-500">Fulfillment Rate</div>
          </div>
        </div>
      </div>
      
      {/* P0 Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">P0 Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.totalPOReceived || 0}</div>
            <div className="text-gray-500">Total PO Received</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.poFulfilled || 0}</div>
            <div className="text-gray-500">PO Fulfilled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{metrics.poPending || 0}</div>
            <div className="text-gray-500">PO Pending</div>
          </div>
        </div>
      </div>
      
      {/* Sale vs Revenue */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Sale vs Revenue</h2>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
          <div className="text-center text-gray-400">
            <div>Palm</div>
            <div>Degasse</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>Jun</div>
            <div>Aug</div>
            <div>May</div>
            <div>Jun</div>
          </div>
        </div>
      </div>
      
      {/* Lost Revenue */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Lost Revenue</h2>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
          <div className="text-center text-gray-400">
            <div>Palm</div>
            <div>Degasse</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>Jun</div>
            <div>Aug</div>
            <div>May</div>
            <div>Jun</div>
          </div>
        </div>
      </div>
      
      {/* Top Selling SKU's */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Top Selling SKU's</h2>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <div className="font-medium mb-2">SKU</div>
            <div className="text-gray-400">Jan</div>
            <div className="text-gray-400">Feb</div>
            <div className="text-gray-400">Mar</div>
            <div className="text-gray-400">Apr</div>
            <div className="text-gray-400">May</div>
          </div>
          <div className="w-3/4">
            <div className="font-medium mb-2">Order Summary</div>
            <div className="text-gray-400">Ordered</div>
            <div className="text-gray-400">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;