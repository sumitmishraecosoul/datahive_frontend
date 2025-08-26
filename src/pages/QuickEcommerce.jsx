import React, { useEffect, useState } from "react";

import Select from "react-select";

import {
  BarChart,
  Bar,
  XAxis,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import API_BASE_URL from '../utils/apiConfig';
 

// Helper to pad chart data to always show 5 bars

const padChartData = (data, keyNames) => {

  const top5 = data.slice(0, 5);

  const padded = [...top5];

  while (padded.length < 5) {

    const empty = {};

    keyNames.forEach(

      (k) => (empty[k] = k === "location" || k === "sku" ? "" : 0)

    );

    padded.push(empty);

  }

  return padded;

};

 

// CSV Download Helper

const downloadCSV = (rows, columns, filename = "quick_commerce.csv") => {

  const csv =

    columns.join(",") +

    "\n" +

    rows

      .map((row) =>

        columns

          .map((col) =>

            typeof row[col] === "string"

              ? `"${row[col].replace(/"/g, '""')}"`

              : row[col] ?? ""

          )

          .join(",")

      )

      .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.setAttribute("href", url);

  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};

 

const QuickEcommerce = () => {

  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({});

  const [table, setTable] = useState([]);

  const [filteredTable, setFilteredTable] = useState([]);

  const [skuOptions, setSkuOptions] = useState([]);

  const [locationOptions, setLocationOptions] = useState([]);

  const [stockStatusOptions, setStockStatusOptions] = useState([]);

  const [selectedSku, setSelectedSku] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([]);

  const [selectedStockStatus, setSelectedStockStatus] = useState([]);

 

  // Fetch API data

  useEffect(() => {

    setLoading(true);

    console.log('Fetching from:', `${API_BASE_URL}/summary`);

    

    fetch(`${API_BASE_URL}/summary`)

      .then((res) => {

        console.log('Response status:', res.status);

        if (!res.ok) {

          throw new Error(`HTTP error! status: ${res.status}`);

        }

        return res.json();

      })

      .then((data) => {

        console.log('API Response:', data);

        setSummary(data.summary || {});

        setTable(data.table || []);

        setFilteredTable(data.table || []);

 

        // Build SKU and Location options

        const uniqueSKUs = [

          ...new Set((data.table || []).map((row) => row.SKU).filter(Boolean)),

        ];

        setSkuOptions(uniqueSKUs.map((sku) => ({ label: sku, value: sku })));

 

        const uniqueLocations = [

          ...new Set(

            (data.table || []).map((row) => row.Location).filter(Boolean)

          ),

        ];

        setLocationOptions(

          uniqueLocations.map((loc) => ({ label: loc, value: loc }))

        );

        // Build Stock Status options
        const uniqueStockStatuses = [
          ...new Set(
            (data.table || []).map((row) => row["Stock Status"]).filter(Boolean)
          ),
        ];
        setStockStatusOptions(
          uniqueStockStatuses.map((status) => ({ label: status, value: status }))
        );
      })
      .catch((error) => {
        console.error('API Error:', error);
        setSummary({});
        setTable([]);
        setFilteredTable([]);
      })
      .finally(() => setLoading(false));

  }, []);

 

  // Filter table data

  useEffect(() => {

    let filtered = [...table];

    if (selectedSku.length > 0) {

      const skuVals = selectedSku.map((s) => s.value);

      filtered = filtered.filter((row) => skuVals.includes(row.SKU));

    }

    if (selectedLocation.length > 0) {

      const locVals = selectedLocation.map((l) => l.value);

      filtered = filtered.filter((row) => locVals.includes(row.Location));

    }

    if (selectedStockStatus.length > 0) {

      const statusVals = selectedStockStatus.map((s) => s.value);

      filtered = filtered.filter((row) => statusVals.includes(row["Stock Status"]));

    }

    setFilteredTable(filtered);

  }, [selectedSku, selectedLocation, selectedStockStatus, table]);

 

  // Metrics recalc on filter

  const filteredSummary = {

    sku_count: new Set(filteredTable.map((row) => row.SKU)).size,

    location_count: new Set(filteredTable.map((row) => row.Location)).size,

    sum_sellable_in_hand: filteredTable.reduce(

      (sum, row) => sum + (parseFloat(row["Sellable(In Hand)"]) || 0),

      0

    ),

    sum_invoiced_qty: filteredTable.reduce(

      (sum, row) => sum + (parseFloat(row["Invoiced_Qty"]) || 0),

      0

    ),

    sum_in_transit: filteredTable.reduce(

      (sum, row) => sum + (parseFloat(row["In-Transit"]) || 0),

      0

    ),

    sum_warehouse_qty: filteredTable.reduce(

      (sum, row) => sum + (parseFloat(row["Warehouse Qty"]) || 0),

      0

    ),

    sum_delivered: filteredTable.reduce(

      (sum, row) => sum + (parseFloat(row["Delivered"]) || 0),

      0

    ),

 

    sumSurplus: filteredTable.reduce(

      (sum, row) =>

        sum +

        (row["Stock Status"] === "Surplus"

          ? parseFloat(row["Sellable after Required Qty"]) || 0

          : 0),

      0

    ),

 

    sumShortage: filteredTable.reduce(

      (sum, row) =>

        sum +

        (row["Stock Status"] === "Shortage"

          ? -(parseFloat(row["Sellable after Required Qty"]) || 0)

          : 0),

      0

    ),

  };

 

  // Chart data (top 5 only)

  const shortageByLocation = Object.entries(

    filteredTable.reduce((acc, row) => {

      if (row["Stock Status"] === "Shortage") {

        acc[row.Location] =

          (acc[row.Location] || 0) +

          (parseFloat(row["Sellable after Required Qty"]) || 0);

      }

      return acc;

    }, {})

  )

    .map(([location, shortage]) => ({ location, shortage }))

    .sort((a, b) => b.shortage - a.shortage);

 

  const sellableByLocation = Object.entries(

    filteredTable.reduce((acc, row) => {

      acc[row.Location] =

        (acc[row.Location] || 0) +

        (parseFloat(row["Sellable(In Hand)"]) || 0);

      return acc;

    }, {})

  )

    .map(([location, sellable]) => ({ location, sellable }))

    .sort((a, b) => b.sellable - a.sellable);

 

  const whQtyByLocation = Object.entries(

    filteredTable.reduce((acc, row) => {

      acc[row.Location] =

        (acc[row.Location] || 0) + (parseFloat(row["Warehouse Qty"]) || 0);

      return acc;

    }, {})

  )

    .map(([location, whQty]) => ({ location, whQty }))

    .sort((a, b) => b.whQty - a.whQty);

 

  const topSKUsBySellable = Object.entries(

    filteredTable.reduce((acc, row) => {

      acc[row.SKU] =

        (acc[row.SKU] || 0) + (parseFloat(row["Sellable(In Hand)"]) || 0);

      return acc;

    }, {})

  )

    .map(([sku, sellable]) => ({ sku, sellable }))

    .sort((a, b) => b.sellable - a.sellable);

 

  // Table columns (dynamic)

  const tableColumns = table[0]

    ? Object.keys(table[0])

    : [

        "SKU",

        "Box/Case",

        "Location",

        "Warehouse Qty",

        "Cancelled",

        "Delivered",

        "In-Transit",

        "Invoiced_Qty",

        "Sellable(In Hand)",

      ];

 

  return (

    <div className="space-y-6 min-h-screen bg-gray-50 p-4 md:p-6">

      <h2 className="text-2xl font-bold mb-2">Quick Ecommerce</h2>

      {/* Filter */}

      <div className="bg-white p-4 rounded-lg shadow">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">

            <label className="block text-sm font-medium mb-2">Filter SKU</label>

            <Select

              isMulti

              options={skuOptions}

              value={selectedSku}

              onChange={setSelectedSku}

              placeholder="Select SKU"

              menuPortalTarget={document.body}

              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}

            />

          </div>

          <div className="flex-1">

            <label className="block text-sm font-medium mb-2">

              Filter Location

            </label>

            <Select

              isMulti

              options={locationOptions}

              value={selectedLocation}

              onChange={setSelectedLocation}

              placeholder="Select Location"

              menuPortalTarget={document.body}

              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}

            />

          </div>

          <div className="flex-1">

            <label className="block text-sm font-medium mb-2">

              Filter Stock Status

            </label>

            <Select

              isMulti

              options={stockStatusOptions}

              value={selectedStockStatus}

              onChange={setSelectedStockStatus}

              placeholder="Select Stock Status"

              menuPortalTarget={document.body}

              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}

            />

          </div>

        </div>

      </div>

 

      {/* Metrics */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-blue-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Total SKU Count</h3>

          <p className="text-2xl font-bold text-blue-600">

            {filteredSummary.sku_count || 0}

          </p>

        </div>

 

        <div className="bg-green-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Total Location</h3>

          <p className="text-2xl font-bold text-green-600">

            {filteredSummary.location_count || 0}

          </p>

        </div>

 

        <div className="bg-green-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Surplus Qty</h3>

          <p className="text-2xl font-bold text-green-600">

            {filteredSummary.sumSurplus || 0}

          </p>

        </div>

 

        <div className="bg-red-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Shortage Qty</h3>

          <p className="text-2xl font-bold text-red-600">

            {filteredSummary.sumShortage || 0}

          </p>

        </div>

 

        <div className="bg-purple-40 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Total Sellable</h3>

          <p className="text-2xl font-bold text-purple-600">

            {(filteredSummary.sum_sellable_in_hand || 0).toLocaleString()}

          </p>

        </div>

        <div className="bg-pink-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">

            Total Invoice Qty

          </h3>

          <p className="text-2xl font-bold text-pink-600">

            {(filteredSummary.sum_invoiced_qty || 0).toLocaleString()}

          </p>

        </div>

        <div className="bg-orange-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">

            Total Intransit Qty

          </h3>

          <p className="text-2xl font-bold text-orange-600">

            {(filteredSummary.sum_in_transit || 0).toLocaleString()}

          </p>

        </div>

        <div className="bg-indigo-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">Total W.H Qty</h3>

          <p className="text-2xl font-bold text-indigo-600">

            {(filteredSummary.sum_warehouse_qty || 0).toLocaleString()}

          </p>

        </div>

        <div className="bg-yellow-50 p-4 rounded-lg shadow">

          <h3 className="text-sm font-medium text-gray-600">

            Total Delivered Qty

          </h3>

          <p className="text-2xl font-bold text-yellow-600">

            {(filteredSummary.sum_delivered || 0).toLocaleString()}

          </p>

        </div>

      </div>

 

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded-lg shadow">

          <h3 className="text-lg font-semibold mb-4">Sellable by Location</h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart

              data={padChartData(sellableByLocation, ["location", "sellable"])}

              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}

            >

              <XAxis dataKey="location" />

              {/* <Tooltip /> */}

              <Bar dataKey="sellable" fill="#3B82F6" barSize={18}>

                <LabelList dataKey="sellable" position="top" offset={10} />

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

 

        <div className="bg-white p-4 rounded-lg shadow">

          <h3 className="text-lg font-semibold mb-4">W.H Qty by Location</h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart

              data={padChartData(whQtyByLocation, ["location", "whQty"])}

              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}

            >

              <XAxis dataKey="location" />

              {/* <Tooltip /> */}

              <Bar dataKey="whQty" fill="#10B981" barSize={18}>

                <LabelList dataKey="whQty" position="top" offset={10} />

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

 

        <div className="bg-white p-4 rounded-lg shadow">

          <h3 className="text-lg font-semibold mb-4">

            Top SKUs by Sellable Qty

          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart

              data={padChartData(topSKUsBySellable, ["sku", "sellable"])}

              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}

            >

              <XAxis dataKey="sku" />

              {/* <Tooltip /> */}

              <Bar dataKey="sellable" fill="#8B5CF6" barSize={18}>

                <LabelList dataKey="sellable" position="top" offset={10} />

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

 

        {/* 🔥 New Shortage by Location */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Shortage by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={padChartData(shortageByLocation, ["location", "shortage"])}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="location" />
              {/* <Tooltip /> */}
              <Bar dataKey="shortage" fill="#EF4444" barSize={18}>
                <LabelList dataKey="shortage" position="bottom" offset={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

 

      {/* Table */}

      <div className="bg-white p-4 rounded-lg shadow">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-lg font-bold">Grid View</h3>

          <button

            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold"

            onClick={() => downloadCSV(filteredTable, tableColumns)}

          >

            Download CSV

          </button>

        </div>

        <div className="overflow-x-auto" style={{ maxHeight: "450px" }}>

          <table className="w-full text-sm text-left min-w-[600px]">

            <thead className="bg-gray-100 sticky top-0 z-10">

              <tr>

                {tableColumns.map((col) => (

                  <th key={col} className="px-4 py-2">

                    {col}

                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {filteredTable.map((row, i) => (

                <tr key={i} className="border-b hover:bg-gray-50">

                  {tableColumns.map((col) => (

                    <td key={col} className="px-4 py-2">

                      {row[col]}

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

 

      {loading && (

        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">

          <div className="text-lg font-semibold text-gray-700">Loading...</div>

        </div>

      )}

    </div>

  );

};

 
export default QuickEcommerce;
