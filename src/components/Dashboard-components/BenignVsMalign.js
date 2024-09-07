import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import LargeChartHeader from './LargeChartHeader';
import { format } from 'date-fns';
import { getAnalyticsByMonth } from '../../Actions/DashboardActions';

const DualAreaChart = ({ serverData, loading }) => {

  const numericMonth = format(new Date(), 'MM');
  const currentYear = format(new Date(), 'yyyy');
  const [data, setData] = useState()
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Benign Links', data: [] },
      { name: 'Malicious Links', data: [] }
    ],
    categories: []
  });

  const [loader, setLoader] = useState(true);

  const [monthYear, setMonthYear] = useState(
    {
      month: numericMonth,
      year: currentYear
    }
  )

  useEffect(() => {
    if (serverData) {
      setData(serverData)
    }
  }, [serverData])

  useEffect(() => {
    if (loading) {
      setLoader(loading)
    }else{
      setLoader(false)
    }
  }, [loading])

  useEffect(() => {
    if (data && data.length > 0) {
      const benignLinks = [];
      const maliciousLinks = [];
      const days = [];

      // Loop through the server data and extract benign_links, malicious_links, and day
      data.forEach((d) => {
        benignLinks.push(d.benign_links);
        maliciousLinks.push(d.malicious_links);
        days.push(d.day); // Use the formatted day (e.g., "September 01")
      });

      // Set the processed data into the chart state
      setChartData({
        series: [
          { name: 'Benign Links', data: benignLinks },
          { name: 'Malicious Links', data: maliciousLinks }
        ],
        categories: days
      });

    }

  }, [data]);
  console.log("benign vs malicious", chartData)
  const options = {
    chart: {
      type: 'area',
      height: 300,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
      //   sparkline: {
      //     enabled: true
      //   }
    },
    fill: {
      type: ['solid', 'gradient'],
      opacity: 0.2,
      gradient: {
        opacityFrom: [0.6, 1],
        opacityTo: [0, 0.6]
      }
    },
    stroke: {
      // show:false,
      curve: 'smooth',
      width: [3, 0] // Thicker line for better visibility
    },
    xaxis: {
      type: 'datetime',
      categories: chartData.categories,
      labels: {
        format: 'MMMM dd',
        style: {
          colors: '#a8a8a8',
          fontSize: '10px'
        }
      },
      //   tickAmount: 5 // Limit the number of x-axis ticks
    },

    yaxis: {
      labels: {
        style: {
          colors: '#a8a8a8',
          fontSize: '10px'
        },
        formatter: (val) => {
          if (val >= 1000) {
            return (val / 1000).toFixed(1) + 'k'; // Convert large values to k (like 5k)
          }
          return val;
        }
      },
      tickAmount: 5 // Limit the number of y-axis ticks
    },
    tooltip: {
      enabled: true
    },
    grid: {
      borderColor: '#E5E7E8',
      strokeDashArray: 9
    },
    // markers: {
    //   size: 5, // Marker size
    //   colors: ['#1E90FF', '#FF6347'], // Blue and red for each marker
    //   strokeColors: '#fff',
    //   strokeWidth: 2,
    //   hover: {
    //     size: 7
    //   }
    // },
    colors: ['#0E5FD9', '#F7CFCF'], // Apply colors globally
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.9,
    //     opacityTo: 0.6,
    //   }
    // },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false
    }
  };

  // const series = [
  //   {
  //     name: 'Series 1',
  //     data: [
  //       { x: '2023-11-01', y: 3500 },
  //       { x: '2023-11-02', y: 4000 },
  //       { x: '2023-11-03', y: 3700 },
  //       { x: '2023-11-04', y: 3600 },
  //       { x: '2023-11-05', y: 3000 },
  //       { x: '2023-11-06', y: 2900 },
  //       { x: '2023-11-07', y: 4000 },
  //       { x: '2023-11-08', y: 3000 },
  //       { x: '2023-11-09', y: 3500 },
  //       { x: '2023-11-10', y: 4500 },
  //       { x: '2023-11-11', y: 4200 },
  //       { x: '2023-11-12', y: 4000 },
  //       { x: '2023-11-13', y: 4500 },
  //       { x: '2023-11-14', y: 5000 },
  //     ],
  //     // s
  //   },
  //   {
  //     name: 'Series 2',
  //     data: [
  //       { x: '2023-11-01', y: 2000 },
  //       { x: '2023-11-02', y: 2500 },
  //       { x: '2023-11-03', y: 1900 },
  //       { x: '2023-11-04', y: 1500 },
  //       { x: '2023-11-05', y: 1800 },
  //       { x: '2023-11-06', y: 1300 },
  //       { x: '2023-11-07', y: 1600 },
  //       { x: '2023-11-08', y: 1800 },
  //       { x: '2023-11-09', y: 2000 },
  //       { x: '2023-11-10', y: 2300 },
  //       { x: '2023-11-11', y: 2500 },
  //       { x: '2023-11-12', y: 2200 },
  //       { x: '2023-11-13', y: 2800 },
  //       { x: '2023-11-14', y: 3200 },
  //     ],
  //   }
  // ];

  const changeMonthYear = async (m , y ) =>{
    setLoader(true);
    
    const response = await getAnalyticsByMonth(m, y );
    if (response.status){
      setData(response.data)
    }
    setLoader(false);
  }

  return (
    <div>
       <LargeChartHeader header={'Benign Vs Malicious'} changeMonthYear={changeMonthYear} />
      {loader ?
        (<>
          <div class="flex justify-center items-center h-[200px]">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        </>)
        :
        (<>
         
          <div className=' px-3 py-2'>  <Chart options={options} series={chartData.series} type="area" height={250} /> </div>
        </>)
      }
    </div>
  );
};

export default DualAreaChart;
