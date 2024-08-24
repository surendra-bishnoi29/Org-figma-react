import React, { useState, useEffect, useRef } from 'react'
import DropDown from '../utilities/DropDown'
import CommonDropDown from '../utilities/CommonDropDown'
import AddFile from './AddFile'
import PersonalIcon from '../../Icons/PersonalIcon'
import FinancialIcon from '../../Icons/FinancialIcon'
import { useMediaQuery } from 'react-responsive';

function SelectDocumentType(props) {
    // const [openDropdown, setOpenDropdown] = useState(false)
    // const [selected, setSelected] = useState('Personal')
    const { selected, setSelected } = props

    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 440 });


    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (btnDropdownRef.current && !btnDropdownRef.current.contains(event.target)) {
            setDropdownPopoverShow(false);
        }
    };




    // Effect to add click event listener when component mounts
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const documentTypeChange = (type) => {
        setSelected(type)
    }

    const items = [
        // {
        //     id: 1,
        //     component: isMobile ? <div className=' border-b border-gray-300 py-0.5 px-2 '><AddFile showText={true} /></div> : ''
        // },
        {
            id: 1,
            component: <div className=' hover:bg-slate-100 flex py-0.5 px-2 gap-2'> <PersonalIcon /> <span>Personal</span></div>,
            onClick: () => { documentTypeChange('Personal') }
        },
        {
            id: 2,
            component: <div className='  hover:bg-slate-100 flex py-0.5 px-2 gap-2'><FinancialIcon /> <span>Financial</span></div>,
            onClick: () => { documentTypeChange('Financial') }
        }
    ]


    return (
        <div ref={btnDropdownRef} className=' text-center'>
            <div onClick={()=>{setDropdownPopoverShow(!dropdownPopoverShow)}} className=' flex items-center justify-between  bg-[#4F46E5] text-white rounded-lg'>
                <div className=' py-1 px-2 '>{selected}</div>
                <div className=' px-1 border-l border-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd">
                        </path>
                    </svg>
                </div>
            </div>
            {/* <DropDown  /> */}
            {dropdownPopoverShow && <CommonDropDown items={items} />}
        </div>

    )
}

export default SelectDocumentType