// // components/FilterSidebar.jsx
// import React from 'react';

// const FilterSidebar = ({ filters, setFilters, data }) => {
//   // Extract unique values for filters
//   const years = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[2];
//   }).filter(Boolean))].sort();

//   const months = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[1];
//   }).filter(Boolean))].sort();

//   const poNumbers = [...new Set(data.map(item => item['PO Number']).filter(Boolean))].sort();
//   const skus = [...new Set(data.map(item => item.SKU).filter(Boolean))].sort();
//   const poStatuses = [...new Set(data.map(item => item['PO Status']).filter(Boolean))].sort();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       year: "",
//       month: "",
//       poNumber: "",
//       sku: "",
//       poStatus: "",
//     });
//   };

//   return (
//     <div className="w-72 bg-white rounded-lg shadow p-4 h-fit sticky top-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button 
//           onClick={clearFilters}
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Clear All
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {/* Year Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* Month Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//           <select
//             name="month"
//             value={filters.month}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Months</option>
//             {months.map(month => (
//               <option key={month} value={month}>
//                 {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Number Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
//           <select
//             name="poNumber"
//             value={filters.poNumber}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All PO Numbers</option>
//             {poNumbers.map(po => (
//               <option key={po} value={po}>{po}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* SKU Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
//           <select
//             name="sku"
//             value={filters.sku}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All SKUs</option>
//             {skus.map(sku => (
//               <option key={sku} value={sku}>{sku}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Status Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Status</label>
//           <select
//             name="poStatus"
//             value={filters.poStatus}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Statuses</option>
//             {poStatuses.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;




// // src/components/FilterSidebar.jsx
// import React from 'react';

// const FilterSidebar = ({ filters, setFilters, data }) => {
//   // Extract unique values for filters
//   const years = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[2];
//   }).filter(Boolean))].sort((a, b) => b - a); // Sort descending

//   const months = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[1];
//   }).filter(Boolean))].sort((a, b) => a - b);
  
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const poNumbers = [...new Set(data.map(item => item['PO Number']).filter(Boolean))].sort();
//   const skus = [...new Set(data.map(item => item.SKU).filter(Boolean))].sort();
//   const poStatuses = [...new Set(data.map(item => item['PO Status']).filter(Boolean))].sort();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       year: "",
//       month: "",
//       poNumber: "",
//       sku: "",
//       poStatus: "",
//     });
//   };

//   return (
//     <div className="w-72 bg-white rounded-lg shadow p-4 h-fit sticky top-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button 
//           onClick={clearFilters}
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Clear All
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {/* Year Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* Month Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//           <select
//             name="month"
//             value={filters.month}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Months</option>
//             {months.map(month => (
//               <option key={month} value={month}>
//                 {monthNames[parseInt(month) - 1]}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Number Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
//           <input
//             type="text"
//             name="poNumber"
//             value={filters.poNumber}
//             onChange={handleChange}
//             placeholder="Enter PO Number"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
        
//         {/* SKU Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
//           <select
//             name="sku"
//             value={filters.sku}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All SKUs</option>
//             {skus.map(sku => (
//               <option key={sku} value={sku}>{sku}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Status Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Status</label>
//           <select
//             name="poStatus"
//             value={filters.poStatus}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Statuses</option>
//             {poStatuses.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;


// src/components/FilterSidebar.jsx



// import React from 'react';

// const FilterSidebar = ({ filters, setFilters, data }) => {
//   // Extract unique values for filters
//   const years = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[2];
//   }).filter(Boolean))].sort((a, b) => b - a); // Sort descending

//   const months = [...new Set(data.map(item => {
//     const dateParts = item['PO Creation Date']?.split('-');
//     return dateParts && dateParts[1];
//   }).filter(Boolean))].sort((a, b) => a - b);
  
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const poNumbers = [...new Set(data.map(item => item['PO Number']).filter(Boolean))].sort();
//   const skus = [...new Set(data.map(item => item.SKU).filter(Boolean))].sort();
//   const poStatuses = [...new Set(data.map(item => item['PO Status']).filter(Boolean))].sort();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       year: "",
//       month: "",
//       poNumber: "",
//       sku: "",
//       poStatus: "",
//     });
//   };

//   return (
//     <div className="w-72 bg-white rounded-lg shadow p-4 h-fit sticky top-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button 
//           onClick={clearFilters}
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Clear All
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {/* Year Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* Month Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//           <select
//             name="month"
//             value={filters.month}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Months</option>
//             {months.map(month => (
//               <option key={month} value={month}>
//                 {monthNames[parseInt(month) - 1]}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Number Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
//           <input
//             type="text"
//             name="poNumber"
//             value={filters.poNumber}
//             onChange={handleChange}
//             placeholder="Enter PO Number"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
        
//         {/* SKU Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
//           <select
//             name="sku"
//             value={filters.sku}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All SKUs</option>
//             {skus.map(sku => (
//               <option key={sku} value={sku}>{sku}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Status Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Status</label>
//           <select
//             name="poStatus"
//             value={filters.poStatus}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Statuses</option>
//             {poStatuses.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;



// // src/components/FilterSidebar.jsx
// import React, { useEffect, useState } from 'react';

// const FilterSidebar = ({ filters, setFilters, data }) => {
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [poNumbers, setPoNumbers] = useState([]);
//   const [skus, setSkus] = useState([]);
//   const [poStatuses, setPoStatuses] = useState([]);
  
//   // Extract unique values for filters
//   useEffect(() => {
//     if (!data.length) return;
    
//     // Extract years
//     const uniqueYears = new Set();
//     data.forEach(item => {
//       if (!item['PO Creation Date']) return;
      
//       const parts = item['PO Creation Date'].split('-');
//       if (parts.length === 3) {
//         uniqueYears.add(parts[2]); // Year is at index 2
//       }
//     });
//     setYears([...uniqueYears].sort((a, b) => b - a)); // Descending order
    
//     // Extract months
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     const monthMap = {};
//     data.forEach(item => {
//       if (!item['PO Creation Date']) return;
      
//       const parts = item['PO Creation Date'].split('-');
//       if (parts.length === 3) {
//         const monthNum = parseInt(parts[1], 10);
//         if (monthNum >= 1 && monthNum <= 12) {
//           monthMap[monthNum] = monthNames[monthNum - 1];
//         }
//       }
//     });
//     setMonths(Object.entries(monthMap)
//       .sort((a, b) => a[0] - b[0])
//       .map(([num, name]) => ({ num, name })));
    
//     // Extract PO Numbers
//     const uniquePoNumbers = new Set();
//     data.forEach(item => {
//       if (item['PO Number']) {
//         uniquePoNumbers.add(item['PO Number']);
//       }
//     });
//     setPoNumbers([...uniquePoNumbers].sort());
    
//     // Extract SKUs
//     const uniqueSkus = new Set();
//     data.forEach(item => {
//       if (item.SKU) {
//         uniqueSkus.add(item.SKU);
//       }
//     });
//     setSkus([...uniqueSkus].sort());
    
//     // Extract PO Statuses
//     const uniqueStatuses = new Set();
//     data.forEach(item => {
//       if (item['PO Status']) {
//         uniqueStatuses.add(item['PO Status']);
//       }
//     });
//     setPoStatuses([...uniqueStatuses].sort());
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       year: "",
//       month: "",
//       poNumber: "",
//       sku: "",
//       poStatus: "",
//     });
//   };

//   return (
//     <div className="w-72 bg-white rounded-lg shadow p-4 h-fit sticky top-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button 
//           onClick={clearFilters}
//           className="text-sm text-blue-600 hover:underline"
//         >
//           Clear All
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {/* Year Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//           <select
//             name="year"
//             value={filters.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Years</option>
//             {years.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* Month Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//           <select
//             name="month"
//             value={filters.month}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Months</option>
//             {months.map(({num, name}) => (
//               <option key={num} value={num}>
//                 {name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Number Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
//           <input
//             type="text"
//             name="poNumber"
//             value={filters.poNumber}
//             onChange={handleChange}
//             placeholder="Enter PO Number"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
        
//         {/* SKU Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
//           <select
//             name="sku"
//             value={filters.sku}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All SKUs</option>
//             {skus.map(sku => (
//               <option key={sku} value={sku}>{sku}</option>
//             ))}
//           </select>
//         </div>
        
//         {/* PO Status Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">PO Status</label>
//           <select
//             name="poStatus"
//             value={filters.poStatus}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Status</option>
//             {poStatuses.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

import React from 'react';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Divider,
  Typography
} from '@mui/material';

const FilterSidebar = ({ 
  options = {}, 
  currentFilters = {}, 
  onFilterChange = () => {}, 
  onReset = () => {} 
}) => {
  // Provide default values for options
  const {
    years = [],
    months = [],
    poNumbers = [],
    skus = [],
    poStatuses = []
  } = options || {};

  // Provide default values for current filters
  const {
    year = '',
    month = '',
    poNumber = '',
    sku = '',
    poStatus = ''
  } = currentFilters || {};

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4 h-[calc(100vh-32px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">
          Filters
        </Typography>
        <Button 
          variant="outlined" 
          size="small"
          onClick={onReset}
        >
          Clear All
        </Button>
      </div>
      
      <Divider className="my-4" />
      
      <div className="space-y-6">
        {/* Year Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Month Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            label="Month"
            onChange={(e) => onFilterChange('month', e.target.value)}
          >
            <MenuItem value="">All Months</MenuItem>
            {months.map(month => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PO Number Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>PO Number</InputLabel>
          <Select
            value={poNumber}
            label="PO Number"
            onChange={(e) => onFilterChange('poNumber', e.target.value)}
          >
            <MenuItem value="">All PO Numbers</MenuItem>
            {poNumbers.map(po => (
              <MenuItem key={po} value={po}>{po}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SKU Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>SKU</InputLabel>
          <Select
            value={sku}
            label="SKU"
            onChange={(e) => onFilterChange('sku', e.target.value)}
          >
            <MenuItem value="">All SKUs</MenuItem>
            {skus.map(sku => (
              <MenuItem key={sku} value={sku}>{sku}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PO Status Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>PO Status</InputLabel>
          <Select
            value={poStatus}
            label="PO Status"
            onChange={(e) => onFilterChange('poStatus', e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {poStatuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterSidebar;