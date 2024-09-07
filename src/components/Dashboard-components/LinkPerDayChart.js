import React from 'react';
import Chart from 'react-apexcharts';

const LinkPerDayChart = ({categories, series}) => {
  const options = {
    chart: {
      type: 'area',
      height: 200,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#ffffff'], // Color fades to white
        inverseColors: true,
        opacityFrom: 0.6,
        opacityTo: 0
      }
    },
    xaxis: {
      categories: categories,
      labels: {
          show: false,
      },
      axisBorder: {
          show: false,
      },
      axisTicks: {
          show: false,
      },
  },
    colors: ['#4CAF50'], // Green color for the line
    tooltip: {
      enabled: true
    }
  };

  // const series = [{
  //   name: 'series1',
  //   data: [20, 30, 25, 35, 30, 40, 38, 20] // Example data
  // }];

  return (
    <div>
      <Chart options={options} series={series} type="area" height={50} />
    </div>
  );
};

export default LinkPerDayChart;
