import React,{useEffect,useState} from 'react'
import login_im from '../../assets/login-im.svg'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';
import { Link ,useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useSelector} from "react-redux";



function EmpLogin() {
  const authentication_user = useSelector((state)=> state.authentication_user);
  const [formError,setFormError] = useState('')
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const baseURL='http://127.0.0.1:8000/'

  const handleLoginSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",e.target.email.value);
    formData.append("password",e.target.password.value);
    console.log("stage two get login data......",formData)

    try{
      const responce = await axios.post(baseURL+'api/account/login/',formData)
      console.log("response......",responce)
      if(responce.status==200){
          if(responce.data.user_type === 'candidate'){
              setFormError('only Employers can login here');
              return
          }
        localStorage.setItem('access',responce.data.access_token)
        localStorage.setItem('refresh',responce.data.refresh_token)
        dispatch(
          set_Authentication({
            name: jwtDecode(responce.data.access_token).name,
            email:responce.data.email,
            isAuthenticated:true,
            isAdmin:responce.data.isAdmin,
            usertype:responce.data.usertype,
          })
        )
          dispatch(
            set_user_basic_details({
              profile_pic : responce.data.user_data.profile_pic
            })
          )
      
        if(responce.data.user_data.completed == false ){
          navigate('/employer/profile_creation/')
        }
        else{
          navigate('/employer/home/')
        }
        }
      }

    catch(error){
      console.log("error")
    }
  } 
  // useEffect(() => {
  //   if(authentication_user.isAuthenticated){
  //       navigate('/employer/home/')
  //   }
  // }, [authentication_user])
  return (
    <div>
       
        <div className='flex w-full h-screen bg-blue-50'>
          <div className='hidden md:inline md:w-2/5 '>
                <div className='mt-16 mx-4  md:w-full'>
                    <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Find Best Candidates</h3>
                    <p className='text-blue-500 font-semibold'>5 lakh+ job Seekers </p>
                </div>
                <div className='flex justify-center'>
                  <img src={login_im} alt="" className='w-96' />
                </div>
          </div>
          <div className= 'w-full h-screen md:w-3/5 flex justify-end '>
            <div className='bg-white w-full h-full  md:rounded-l-lg shadow-2xl '>
                  <div className='flex h-full'>  
                      <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center ">
                          
                            <form className="flex flex-col w-full h-full pb-6 text-center"  onSubmit={handleLoginSubmit} method='POST'>
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>                             
                                <p className="mb-4 text-grey-700">Enter your email and password</p>
                                
                                <div className="flex items-center mb-3">
                                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>
                                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
                                  Email*
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="mail@loopple.com"
                                  className="flex items-center w-full px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
                                  Password*
                                </label>
                                <input
                                  id="password"
                                  type="password"
                                  placeholder="Enter a password"
                                  className="flex items-center w-full px-4 py-3 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                                {formError ?
                                  <div className='flex justify-start mb-5  pl-3 text-red-600 '>

                                    <p >{formError}</p>
                                  </div>
                                  : ""
                                }
                                <div className="flex flex-row justify-end mb-4">
                                  <Link to={'/employer/forgot/'}>
                                  <p  className="mr-4 text-sm font-medium text-purple-blue-500">
                                    Forget password?
                                  </p>
                                  </Link>
                                </div>
                                <button type='submit' className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                  Sign In
                                </button>
                                <p className="text-sm leading-relaxed text-grey-900">
                                  
                                  Not registered yet? <Link to={'/employer/signup/'}><span  className="font-bold text-grey-700 cursor-pointer">Create an Account</span></Link>
                                </p>
                          </form>
                        </div>
                      </div>
                  </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default EmpLogin