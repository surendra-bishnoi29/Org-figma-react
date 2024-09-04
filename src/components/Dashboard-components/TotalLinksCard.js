import React from 'react';
import Chart from 'react-apexcharts';
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper';

const TotalChart = () => {
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
    };

    // Series data for the chart
    const chartSeries = [
        {
            data: [45, 60, 30, 50, 40, 55, 35],
        },
    ];

    return (
        <div className=' -mb-5'>
            <SmallChartHeaderWrapper/>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={170} // Set the chart height
            />
        </div>
    );
};

export default TotalChart;
