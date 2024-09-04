import React from 'react';
import Chart from 'react-apexcharts';
import LargeChartHeader from './LargeChartHeader';

const DonutChart = () => {
  const options = {
    chart: {
      type: 'donut',
      width: '100%',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // Prevent selection
          event.stopPropagation();
        },
        click: (event, chartContext, config) => {
          // Prevent click behavior
          console.log("clicked", event);
          event.stopPropagation();
        }
      }
    },
    selection:{
        enabled: false
    },
    labels: ['Blue Segment', 'Red Segment'], // Add relevant labels if needed
    colors: ['#0E5FD9', '#FF6347'], // Blue and Red colors
    legend: {
      show: false // Hides the legend as requested
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%', // Size of the donut hole
        },
        expandOnClick: false
      }
    },
    stroke: {
      width: 1 // Space between the segments
    },
    dataLabels: {
        enabled: false,
      },
  };

  const series = [70, 30]; // Example data for blue and red segments

  return (
    <div className=' flex flex-col gap-[24px] '>
        <LargeChartHeader />
      <Chart options={options} series={series} type="donut"  />
    </div>
  );
};

export default DonutChart;
