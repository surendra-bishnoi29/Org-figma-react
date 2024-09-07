import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import LargeChartHeader from './LargeChartHeader';
import { format } from 'date-fns';
import { getLinkHistoryByMonth } from '../../Actions/DashboardActions';

// Example component for rendering the GeoChart and additional data
function GeoChart() {
  const [geoData, setGeoData] = useState([["Country", "Popularity"]]); // GeoChart data
  const [topCountries, setTopCountries] = useState([]); // Top countries for displaying additional info
  const [data, setData] = useState([]);
  
  const numericMonth = format(new Date(), 'MM'); 
  const currentYear = format(new Date(), 'yyyy');

  useEffect(() => {
    getLinks(numericMonth, currentYear);
  }, []);

  const getLinks = async (month, year) => {
    const res = await getLinkHistoryByMonth(month, year);
    if (res) {
      if (res.status) {
        setData(res.data);
        processServerData(res.data); // Process the server response
      }
    }
  };

  // Function to process the server data and generate GeoChart and top countries data
  const processServerData = (serverData) => {
    const countryCountMap = {};

    // Count occurrences of countries in the server data
    serverData.forEach((item) => {
      const countryCode = item?.location?.country;
      if (countryCode) {
        countryCountMap[countryCode] = (countryCountMap[countryCode] || 0) + 1;
      }
    });

    // Prepare the data array for GeoChart
    const geoChartData = [["Country", "Links"]];
    const countryList = [];

    for (const [country, count] of Object.entries(countryCountMap)) {
      geoChartData.push([country, count]);
      countryList.push({ country, count });
    }

    // Sort countries by count for displaying top countries
    countryList.sort((a, b) => b.count - a.count);

    setGeoData(geoChartData);
    setTopCountries(countryList.slice(0, 3)); // Show top 3 countries
  };

  // Helper function to calculate the percentage of total users from a country
  const getPercentage = (count) => {
    const total = data.length;
    return ((count / total) * 100).toFixed(1);
  };


  const changeMonthYear = async (m, y) => {
    // setLoader(true);

    getLinks(m,y)

  // const response = await getAnalyticsByMonth(m, y);
  //   if (response.status) {
  //     setData(response.data)
  //   }
  //   setLoader(false);
  }

  return (
    <div className="w-full flex flex-col gap-[24px] justify-center items-center">
      <div className="w-[60%]">
        <LargeChartHeader header="Links Location"  changeMonthYear={changeMonthYear} />
      </div>

      {/* GeoChart Display */}
      <div>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = geoData[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          className="h-[225px] aspect-w-190 aspect-h-42"
          options={{
            legend: true,
            colors: ['#CFDFF7', '#9FBFF0', '#6E9FE8'],
            enableRegionInteractivity: true,
            displayMode: 'regions',
            datalessRegionColor: '#CFDFF7',
            region: 'world',
            resolution: 'countries',
            is3D: true,
            showTooltip: true,
          }}
          data={geoData}
        />
      </div>

      {/* Top Countries Info */}
      {/* <div className="w-[60%] flex justify-between mt-4">
        {topCountries.map((country, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-2xl font-semibold">
              {getPercentage(country.count)}%
            </div>
            <div className="text-gray-600 text-sm">
              {country.country === 'US' ? 'United States' : country.country}
            </div>
            <div className="text-gray-500">
              {country.count.toLocaleString()} Users
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default GeoChart;
