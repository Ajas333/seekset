import React,{useState,useEffect} from 'react'
import { GrSearch } from "react-icons/gr";
import Filter from '../../components/candidate/utilities/Filter';
import axios from 'axios';
import JobCard from '../../components/candidate/utilities/JobCard';
import NewsCard from '../../components/candidate/utilities/NewsCard';

function CandidateHome() {
  
    const [dateRange, setDateRange] = useState('');
    const [salaryRange, setSalaryRange] = useState(0);
    const [jobType,setJobType] =useState('')
    const [experienceType, setExperienceType] = useState('');
    const baseURL='http://127.0.0.1:8000'
    const token = localStorage.getItem('access')
    const [jobData,setJobData] = useState([])

    useEffect(() => {
      const fetchJobData = async()=>{
        try{
          const responce = await axios.get(baseURL+'/api/empjob/getAlljobs/',{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'multipart/form-data'
          }
          })
          console.log(responce)
          if(responce.status == 200){
            setJobData(responce.data)
          }
          else{
            alert("something went wrong")
          }
        }
        catch(error){
          console.log(error)
        }
      }
      fetchJobData();
    },[])
    const handleFilter = ()=>{

    }
  console.log("ufvuyfuyfuyfuyf",jobData)
  return (
    <div className='mt-10'> 
      {/* filter side bar */}
        <Filter 
        dateRange={dateRange}
        setDateRange={setDateRange}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
        jobType={jobType}
        setJobType={setJobType}
        experienceType={experienceType}
        setExperienceType={setExperienceType}
        handleFilter={handleFilter}
        />

        
    {/* main body  */}
        <div className='ml-72'>
          {/* search bar */}
          <div className='pt-7 0 flex justify-center'>
                  <form className=' flex justify-center'>
                    <div className='bg-gray-100 px-6 py-2 rounded-lg  flex items-center'>
                        <GrSearch className='w-6 h-6 ml-3'/>
                      
                          <div>
                            <input type="text" name="" id="" className='ml-1 bg-transparent border-0 focus:outline-none focus:border-0 p-2 text-gray-700' 
                            placeholder='Search job here'/>
                          </div>
                          <div className='ml-3'>
                            <hr className='h-10 border-l-4 border-solid border-gray-500' />
                          </div>
                          <div className='ml-3'>
                            <input type="text" name="" id="" className='ml-1 bg-transparent border-0 focus:outline-none focus:border-0 p-2 text-gray-700' 
                            placeholder='Search job by location'/>
                          </div>
                          <div className='ml-3'>
                          <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                          Search
                          </button>
                          </div>
                    </div>
                  </form>
          </div>

          <div className='flex' >
              {/* job cards */}
                  <div className='flex flex-col justify-center mt-5 w-4/6'>
                      {jobData.map((job)=>(
                        
                          <JobCard id={job.id} img={job.employer.profile_pic} title={job.title} posted={job.posteDate} applybefore={job.applyBefore}
                          empname={job.employer.user_full_name} jobtype={job.jobtype} salary={job.lpa} experiance={job.experiance} location={job.location}/>
                      ))}
                  </div>

                  <NewsCard/>
        </div>
        
        </div>
    </div>
  )
}

export default CandidateHome
