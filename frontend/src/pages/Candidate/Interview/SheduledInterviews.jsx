import React,{useEffect,useState} from 'react'
import axios from 'axios'


function SheduledInterviews() {
    const baseURL='http://127.0.0.1:8000'
    const token = localStorage.getItem('access'); 

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const responce = await axios.get(baseURL+'/api/interview/shedules/',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log("Sheduled jobs details.....",responce)
                
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData();
    },[])
    return (
    <div className='pt-12'>
      Sheduled interviews......................
    </div>
  )
}

export default SheduledInterviews
