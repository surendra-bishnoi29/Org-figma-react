import React from 'react';
import Chart from 'react-apexcharts';

const LinkPerDayChartMalicious = ({categories, series}) => {
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
    dataLabels: {
      enabled: false // Disable labels on the bars
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
    colors: ['#E84646'], 
    tooltip: {
      enabled: true
    }
  };

  // const series = [{
  //   name: 'series1',
  //   data: [35, 30, 25, 35, 25, 40, 38, 30] // Example data
  // }];

  return (
    <div>
      <Chart options={options} series={series} type="area" height={50} />
    </div>
  );
};

export default LinkPerDayChartMalicious;
