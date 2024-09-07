import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import LargeChartHeader from './LargeChartHeader';
import LinkStatsTable from './LinkStatsTable';
import { format } from 'date-fns';
import { getAnalyticsByMonth } from '../../Actions/DashboardActions';



const DonutChart = ({ serverData, loading }) => {




  const numericMonth = format(new Date(), 'MM');
  const currentYear = format(new Date(), 'yyyy');
  const [data, setData] = useState()
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Benign Links', data: 0 },
      { name: 'Malicious Links', data: 0 }
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
    } else {
      setLoader(false)
    }
  }, [loading])

  function sumArray(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }

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
          { name: 'Benign Links', data: sumArray(benignLinks) },
          { name: 'Malicious Links', data: sumArray(maliciousLinks) }
        ],
        categories: days
      });

    }

  }, [data]);


  const changeMonthYear = async (m, y) => {
    setLoader(true);

    const response = await getAnalyticsByMonth(m, y);
    if (response.status) {
      setData(response.data)
    }
    setLoader(false);
  }


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
    selection: {
      enabled: false
    },
    labels: ['Benign Links', 'Malicious Links'], // Add relevant labels if needed
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

  const series = [712, 30]; // Example data for blue and red segments

  return (
    <div className=' flex flex-col gap-[24px] '>
      <LargeChartHeader header={'Most Visited Links'} changeMonthYear={changeMonthYear}/>
      {loader ?
        (<>
          <div class="flex justify-center items-center h-[200px]">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        </>)
        :
        (<>
          <Chart options={options} series={[chartData.series[0].data, chartData.series[1].data]} type="donut" />
          <div>
            <LinkStatsTable chartData={chartData} />
            </div>
          </>
        )
        }
        
    </div>
  );
};

export default DonutChart;
