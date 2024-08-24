import { Squares2X2Icon } from '@heroicons/react/16/solid'
import React from 'react'
import Square from '../../Icons/Square'
import BellIcon from '../../Icons/BellIcon'
import Search from './Search'

function Header() {
  return (
    <div className=' flex justify-between  items-center h-full'>
        <div>
          <Search />
        </div>

        <div className=' flex gap-[16px] items-center'>
            <div><Square/></div>
            <div><BellIcon/></div>
            <img src="CydiaIcon.png" className=' w-10 h-10' />
        </div>
    </div>
  )
}

export default Header