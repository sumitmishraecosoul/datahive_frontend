import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const AllPOsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All POs');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/quick-commerce-executive`);
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter === 'All POs') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        if (filter === 'Expired') {
          return item['PO Status']?.includes('Expired');
        } else if (filter === 'Fulfilled') {
          return item['PO Status']?.includes('Fulfilled');
        } else if (filter === 'Cancelled by Vendor') {
          return item['PO Status']?.includes('Cancelled');
        }
        // Add more filters as needed
        return true;
      });
      setFilteredData(filtered);
    }
  }, [filter, data]);

  const getStatusColor = (status) => {
    if (status?.includes('Expired')) return 'error';
    if (status?.includes('Fulfilled')) return 'success';
    if (status?.includes('Cancelled')) return 'warning';
    return 'default';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Chip 
            label="All POs" 
            variant={filter === 'All POs' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('All POs')}
            color="primary"
          />
          <Chip 
            label="Expired" 
            variant={filter === 'Expired' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('Expired')}
            color="error"
          />
          <Chip 
            label="Fulfilled" 
            variant={filter === 'Fulfilled' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('Fulfilled')}
            color="success"
          />
          <Chip 
            label="Cancelled by Vendor" 
            variant={filter === 'Cancelled by Vendor' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('Cancelled by Vendor')}
            color="warning"
          />
        </div>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value=""
            label="Sort By"
            onChange={(e) => console.log(e.target.value)} // Implement sorting as needed
          >
            <MenuItem value="date">PO Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>PO Number</TableCell>
              <TableCell>PO Creation Date</TableCell>
              <TableCell>PO Expiry Date</TableCell>
              <TableCell>PO Status</TableCell>
              <TableCell>Unshipped</TableCell>
              <TableCell>PO Fulfillment Remarks</TableCell>
              <TableCell>Eco Soul FC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row['PO Number']}</TableCell>
                  <TableCell>{row['PO Creation Date']}</TableCell>
                  <TableCell>{row['PO Expiry Date']}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row['PO Status']} 
                      color={getStatusColor(row['PO Status'])} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{row['Unshipped']}</TableCell>
                  <TableCell>{row['PO Fullfilment Remarks']}</TableCell>
                  <TableCell>{row['Eco Soul FC']}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available for this filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllPOsTable;