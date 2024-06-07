import axios from 'axios';
import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

function SheduleModal({setModal,candidate_id,job_id,changeStatus,setAppStatus}) {
    const baseURL='http://127.0.0.1:8000/'
    const token = localStorage.getItem('access')
    const  modalRef = useRef();
    const closeModal =(e)=>{
      if(modalRef.current === e.target){
        setModal();
         }
       }
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("date",event.target.date.value)
        formData.append("candidate",candidate_id)
        formData.append("job",job_id)
        
        console.log(formData)
        try{
             const responce = await axios.post(`${baseURL}api/interview/shedule/`,formData,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
             })
             console.log(responce)
             if(responce.status==201){
                changeStatus('Interview Sheduled');
                setAppStatus('Interview Sheduled');
                setModal();
               
             }
        }
        catch(error){
            console.log(error)
        }
    }
    return (
      <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
       <div className='mt-10 flex flex-col text-white  w-2/6'>
        <button className='place-self-end' onClick={()=>setModal(false)}><IoMdClose size={30}/></button>
        <div className='bg-indigo-200 rounded-xl px-10 py-5  items-center mx-4 '>
        <h1 className='text-gray-700 font-bold text-center text-lg'>Shedule Interview</h1>
           <form action="" onSubmit={handleSubmit} method='post'>
                  <div class="mb-2">
                    <label for="date" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date and Time</label>
                    <input type="datetime-local"  id="date" name='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div className='flex justify-center'>
                      <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Shedule Interview</button>
                    </div>
           </form>
          
        </div>
       </div>
      </div>
    )
  }

export default SheduleModal
