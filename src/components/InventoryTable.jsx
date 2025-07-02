import React from "react";

const InventoryTable = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500">No data available.</p>;

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-auto max-h-[500px] mt-6">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-green-500 text-white sticky top-0">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 border-b">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
