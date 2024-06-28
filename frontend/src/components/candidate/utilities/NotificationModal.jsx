import React, { useRef, useState,useEffect } from 'react'
import axios from 'axios';

function NotificationModal({notifications,setModal,userid,setUnreadCount}) {
  const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access')
    const  modalRef = useRef();
    const notificationRef = useRef();
    const closeModal =(e)=>{
        if(modalRef.current === e.target){
          setModal();
            
          }
        }
  useEffect(()=>{
      const changeStatus = async ()=>{
        try{
          const response = await axios.post(`${baseURL}/chat/notificationStatus/`,{userid},{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
          }
          })
          console.log("notification responce.......",response)
          if(response.status==200){
            setUnreadCount(0)
          }
        }
        catch(error){
          console.log(error)
        }
      }
      changeStatus();
  },[])

 
  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-end mt-10 z-50'>
      <div className='bg-indigo-100 w-96 h-96 rounded-md mr-5 relative'>
                <div className='flex-grow overflow-auto p-2 h-full' ref={notificationRef}>
                {notifications.map((data,index)=>(
                    <div className='bg-white rounded-md my-1' key={index}>
                        {data.message}
                    </div>
                ))}
                </div>
      </div>
    </div>
  )
}

export default NotificationModal
