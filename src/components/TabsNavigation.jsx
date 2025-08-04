// src/components/TabsNavigation.jsx
import React from "react";

const TabsNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "executive", label: "Executive" },
    { id: "channelPerformance", label: "Channel Performance" },
    { id: "demandSupply", label: "Demand & Supply" },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
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
  );
};

export default TabsNavigation;