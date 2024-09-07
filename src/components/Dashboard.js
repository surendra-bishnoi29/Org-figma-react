import React, { useEffect, useState } from 'react'
import GeoChart from './Dashboard-components/GeoChart'
import GeoChartWrapper from './Dashboard-components/GeoChartWrapper'
import TotalLinksCard from './Dashboard-components/TotalLinksCard'
import LinkPerDayChart from './Dashboard-components/LinkPerDayChart'
import LinksPerDayWrapper from './Dashboard-components/LinksPerDayWrapper'
import MaliciousUrlsSmall from './Dashboard-components/MaliciousUrlsSmall'
import BounceRateChart from './Dashboard-components/BounceRateChart'
import DualAreaChart from './Dashboard-components/BenignVsMalign'
import DonutChart from './Dashboard-components/DonutChart'
import LinkHistory from './Dashboard-components/LinkHistory'
import { getAnalyticsByMonth, getAnalyticsByWeekly, getAnalyticsLastSevenDays } from '../Actions/DashboardActions'
import { format } from 'date-fns';

function Dashboard() {
  const [weeklyLoading, setWeeklyLoading] = useState(true);
  const [monthlyLoading, setMonthlyLoading] = useState(true);
  const [dailyLoading, setDailyLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(()=>{
    getWeeklyData();
    getLinksPerDay();
    getLinksMonthly();
  },[])

  const getWeeklyData = async() =>{
    setWeeklyLoading(true);
    const response = await getAnalyticsByWeekly();
    if (response.status){
      setWeeklyData(response.data)
    }
    setWeeklyLoading(false);
  }

  const getLinksPerDay = async() => {
    setDailyLoading(true);
    const response = await getAnalyticsLastSevenDays();
    if (response.status){
      setDailyData(response.data)
    }
    setDailyLoading(false);
  }

  const getLinksMonthly = async () =>{
    setMonthlyLoading(true);
    const numericMonth = format(new Date(), 'MM'); 
    const currentYear = format(new Date(), 'yyyy');
    const response = await getAnalyticsByMonth(numericMonth,currentYear );
    if (response.status){
      setMonthlyData(response.data)
    }
    setMonthlyLoading(false);
  }

  return (
    <div className="p-4">
      {/* Parent Grid: 4 columns on laptops, 3 on tablets, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* 1st Child Element: 4 segments, each taking one full column */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 col-span-full">
          <div className="bg-white  rounded-lg p-6">
            <TotalLinksCard serverData={weeklyData} loading={weeklyLoading} />
          </div>
          <div className="bg-white  rounded-lg p-6">
            <LinksPerDayWrapper serverData={dailyData} loading={dailyLoading} />
          </div>
          <div className="bg-white  rounded-lg p-6">
            <MaliciousUrlsSmall serverData={weeklyData} loading={weeklyLoading} />
          </div>
          <div className="bg-white  rounded-lg p-6">
            <BounceRateChart serverData={dailyData} loading={dailyLoading} />
          </div>
        </div>

        {/* 2nd Child Element: 2 segments, 3 columns and 1 column on laptops */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 col-span-full">
          <div className="bg-white  rounded-lg  lg:col-span-3">
            <DualAreaChart serverData={monthlyData} loading={monthlyLoading} />
          </div>
          <div className="bg-white  rounded-lg  lg:col-span-1">
            <DonutChart  serverData={monthlyData} loading={monthlyLoading}/>
          </div>
        </div>

        {/* 3rd Child Element: Takes 3 columns on laptops, full width on tablets and mobile */}
        <div className="bg-white  rounded-lg  lg:col-span-3 md:col-span-full col-span-full">
         <GeoChart serverData={monthlyData} loading={monthlyLoading} />
        </div>

        {/* 4th Child Element: Same as 3rd, takes 3 columns on laptops */}
        <div className="  rounded-lg  lg:col-span-3 md:col-span-full col-span-full">
          <LinkHistory />
        </div>

      </div>
    </div>
  )
}

export default Dashboard