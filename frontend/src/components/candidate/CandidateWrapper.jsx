import React,{useEffect} from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom'
// import CandidateLogin from '../../pages/Candidate/CandidateLogin'
// import CandidateSignin from '../../pages/Candidate/CandidateSignin'
import CandidateLogin from '../../pages/Candidate/CandidateLogin'
import CandidateSignin from '../../pages/Candidate/CandidateSignin'
import ForgetPassword from '../../pages/Common/ForgetPassword'

import CandidateHeader from './CandidateHeader'
import Otp from '../../pages/Common/Otp'
import ProfileCreation from '../../pages/Candidate/Profile/ProfileCreation'
import CandidateHome from '../../pages/Candidate/CandidateHome'
import { useDispatch,useSelector } from 'react-redux';
import isAuthUser from '../../utils/isAuthUser'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice'
import axios, { Axios } from 'axios'
import ResetPassword from '../../pages/Common/ResetPassword'
import JobDetail from '../../pages/Candidate/jobs/JobDetail'
import ApplyedJob from '../../pages/Candidate/jobs/ApplyedJob'
import Profile from '../../pages/Candidate/Profile/Profile'
import SavedJobs from '../../pages/Candidate/jobs/SavedJobs'
import SheduledInterviews from '../../pages/Candidate/Interview/SheduledInterviews'
import Message from '../../pages/Candidate/Message/Message'
import Footer from '../Footer'
import { baseURL } from '../Urls'




function CandidateWrapper() {
  const navigate=useNavigate()
  // const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access'); 
  const dispatch =useDispatch()
  const authentication_user = useSelector(state => state.authentication_user);

  const checkAuth = async () =>{
    const isAuthenticated = await isAuthUser();
    if (isAuthenticated.name){
      try{
          const responce = await axios.get(baseURL+'/api/account/user/details',{
            headers:{
              'authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            }
          })
          // console.log("inside userwrapper data.........from backend",responce)
          if(responce.status == 200){
            dispatch(
              set_Authentication({
                name:responce.data.data.full_name,
                email:responce.data.data.email,
                isAuthenticated:true,
                usertype:responce.data.data.usertype,
              })
            )
            dispatch(
              set_user_basic_details({
                profile_pic : responce.data.user_data.profile_pic
              })
            )
          }
      }
      catch(error){
        // console.log(error)
      }
    }
    else{
      navigate('/login')
    }
  };


  useEffect(() => {
    if(!authentication_user.name)
    {
     
      checkAuth();
    
    }
  
  }, [authentication_user])
// console.log("inside candidate wrapper.................",authentication_user)

  return (
    <div>
      <CandidateHeader/>
        <Routes>
          {/* <Route path='/' element={<CandidateLogin/>}> </Route>
          <Route path='/signup' element={<CandidateSignin/>}></Route> */}
          {/* <Route path='/forgot' element={<ForgetPassword/>}></Route> */}
          {/* <Route path='/otp' element={<Otp/>}></Route> */}
          <Route path='/' element={<CandidateHome/>}></Route>
          <Route path='/create_profile' element={<ProfileCreation/>}></Route>
          <Route path='/jobdetails/:jobId/' element={<JobDetail/>}></Route>
          <Route path='/applyedjobs' element={<ApplyedJob/>} ></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/savedjobs' element={<SavedJobs/>}></Route>
          <Route path='/shedules' element={<SheduledInterviews/>}></Route>
          <Route path='/message' element={<Message/>}></Route>
        </Routes>
      <Footer/>
    </div>
  )
}

export default CandidateWrapper
