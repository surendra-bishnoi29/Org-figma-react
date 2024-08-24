import React from 'react'

function Search() {
  return (
    <div class="">
    <label htmlFor="search" class="sr-only">Search</label>
    <div class="relative  w-fit">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"></path>
            </svg>
        </div>
        <input
            type="text"
            id="search"
            class="bg-[#F2F3F4]  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 placeholder:text-sm  "
            placeholder="Search"
            // value={value || ""}
            // onChange={e => {
            //     setValue(e.target.value);
            //     onChange(e.target.value);
            // }}
        />
    </div>
</div>
  )
}

export default Search