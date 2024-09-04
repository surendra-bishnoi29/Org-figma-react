import React from 'react'

function SmallChartHeaderWrapper() {
  return (
    
        <div className=' flex justify-between'>
                <div className=' flex flex-col gap-[12px]'>
                    <div className='font-sans text-xs font-medium leading-3 text-left text-[#626C70]'>Total Links</div>
                    <div className=' text-lg'>157,367</div>
                </div>
                <div className='font-sans text-sm font-medium leading-5 text-left text-[#0FAF62]'>
                 ↑ 6.7% Increase
                </div>
            </div>
   
  )
}

export default SmallChartHeaderWrapper