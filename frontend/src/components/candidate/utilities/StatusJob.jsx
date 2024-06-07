import React, { useState,useEffect } from 'react'

function StatusJob({selectedJob}) {
    const [step,setStep]=useState(0)
    
   
    useEffect(() => {
        if (selectedJob && selectedJob.status) {
            if (selectedJob.status === "Application Send") {
              setStep(1);
            } else if (selectedJob.status === "Application Viewd") {
              setStep(2);
            } else if (selectedJob.status === "Resume Viewd") {
              setStep(3);
            } else if(selectedJob.status === "Interview Sheduled"){
              setStep(4);
            }
            else if(selectedJob.status === "Accepted"){
                setStep(5);
            }
            else{
                setStep(6)
            }
          }
      }, [selectedJob]);
    
    
      if (!selectedJob) {
        return null; // or a loading spinner or message
      }
 
      
    console.log("inside status job component",selectedJob)
    console.log("step.................",step)
   
    
  return (
    <div>
      <div className=' bg-white mb-2 p-3 rounded-md px '>
                    <div className=''>
                        <p className='text-xl font-bold text-gray-800'>{selectedJob.job.title}</p>
                        <span>{selectedJob.job.employer.user_full_name}</span>
                    </div>
                    <div className='mt-3'>
                        <hr className='w-full border-t-2 border-solid border-gray-400' />
                    </div>
                    <span className='text-lg font-bold'>Application Status</span>
                    
                    <div className="flex items-center justify-between mt-3">
                        <div className={`flex flex-col items-center `}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500' : 'bg-gray-500'}`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="mt-2 text-center">Application Sent</p>
                        </div>
                        <div className={`flex flex-col items-center `}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-500' : 'bg-gray-500'}`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="mt-2 text-center">Application Viewed</p>
                        </div>
                        <div className={`flex flex-col items-center `}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-500' : 'bg-gray-500'}`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="mt-2 text-center">Resume Viewed</p>                
                        </div> 
                        <div className={`flex flex-col items-center `}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step == 4 ? 'bg-green-500': step == 6 ? 'bg-red-500': 'bg-gray-500'}`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className={`mt-2 text-center ${step >=4 ? 'font-bold' : ''}`}>{step >=4 ? (<p>{selectedJob.status}</p>):(<p>Recruter Action</p>)}</p>                
                        </div> 
                    </div>

                </div>

                <div className=' bg-white mb-2 p-3 rounded-md px '>
                    <div className='w-full py-4 px-3 flex flex-col gap-2'>
                        <div className=''>
                        <span className='text-gray-700 font-semibold text-lg'>Job description</span>
                        <p className='text-base text-gray-700'>{selectedJob.job.about}</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                        <span className='text-gray-700 font-semibold text-lg'>Job Type:</span>
                        <p className='text-base text-gray-700 '>{selectedJob.job.jobtype}</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                        <span className='text-gray-700 font-semibold text-lg'>Job Mode:</span>
                        <p className='text-base text-gray-700 '>{selectedJob.job.jobmode}</p>
                        </div>
                        <div className=''>
                        <span className='text-gray-700 font-semibold text-lg'>Responcibilities</span>
                        <p className='text-base text-gray-700'>{selectedJob.job.responsibility}</p>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default StatusJob
