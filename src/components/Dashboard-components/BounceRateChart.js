import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';
import { getRemoteBrowserCounts } from '../../Actions/DashboardActions';

const BounceRateChart = ({  }) => {
  const [data, setData] = useState([]);  // Store the count data
  const [dates, setDates] = useState([]); // Store the date data
  const [loadingData, setLoadingData] = useState(true); // For showing a loading state
  const [change, setChange] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getRemoteBrowserHistory(); // Fetch data when the component mounts
  }, []);

  const getRemoteBrowserHistory = async () => {
    try {
      const response = await getRemoteBrowserCounts(); // Fetch the data
      if (response && response.status) {
        const counts = response.data.reverse().map((entry) => entry.count); // Extract count data
        const dates_array = response.data.reverse().map((entry) => entry.date);  // Extract date data
        setData(counts); // Update the state with fetched data
        setDates(dates_array); // Update the state with fetched dates

        const sum = counts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const secondLast = counts[counts.length - 2];
        const last = counts[counts.length - 1];
        setTotal(sum)
        if(secondLast+last>0){
        const p_change = (last -secondLast)/ (last+secondLast) *100
        setChange(p_change.toFixed(1))}
      }
    } catch (error) {
      console.error("Error fetching remote browser data:", error);
    } finally {
      setLoadingData(false); // Stop the loading state once data is fetched
    }
  };

  const minDataValue = Math.min(...data);
  const maxDataValue = Math.max(...data);

  const yAxisMin = minDataValue - 20; // Set the min value for y-axis to be 20 units less than the minimum value in the data
  const yAxisMax = maxDataValue + 20; // Set the max value for y-axis to be 20 units more than the maximum value in the data

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
      max: yAxisMax,
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
    xaxis: {
      categories: dates.reverse(),
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
  };

  const series = [{
    name: 'Browser Activity',
    data: data // Use fetched count data for the chart
  }];

  return (
    <div className=' -mb-[30px]'>
       { loadingData?
      <>
      <div class="flex justify-center items-center h-[200px]">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      </>
      :
     ( <>
    <SmallChartHeaderWrapper  header={'REMOTE BROWSER '} fluc={change} total={total} percentage={false}/>
    <div className=' -mt-14'>
  <Chart options={options} series={series} type="area" height={250} />
  <div className='    text-right text-[10px] -mt-[35px]    text-[#6f6f6e] '><span className='text-blue-600'>*</span>Daily Data</div>
  </div>
  </>)
}
</div>
  );
};

export default BounceRateChart;
