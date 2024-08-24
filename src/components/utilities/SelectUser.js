import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { getAllUsers } from '../../Actions/userAction'
import blank_img from '../utilities/blank.jpg'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectUser(props) {
  const { selected, setSelected } = props;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    getAllusersList();
  }, [])


  const getAllusersList = async () => {
    // This function call API function from ACTIONS.
    const response = await getAllUsers();
    if (response) {
      setData(response);
      setFilteredData(response);
    } else if (response?.error) {
      console.log(response?.error);
    }


  }

  // const filteredData = query === "" ? data : data.filter(person =>
  //   person.name.toLowerCase().includes(query.toLowerCase())
  // );

  const filterData = (q) => {
    setQuery(q);
    const filtered_Data = q === "" ? data : data.filter(person =>
      person.name.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredData(filtered_Data);
  }

  const onChange = (e) => {
    setSelected(e);
    setQuery('');
    setFilteredData(data);
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>

          <div className="relative ">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={(selected.image=='')?blank_img:selected.image} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >

              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div>
                  <span className=' flex justify-center'>
                    <input
                      type="text"
                      placeholder="Search..."
                      className=" w-[98%]  border border-gray-200 rounded-sm p-2 "
                      onChange={(e) => {filterData(e.target.value)}}
                    />
                  </span>
                  {filteredData.map((person) => (
                    <Listbox.Option
                      key={person._id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >

                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img 
                            src={(person?.image =='')?blank_img:person.image} 
                           
                            alt="" 
                            className="h-5 w-5 flex-shrink-0 rounded-full" 

                            />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>

            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
