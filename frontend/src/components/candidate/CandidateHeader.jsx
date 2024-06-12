import React,{useEffect} from 'react'
import logo from '../../assets/logo.png'
import default_img from '../../assets/default.png'
import { MdOutlineMessage } from "react-icons/md";
import { ImBookmarks } from "react-icons/im";
import { FaFileAlt,FaEnvelopeOpenText } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { useSelector, useDispatch } from "react-redux";
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';
import { FaUserTie } from "react-icons/fa";

function CandidateHeader() {
  const authentication_user = useSelector((state)=> state.authentication_user);
  const userBasicDetails = useSelector((state)=>state.user_basic_details);
  const baseURL='http://127.0.0.1:8000'
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const profile_image=`${baseURL}${userBasicDetails.profile_pic}`
  
  console.log("inside user header...............",authentication_user)
  console.log("inside user header.....................",userBasicDetails)
  const handleLogout = ()=>{
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        email:null,
        isAuthenticated: false,
        isAdmin: false,
        usertype:null,
      })
    );
    dispatch(
      set_user_basic_details({
        name: null,
        email:null,
        phone:null,
        profile_pic:null
      })
    );
    navigate('/candidate/')
  }
  const items = [
    {
      label: (
        <Link to={'/candidate/profile/'}><p>Profile</p></Link>
      ),
      key: '0',
    },
    {
      label: (
        <p onClick={handleLogout} className=''>Logout</p>
      ),
      key: '1',
    },
  ];

  return (
    <div className='w-full flex justify-between h-12 bg-blue-200 fixed top-0 z-50' >
        <Link to={'/'}>
        <div className='ml-3  flex cursor-pointer'>
            <div className='mt-2'>
              <img src={logo} alt="" className='w-10 h-8'/>
            </div>
            <p className='mt-2 text-xl font-bold font-sans text-indigo-900'>
              SeekSet
            </p>
        </div>
        </Link>
        <div className='flex items-center'>
            <Link to={'/candidate/home/'}><span className='text-base font-semibold text-bg-800 cursor-pointer'>Home</span></Link>
        </div>
        <div className='flex'>
            <div className='pt-1 mx-2'>
              <hr className='h-10 border-l-4 border-solid border-gray-500' />
            </div>
            <div className='flex gap-7 px-3 items-center'>
                <Link to={'/candidate/message/'}>
                <div className='flex flex-col justify-center items-center'>
                    <MdOutlineMessage className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Message</p>
                </div>
                </Link>
                <div className='flex flex-col justify-center items-center'>
                    <FaEnvelopeOpenText  className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Accepted jobs</p>
                </div>
                <Link to={'/candidate/shedules/'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <FaUserTie  className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Interview</p>
                </div>
                </Link>
                <Link to={'/candidate/savedjobs'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <ImBookmarks className='w-5 h-5 '/>
                    <p className='text-xs font-medium text-gray-500'>Saved Jobs</p>
                </div>
                </Link>
                <Link to={'/candidate/applyedjobs/'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                <FaFileAlt className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Applyed Jobs</p>
                </div>
                </Link>
                <div className='flex flex-col justify-center items-center'>
                    <IoNotifications className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Notification</p>
                </div>
                <div className='flex flex-col justify-center items-center '>
                 
                  <Dropdown menu={{items,}}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          {authentication_user.isAuthenticated ? 
                            <img class="w-10 h-10 rounded-full" src={profile_image} alt="Rounded avatar"/> 
                            :
                            <img class="w-8 h-8 rounded-full" src={default_img} alt="Rounded avatar"/>
                        }
                         
                        </Space>
                      </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateHeader
