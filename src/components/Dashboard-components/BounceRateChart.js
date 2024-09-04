import React from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';

const BounceRateChart = () => {
  const data = [18, 15, 21, 25, 16, 19, 12, 14, 15]; // Example data

  const minDataValue = Math.min(...data);
  const maxDataValue = Math.max(...data);
   
  const yAxisMin = minDataValue - 20;// Set the min value for y-axis to be 20 units less than the minimum value in the data
  const yAxisMax = maxDataValue + 20;
  const options = {
    chart: {
      type: 'area',
      height: 200,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight', // Makes the line sharp (no curves)
      width: 5
    },
    fill: {
      type: 'solid',
      opacity: 0.2 // Matches the lighter green area fill
    },
    colors: ['#4CAF50'], // Green line color
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true
    },
    yaxis: {
      min: yAxisMin, // Set the minimum y-axis value dynamically
      max: yAxisMax
    }
  };

  const series = [{
    name: 'series1',
    data: data
  }];

  return (
    <div className=' -mb-[30px]'>
        <SmallChartHeaderWrapper/>
        <div className=' -mt-14'>
      <Chart options={options} series={series} type="area" height={250} />
      </div>
    </div>
  );
};





export default BounceRateChart;