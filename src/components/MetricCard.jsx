import React from "react";

const MetricCard = ({ label, value }) => (
  <div className="bg-white shadow rounded-xl p-4 text-center">
    <h4 className="text-sm font-medium text-gray-600">{label}</h4>
    <p className="text-lg font-bold text-green-600">{Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
  </div>
);

export default MetricCard;
