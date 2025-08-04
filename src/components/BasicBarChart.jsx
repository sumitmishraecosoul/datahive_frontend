import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBarChart() {
  return (
    <BarChart
      xAxis={[
        { scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr'] },
      ]}
      series={[
        { data: [100, 200, 150, 300], label: 'Sales' },
        { data: [90, 180, 130, 290], label: 'Revenue' },
      ]}
      width={500}
      height={300}
    />
  );
}
