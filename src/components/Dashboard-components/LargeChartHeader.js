import React, { useState, useEffect, useRef } from 'react';
import { format, subMonths } from 'date-fns';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown visibility state
  const [selectedMonth, setSelectedMonth] = useState('This Month'); // Currently selected option
  const dropdownRef = useRef(null); // Reference for detecting outside clicks
  const selectedMonthRef = useRef(null); // Reference for the selected month item

  // Generate last 12 months dynamically
  const generateMonths = () => {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months.push(format(subMonths(new Date(), i), 'MMM yyyy'));
    }
    return months;
  };

  const months = generateMonths(); // Get the list of months

  const handleMonthSelect = (month) => {
    setSelectedMonth(month); // Set selected month
    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Scroll the selected item into view when dropdown is opened
  useEffect(() => {
    if (isOpen && selectedMonthRef.current) {
      selectedMonthRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center border-b py-3 px-6">
      {/* Left Side - Title */}
      <div className="font-sans font-[400] text-[13px]  leading-6 text-left">
      Most Visited Page
      </div>

      {/* Right Side - Dropdown */}
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
          className="inline-flex justify-center items-center font-[400]  w-full rounded-sm   border-gray-300  px-[4px] py-[4px] bg-gray-50 text-[12px]  text-gray-700 hover:bg-gray-100 focus:outline-none   "
        >
          {selectedMonth}
          <svg
            className={` -mr-[2px] -ml-[1px] h-4 w-4 transition-transform transform ${
              isOpen ? 'rotate-180' : ''
            }`} // Rotates icon when dropdown is open
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Items */}
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
            <div className="py-1">
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${
                  selectedMonth === 'This Month' ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleMonthSelect('This Month')}
                ref={selectedMonth === 'This Month' ? selectedMonthRef : null} // Add ref to the selected item
              >
                This Month
              </a>
              {months.map((month, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${
                    selectedMonth === month ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleMonthSelect(month)}
                  ref={selectedMonth === month ? selectedMonthRef : null} // Add ref to the selected item
                >
                  {month}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
