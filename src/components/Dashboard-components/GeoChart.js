import React from 'react'
import { Chart } from "react-google-charts";
import LargeChartHeader from './LargeChartHeader';


export const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
    ["India",500],
    ["AE", 700]
  ];

function GeoChart() {
  return (
    <div className=' w-full flex flex-col gap-[24px] justify-center items-center '>
      <div className=' w-[60%]'>
      <LargeChartHeader />
      </div>
      <div>
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
    //   width="32%"
      className='  h-[225px]   aspect-w-190 aspect-h-42 '
      
      options={{
        legend:false,
        colors:["#CFDFF7", "#9FBFF0","#6E9FE8"],
        enableRegionInteractivity: false,
        displayMode: "regions",
        datalessRegionColor: "#CFDFF7",
        region:'world',
        resolution: 'countries',
        is3D:true,
        
        showTooltip: false, 
        geochart: {
            //borderColor: "#ffffff", // Match the border color to the background to make borders invisible
            borderWidth: 0, // Remove the border width
          },
      }}
    //   height="252px"
      data={data}
    />
    </div>
    </div>
  )
}

export default GeoChart;