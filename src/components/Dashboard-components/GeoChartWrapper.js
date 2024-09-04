import React from 'react'
import GeoChart from './GeoChart'
import LargeChartHeader from './LargeChartHeader'

function GeoChartWrapper() {
  return (

    <div>
      <LargeChartHeader/>
    <div className=' bg-white rounded-lg text-center flex justify-center w-[60%]'>
      
        <GeoChart/>
    </div>
    </div>
  )
}

export default GeoChartWrapper