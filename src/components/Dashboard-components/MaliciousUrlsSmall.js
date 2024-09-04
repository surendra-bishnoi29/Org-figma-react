import React from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';

const MaliciousUrlsSmall = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true // Remove extra elements like axes and labels
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '50%', // Adjust width of the bars
        distributed: false
      }
    },
    colors: ['#FBC687'], // Use the color matching the bars in your image
    dataLabels: {
      enabled: false // Disable labels on the bars
    },
    xaxis: {
      categories: [], // You can leave this empty since it's a sparkline-style chart
    },
    tooltip: {
      enabled: true // Disable tooltips for a clean look
    }
  };

  const series = [{
    name: 'series1',
    data: [ 40, 35, 25, 30] // Example data that matches the bar heights in your image
  }];

  return (
    <div className=' flex flex-col gap-[48px]'>
        <SmallChartHeaderWrapper/>
      <Chart options={options} series={series} type="bar" height={100} />
    </div>
  );
};

export default MaliciousUrlsSmall;


// export default MaliciousUrlsSmal