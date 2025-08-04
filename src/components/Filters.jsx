// src/components/Filters.jsx
import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

const Filters = ({ options, currentFilters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FilterAltIcon className="mr-2" /> Filters
        </h2>
        <Button 
          variant="outlined" 
          size="small"
          startIcon={<ClearIcon />}
          onClick={onReset}
        >
          Clear
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Year Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Year</InputLabel>
          <Select
            value={currentFilters.year}
            label="Year"
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            <MenuItem value="">All Years</MenuItem>
            {options.years?.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Month Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Month</InputLabel>
          <Select
            value={currentFilters.month}
            label="Month"
            onChange={(e) => onFilterChange('month', e.target.value)}
          >
            <MenuItem value="">All Months</MenuItem>
            {options.months?.map(month => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PO Number Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>PO Number</InputLabel>
          <Select
            value={currentFilters.poNumber}
            label="PO Number"
            onChange={(e) => onFilterChange('poNumber', e.target.value)}
          >
            <MenuItem value="">All PO Numbers</MenuItem>
            {options.poNumbers?.map(po => (
              <MenuItem key={po} value={po}>{po}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SKU Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>SKU</InputLabel>
          <Select
            value={currentFilters.sku}
            label="SKU"
            onChange={(e) => onFilterChange('sku', e.target.value)}
          >
            <MenuItem value="">All SKUs</MenuItem>
            {options.skus?.map(sku => (
              <MenuItem key={sku} value={sku}>{sku}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PO Status Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>PO Status</InputLabel>
          <Select
            value={currentFilters.poStatus}
            label="PO Status"
            onChange={(e) => onFilterChange('poStatus', e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {options.poStatuses?.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Filters;