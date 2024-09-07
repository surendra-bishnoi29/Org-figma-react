import React, {useEffect, useState} from 'react'
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper'
import LinkPerDayChart from './LinkPerDayChart'
import LinkPerDayChartMalicious from './LinkPerDayMalicious'

function LinksPerDayWrapper({ serverData, loading }) {

  const [series, setSeries] = useState([{ name: 'Total Links', data: [] }]);
  const [categories, setCategories] = useState([]);
  const [totalLinks, setTotalLinks] = useState();
  const [percentageChange, setPercentageChange] = useState();
  const [maliciousSeries, setMaliciousSeries] = useState([{ name: 'Malicious Links', data: [] }]);
  const [benignSeries, setBenignSeries] = useState([{ name: 'Benign Links', data: [] }]);

  useEffect(() => {
    // Process the server data and update the chart
    if (serverData && serverData.length > 0) {
      const reversedData = [...serverData].reverse(); // Reverse the server data

      const totalLinksArray = reversedData.map(item => item.total_links);
      const dates = reversedData.map(item => item.date);

      const maliciousLinksArray = reversedData.map(item => item.malicious_links);
      const benignLinksArray = reversedData.map(item => item.benign_links);


      // Update series and categories
      setSeries([{ name: 'Total Links', data: totalLinksArray }]);
      setMaliciousSeries([{ name: 'Malicious Links', data: maliciousLinksArray }]);
      setBenignSeries([{ name: 'Benign Links', data: benignLinksArray }]);
      setCategories(dates);

      // Calculate total links (sum of all days)
      const total = totalLinksArray.reduce((sum, links) => sum + links, 0);
      const perDay = total/7 ;
      setTotalLinks(perDay.toFixed(0));

      // Calculate percentage change between the last two days
      if (totalLinksArray.length >= 2) {
        const lastDayTotal = totalLinksArray[totalLinksArray.length - 1];
        const previousDayTotal = totalLinksArray[totalLinksArray.length - 2];

        if (previousDayTotal > 0) {
          const change = ((lastDayTotal - previousDayTotal) / previousDayTotal) * 100;
          setPercentageChange(change.toFixed(1)); // Round to 2 decimal places
        } else {
          setPercentageChange(null); // Avoid division by zero
        }
      }
    }
  }, [serverData]);

  return (
    <div className=' flex flex-col gap-6'>
      { loading?
      <>
      <div class="flex justify-center items-center h-[200px]">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      </>
      :
        (<>
        <SmallChartHeaderWrapper header={'LINKS PER DAY'} fluc={percentageChange} total={totalLinks} />
        <LinkPerDayChart categories={categories} series={benignSeries} />
        <LinkPerDayChartMalicious categories={categories} series={maliciousSeries} />
        </>)
        }
    </div>
  )
}

export default LinksPerDayWrapper