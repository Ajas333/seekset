import React,{useState,useEffect} from 'react'
import { MdOutlineAddTask } from "react-icons/md";
import {Link} from 'react-router-dom'
import { HiHome } from "react-icons/hi2";
import { LiaFileAltSolid } from "react-icons/lia";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { PiUserCircleCheckFill } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { w3cwebsocket as W3CWebSocket, w3cwebsocket } from "websocket";


function SideBar() {
  const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access')
  const userBasicDetails = useSelector((state)=>state.user_basic_details)
  const user_id = userBasicDetails.user_type_id
  console.log("user_id........................",user_id)

  // useEffect(()=>{
  //     const connectToWebSocket =(user_id) =>{
  //   if(!user_id) return;

  //   const messageNotificationSocket = new W3CWebSocket(
  //     `${baseURL}ws/notifications/${user_id}/`
  //   );

  //   messageNotificationSocket.onopen = () => {
  //     console.log('Notification socket connected');
  //   };

  //   messageNotificationSocket.onmessage = function(e) {
  //     const data = JSON.parse(e.data);
  //     const unreadCount = data.unread_count;
  //     console.log("unread message count....................................",unreadCount)
  //   };
  //     messageNotificationSocket.onclose = function(e) {
  //       console.error('Notification socket closed unexpectedly');
  //   };
  // };

  // connectToWebSocket(user_id);
  // },[])

  return (
    <div>
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

      <aside id="default-sidebar" className="fixed top-10 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link to={'/employer/postjob/'}>
                  <p className="flex items-center p-1 justify-center bg-indigo-600 text-gray-100 rounded-lg  hover:bg-indigo-700 hover:text-gray-300 group">
                    <span className="mr-1">Post Job</span>
                    <div className="w-6 h-6 mt-2 text-gray-200 transition duration-75 group-hover:text-gray-400 dark:group-hover:text-white"   >
                        <MdOutlineAddTask />
                    </div>
                  </p>
                  </Link>
              </li>
              <li>
                <Link to={'/employer/'}>
                  <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <HiHome className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                  </p>
                  </Link>
              </li>
              <li>
                <Link to={'/employer/applications/'}>
                  <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <LiaFileAltSolid className='text-gray-500' size={25} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Applications</span>
                  </p>
                  </Link>
              </li>
              <li>
                <Link to={'/employer/chat/'}>
                  <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <MdOutlineMessage className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                  </p>
                  </Link>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IoNotifications className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Notification</span>
                  </a>
              </li>
              <li>
                <Link to={'/employer/shedules/'}>
                  <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <FaUserTie className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Interviews</span>
                  </p>
                  </Link>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <PiUserCircleCheckFill className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IoIosLogOut className='text-gray-500' size={25}/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                  </a>
              </li>
            </ul>
        </div>
      </aside>
     
    </div>
  )
}

export default SideBar
