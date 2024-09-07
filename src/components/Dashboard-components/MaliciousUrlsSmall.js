import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';

const MaliciousUrlsSmall = ({ serverData, loading }) => {

  const [chartData, setChartData] = useState({
    series: [{ data: [] }],
    categories: []
});
const [totalLinks, setTotalLinks] = useState('')
const [percentageChange, setPercentageChange] = useState('')

  useEffect(() => {
    // Function to process the server data and extract the required fields
    const processData = () => {
        const totalLinks = [];
        const weeks = [];

        // Loop through the server data and extract total_links and week names
        [...serverData].reverse().forEach((weekData) => {
            const weekName = Object.keys(weekData)[0]; // Get the week name (e.g., "7th week")
            const weekInfo = weekData[weekName]; // Get the link data for that week

            weeks.push(weekName);
            totalLinks.push(weekInfo.malicious_links == 0 ? 20 : weekInfo.malicious_links);
        });

        // Set the processed data into the chart state
        setChartData({
            series: [{ data: totalLinks }],
            categories: weeks,
        });

        const total = totalLinks.reduce((sum, links) => sum + links, 0);
        setTotalLinks(total);

        // Calculate the percentage change between the last two weeks
        if (totalLinks.length >= 2) {
            const lastWeek = totalLinks[totalLinks.length - 1];
            const secondLastWeek = totalLinks[totalLinks.length - 2];

            if (secondLastWeek > 0) {
                const change = ((lastWeek - secondLastWeek) / secondLastWeek) * 100;
                setPercentageChange(change.toFixed(1)); // Round to 2 decimal places
            } else {
                setPercentageChange(null); // Avoid division by zero
            }
        }
    };

    // Process data whenever serverData is updated
    if (serverData) {
        processData();
    }
}, [serverData]);

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
      categories: chartData.categories, // You can leave this empty since it's a sparkline-style chart
    },
    tooltip: {
      marker: {
          show: false // This removes the blue dot (series marker)
      },
      x: {
          show: true,
          formatter: function (val) {
              return val;  // Show the week name in the tooltip
          }
      },
      y: {
          formatter: function (val) {
              return `${val} links`;  // Replace "series-1" with "links" in the tooltip
          },
          title: {
              formatter: () => '', // Remove "series-1" from the tooltip
          }
      }
  },
  };

  // const series = [{
  //   name: 'series1',
  //   data: [ 40, 35, 25, 30] // Example data that matches the bar heights in your image
  // }];

  return (
    <div className=' flex flex-col gap-[48px]'>
      {loading ?
                <>
                    <div class="flex justify-center items-center h-[200px]">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                </>
                :
                (<>
        <SmallChartHeaderWrapper header={'MALICIOUS URLs'} fluc={percentageChange} total={totalLinks}  />
      <Chart options={options} series={chartData.series} type="bar" height={100} />
      </>
                )
              }
    </div>
  );
};

export default MaliciousUrlsSmall;


// export default MaliciousUrlsSmal