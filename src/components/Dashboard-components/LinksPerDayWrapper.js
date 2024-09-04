import React from 'react'
import SmallChartHeaderWrapper from './SmallChartHeaderWrapper'
import LinkPerDayChart from './LinkPerDayChart'
import LinkPerDayChartMalicious from './LinkPerDayMalicious'

function LinksPerDayWrapper() {
  return (
    <div className=' flex flex-col gap-6'>
        <SmallChartHeaderWrapper/>
        <LinkPerDayChart/>
        <LinkPerDayChartMalicious />
    </div>
  )
}

export default LinksPerDayWrapper