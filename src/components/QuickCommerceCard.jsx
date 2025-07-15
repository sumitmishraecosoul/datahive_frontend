import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

const formatValue = (value, type = "number") => {
  if (type === "currency") return `₹${Number(value).toLocaleString("en-IN")}`;
  if (type === "percent") return `${Number(value).toFixed(1)}%`;
  return Number(value).toLocaleString("en-IN");
};

const TrendArrow = ({ value }) => {
  const isUp = value >= 0;
  const Icon = isUp ? ArrowUp : ArrowDown;
  return (
    <div className={`flex items-center gap-1 ${isUp ? "text-green-600" : "text-red-500"}`}>
      <Icon className="w-4 h-4" />
      {formatValue(Math.abs(value), "percent")}
    </div>
  );
};

const QuickCommerceCard = ({ title, value, avgLabel, mom, yoy, data, dataKey, valueType }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs flex flex-col justify-between">
      <div className="text-sm text-gray-600 font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{formatValue(value, valueType)}</div>
      {avgLabel && <div className="text-xs text-gray-500 mb-2">{avgLabel}</div>}

      {/* Trend Lines */}
      <div className="text-xs text-gray-400 mb-1">MOM% | Last vs Prev Month</div>
      <TrendArrow value={mom} />
      <div className="text-xs text-gray-400 mt-2">YOY% | This Year vs Last</div>
      <TrendArrow value={yoy} />

      {/* Sparkline */}
      <div className="h-12 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey={dataKey} stroke="#5B4636" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuickCommerceCard;
