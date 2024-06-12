import React, { useState,useEffect } from 'react'
import SideBar from '../../components/employer/SideBar'
import { Link } from 'react-router-dom'
import axios from 'axios'


function EmpHome() {
  const [jobData, setJobData] = useState([])
  const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access')

  useEffect(() => {
   const fetchJobDetails = async ()=>{
    try{
      const responce = await axios.get(baseURL+'api/empjob/getjobs/',{
        headers:{
          'Authorization': `Bearer ${token}`,
          
          'Accept' : 'application/json',
          'Content-Type': 'multipart/form-data'
      }
      })
      console.log(responce)
      if(responce.status == 200){
        setJobData(responce.data.data)
        console.log("job data",jobData)
      }
    }
    catch(error){
      console.log("something went wrond",error)
    }
   };

   fetchJobDetails();
  }, [])
  return (
    <div className='pt-14 '>
      <SideBar/>
      <div className="p-4 sm:ml-64">
        <Link to={'/employer/home/'}>
        <div className='bg-gray-50 cursor-pointer'>
         Home
        </div>
        </Link>
        <div className=''>
          {jobData.length >0 ?
              jobData.map((job)=>(
                  
                <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                {/* <div class="group relative h-16 w-16 overflow-hidden rounded-lg">
                  <img src="/images/EC25KRDBo-K3w8GexNHSE.png" alt="" class="h-full w-full object-cover text-gray-700" />
                </div> */}
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                  {/* <h3 class="text-sm text-gray-600">Invision</h3> */}
                 <Link to={`/employer/jobdetail/${job.id}`}> <p className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"> {job.title} </p></Link>
                  {/* <p className="overflow-hidden pr-7 text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna .</p> */}
                  <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">Status:{job.active ==true?
                    (<span class="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> Active</span>):
                  (<span class="ml-2 mr-3 rounded-full bg-red-100 px-2 py-0.5 text-red-900"> expired</span>)}
                    </div>
                    <div className="">Location:<span class="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-blue-900">{job.location}</span></div>
                  </div>
                  <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">Experience:<span class="ml-2 mr-3 rounded-full bg-pink-100 px-2 py-0.5 text-green-900"> {job.experiance}</span></div>
                    <div className="">Salary:<span class="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.lpa} lpa</span></div>
                  </div>
                </div>
              </div>
             
              ))
              
              :
              (
                <div>gyvubinomkp</div>
              ) }
            
        </div>
      </div>
    </div>
  )
}

export default EmpHome
