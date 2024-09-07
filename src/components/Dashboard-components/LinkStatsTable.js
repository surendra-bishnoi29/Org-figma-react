import React from 'react';

const LinkStatsTable = ({chartData}) => {
    // Example data (you can modify or replace it with dynamic data)
    const data = [
        {
            id: 1,
            type: 'Safe Links',
            totalUsers: 547914,
            bounceRate: 81.94,
            color: 'bg-blue-600', // For blue dot
        },
        {
            id: 2,
            type: 'Malicious Links',
            totalUsers: 547914,
            bounceRate: 81.94,
            color: 'bg-red-600', // For red dot
        },
    ];

    return (
        <div className='pb-[24px] text-[10px] w-full flex  flex-col  '>
            {/* <table className=' w-full text-[10px] p-4'>
    <thead className=' bg-blue-50   font-[100] text-gray-500 '>
        <tr  >
            <th className=' font-[400]  '>
               
            </th>
            <th  className=' font-[400] '>
                 LINKS
            </th>
            <th  className=' font-[400] pr-3'>
            BOUNCE RATE
            </th>
        </tr>
    </thead>
    <tbody className=' '>
        <tr className='  '>
            <td className=' pl-4'>
            <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 bg-blue-600`}
                ></span>
                Benign Links
            </td>

            <td className=' pl-3'>
            547,914
            </td>

            <td className=' pl-3'>
            81.94%
            </td>
        </tr>
        <tr className='  '>
            <td className=' pl-4'>
            <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 bg-red-600`}
                ></span>
                Malicious Links
            </td>

            <td className=' pl-3'>
            547,914
            </td>

            <td className=' pl-3'>
            81.94%
            </td>
        </tr>
    </tbody>
   </table> */}
            {/* <div className='  w-full '>
                <div className=' w-full flex flex-col'>
                    <div className=' bg-blue-50 pl-3 text-gray-400'>
                        Type
                    </div>
                    <div className=' pl-3 pt-3'  >
                        <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 bg-blue-600`}
                        ></span>
                        Benign Links

                    </div>
                    <div className=' pl-3 pt-3'>
                        <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 bg-red-600`}
                        ></span>
                        Malicious Links
                    </div>
                </div>
            </div>
            <div className=' '>
                <div className=' flex flex-col'>
                    <div className=' bg-blue-50  text-gray-400'>
                        Links
                    </div>
                    <div className='  pt-3'  >
                        547,914
                    </div>
                    <div className=' pt-3'>

                        547,914
                    </div>
                </div>
            </div>
            <div className=' w-full   '>
                <div className=' flex flex-col'>
                    <div className=' bg-blue-50 pl-1 text-gray-400'>
                    Bounce Rate
                    </div>
                    <div className=' pl-3  pt-3'  >
                    81.94%
                    </div>
                    <div className=' pl-3  pt-3'>

                    81.94%
                    </div>
                </div>
            </div> */}
            <div className=' flex flex-row bg-blue-50 w-full justify-between px-5'>
                <div className=' pr-10'>Type</div>
                <div className='ml-4'>
                    Links
                </div>
                <div>
                    Bounce Rate
                </div>
            </div>
            <div className=' pl-4 flex flex-row justify-between pr-5 '>
                <div>
                <span
                            className={`inline-block w-2 h-2 rounded-full mr-1 bg-blue-600`}
                        ></span>
                        Benign Links
                </div>
                <div className=' '>
               {chartData.series[0].data}
               </div> 
               <div>
               81.94%
               </div>
            </div>
            <div className=' pl-4 flex flex-row justify-between pr-5 '>
            <div>
            <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 bg-red-600`}
                        ></span>
                        Malicious Links
                </div>
                <div className=' -ml-3'>
                {chartData.series[1].data}
               </div> 
               <div>
               81.94%
               </div>
            </div>
            
        </div>
    );
};

export default LinkStatsTable;
