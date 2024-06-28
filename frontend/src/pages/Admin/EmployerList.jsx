// import React,{useState,useEffect} from 'react'
// import Sidebar from '../../components/admin/Utilities/Sidebar'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function EmployerList() {
//   const baseURL = "http://127.0.0.1:8000";
//   const [employelist,setEmployelist] = useState([])
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(()=>{
//     const fetchData = async()=>{
//       try{
//         const response = await axios.get(baseURL+'/dashboard/elist/')
//         console.log(response)
//         if(response.status == 200){
//           setEmployelist(response.data)
//         } 
//       } 
//       catch(error){
//         console.log(error)
//       }
//     }
//     fetchData()
//   },[])

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
// };

// const filteredEmployers = employelist.filter((employer) =>
//   employer.user_name.toLowerCase().includes(searchTerm.toLowerCase())
// );


//   console.log(employelist)
//   return (
//     <div className='flex'>
//       <div className='w-64'>
//           <Sidebar/>
//       </div>
//       <div className=' w-full pl-11 mt-12'>
//         <div className=' flex justify-between'>
//           <span className='text-xl font-bold'>Employer List</span>
//           <div className='w-2/5 py-2'>
                
//             <form class=" mx-auto">   
//                 <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                 <div class="relative">
//                     <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                         <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                         </svg>
//                     </div>
//                   <input
//                     type="search"
//                     id="default-search"
//                     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Search by name..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     required
//                 />
//                 </div>
//             </form>

//           </div>
//         </div>
//         <div className=''>
//           <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
//               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  
//                   <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                       <tr>
//                           <th scope="col" class="px-6 py-3">
//                               Profile Pic
//                           </th>
//                           <th scope="col" class="px-6 py-3">
//                               Name
//                           </th>
//                           <th scope="col" class="px-6 py-3">
//                               Email
//                           </th>
//                           <th scope="col" class="px-6 py-3">
//                               Phone
//                           </th>
//                           <th scope="col" class="px-6 py-3">
//                               Status
//                           </th>
//                           <th scope="col" class="px-6 py-3">
//                               Action
//                           </th>
//                       </tr>
//                   </thead>
//                   <tbody>
//                     {employelist && employelist.map((list,index)=>(
//                       <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                         <Link to={`/admin/edetails/${list.id}`}>
//                           <th scope="row" class="px-6 py-4 ">
//                             <img class="w-10 h-10 rounded-full" src={baseURL+list.profile_pic} alt="Rounded avatar"/>
//                           </th>
//                           </Link>
//                           <td class="px-6 py-4">
//                               {list.user_name}
//                           </td>
//                           <td class="px-6 py-4">
//                               {list.email}
//                           </td>
//                           <td class="px-6 py-4">
//                               {list.phone}
//                           </td>
//                           <td class="px-6 py-4">
//                               {list.status == true ?("Active"):("Inactive")}
//                           </td>
//                           <td class="px-6 py-4 text-right">
//                               <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{list.status == true ? (
//                                 <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
//                                   Block</button>
//                               ):(
//                                 <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//                                   Unblock</button>
//                               )}</a>
//                           </td>
//                       </tr>
//                     ))}
//                   </tbody>
//               </table>
//           </div>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default EmployerList

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Utilities/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployerList() {
    const baseURL = "http://127.0.0.1:8000";
    const [employelist, setEmployelist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/dashboard/elist/`);
                if (response.status === 200) {
                    setEmployelist(response.data);
                }
            } catch (error) {
                console.error('Error fetching employer list:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployers = employelist.filter((employer) =>
        employer.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex'>
            <div className='w-64'>
                <Sidebar />
            </div>
            <div className='w-full pl-11 mt-12'>
                <div className='flex justify-between'>
                    <span className='text-xl font-bold'>Employer List</span>
                    <div className='w-2/5 py-2'>
                        <form className="mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className=''>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Profile Pic
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployers.map((list, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <Link to={`/admin/edetails/${list.id}`}>
                                            <th scope="row" className="px-6 py-4">
                                                <img className="w-10 h-10 rounded-full" src={baseURL + list.profile_pic} alt="Rounded avatar" />
                                            </th>
                                        </Link>
                                        <td className="px-6 py-4">
                                            {list.user_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list.status ? "Active" : "Inactive"}
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerList;
