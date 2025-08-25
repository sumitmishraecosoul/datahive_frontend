// FilterSidebar.jsx
import React from 'react';

const FilterSidebar = ({ options = {}, currentFilters = {}, onFilterChange, onReset }) => {
  // Ensure currentFilters has default values for all expected keys
  const safeFilters = {
    year: '',
    month: '',
    poNumber: '',
    sku: '',
    poStatus: '',
    ...currentFilters
  };

  // Map the filter keys to their corresponding option arrays
  const filterConfig = {
    year: { label: 'Year', optionsKey: 'years' },
    month: { label: 'Month', optionsKey: 'months' },
    poNumber: { label: 'PO Number', optionsKey: 'poNumbers' },
    sku: { label: 'SKU', optionsKey: 'skus' },
    poStatus: { label: 'PO Status', optionsKey: 'poStatuses' }
  };

  return (
    <div className="w-64 p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {Object.entries(filterConfig).map(([key, config]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium mb-1">{config.label}</label>
          <select
            value={safeFilters[key] || ''}
            onChange={e => onFilterChange(key, e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {options[config.optionsKey]?.map(option => (
              <option key={option} value={option}>{option}</option>
            )) || []}
          </select>
        </div>
      ))}

      <button
        onClick={onReset}
        className="w-full bg-red-500 text-white py-1 mt-2 rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
