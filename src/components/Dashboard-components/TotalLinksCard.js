import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';

const TotalChart = ({ serverData, loading }) => {

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
                totalLinks.push(weekInfo.total_links!=0?weekInfo.total_links:20);
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

    // Chart options
    const chartOptions = {
        chart: {
            type: 'bar',
            height: '170px',
            toolbar: { show: false },
            zoom: {
                enabled: false
            },
            selection: {
                enabled: false
            }
            //   foreColor: '#657a8e', // Foreground color for labels and titles
        },

        plotOptions: {
            bar: {
                horizontal: false, // Vertical bars
                columnWidth: '40%', // Adjust the bar width
                endingShape: 'rounded',
                borderRadius: 5,

                distributed: true, // Distributed coloring
                colors: {
                    backgroundBarColors: ['#F0F6FF'],
                    backgroundBarRadius: 5,
                    columnWidth: "80%"
                },
            },
        },
        dataLabels: {
            legend: { show: false }, // Disable legend
            enabled: false,
        },
        legend: { show: false }, // Disable legend
        xaxis: {
            categories: chartData.categories,
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
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
            colors: ['#3b82f6'],
        }, // Hide the y-axis
        // colors: ['#007BFF'], // Bar colors (blue)
        grid: { show: false }, // Hide the grid
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

    // Series data for the chart
    // const chartSeries = [
    //     {
    //         data: [45, 60, 30, 50, 40, 55, 35],
    //     },
    // ];

    return (
        <div className=' -mb-5'>
            {loading ?
                <>
                    <div class="flex justify-center items-center h-[200px]">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                </>
                :
                (<><SmallChartHeaderWrapper header={'TOTAL LINKS'} fluc={percentageChange} total={totalLinks} />
                    <Chart
                        options={chartOptions}
                        series={chartData.series}
                        type="bar"
                        height={170} // Set the chart height
                    />
                </>)
            }
        </div>
    );
};

export default TotalChart;
