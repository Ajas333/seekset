import React,{useEffect} from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom'
import EmpHome from '../../pages/Employer/EmpHome'
import EmpLogin from '../../pages/Employer/EmpLogin'
import EmpSignup from '../../pages/Employer/EmpSignuo'
import ForgetPassword from '../../pages/Common/ForgetPassword'
import Otp from '../../pages/Common/Otp'
import EmployerHeader from './EmployerHeader'
import { useDispatch,useSelector } from 'react-redux';
import isAuthUser from '../../utils/isAuthUser'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice'
import axios from 'axios'
import EmpProfileCreation from '../../pages/Employer/profile/EmpProfileCreation'

function EmployerWrapper() {
  const navigate=useNavigate()
  const baseURL='http://127.0.0.1:8000'
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
          console.log("inside userwrapper data.........from backend",responce)
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
        console.log(error)
      }
    }
    else{
      navigate('/employer/')
    }
  };


  useEffect(() => {
    if(!authentication_user.name)
    {
     
      checkAuth();
    
    }
  
  }, [authentication_user])
console.log("inside employer wrapper.................",authentication_user)
  return (
    <div>
      <EmployerHeader/>
      <Routes>
        <Route path='/' element={<EmpLogin/>}> </Route>
        <Route path='/signup' element={<EmpSignup/>}></Route>
        <Route path='/forgot' element={<ForgetPassword/>}></Route>
        <Route path='/otp' element={<Otp/>} ></Route>
        <Route path='/home' element={<EmpHome/>}></Route>
        <Route path='/profile_creation' element={<EmpProfileCreation/>} ></Route>
      </Routes>
      
    </div>
  )
}

export default EmployerWrapper
