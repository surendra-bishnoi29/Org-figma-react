import React from 'react'
import { classNames } from '../../shared/Utils'

function SmallChartHeaderWrapper({header, fluc, total, percentage=false}) {
  return (
    
        <div className=' flex justify-between'>
                <div className=' flex flex-col gap-[12px]'>
                    <div className='font-sans text-[10px] font-medium leading-3 text-left text-[#626C70]'>{header}</div>
                    <div className=' text-sm'>{total}{percentage?'%':''}</div>
                </div>
                <div className={classNames(fluc<0?'text-[#E84646]':'text-[#0FAF62]', 'font-sans text-[12px] font-medium leading-5 text-left text-[#0FAF62]')}>
                 {fluc<0 ?`↓ ${-(fluc)}% Decrease`: `↑ ${fluc?fluc:0}% Increase`}
                </div>
            </div>
   
  )
}

export default SmallChartHeaderWrapper