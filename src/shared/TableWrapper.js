import React from 'react'
import Table from './Table'

function TableWrapper(props) {
    const {header = 'Header'} = props
  return (
    <div className='h-full w-full relative bg-white border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
    {/* Header with sticky behavior */}
    <div className=' font-public-sans text-[12px] font-medium leading-6 text-left sticky top-0 h-[56px] px-6 py-3 flex justify-between items-center text-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10'>
        {header}
    </div>

    {/* Scrollable table */}
    <div className='overflow-y-auto max-h-[800px]'> {/* Set a height for the scrollable area */}
        <Table {...props} />
    </div>
</div>

  )
}

export default TableWrapper