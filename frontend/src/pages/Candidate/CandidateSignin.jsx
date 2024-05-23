import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import job_hunt from '../../assets/job_hunt.svg'
import axios from 'axios'
import Swal from 'sweetalert2'

function CandidateSignin() {
    
    const [formError,setFormError]=useState();
    
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        conform_password:""
    });
    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000/';

    const handleOnChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    };
    console.log(values)

    const handleOnSubmit= async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("full_name",event.target.username.value);
        formData.append("email",event.target.email.value);
        formData.append("password",event.target.password.value);
        console.log("form data ...",formData)
        try{
            const response = await axios.post(baseURL+'api/account/cand_register/',formData)
            console.log("response...",response)
            localStorage.setItem('email',event.target.email.value)
            if (response.status ==200){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Otp send ",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/candidate/otp/')
            }
        }
        catch{

        }
    };

  return (
    <div>
      <div>
        <div className='absolute m-2'>
          <img src={logo} alt="" className='w-12 h-10' />
        </div>
        <div className='flex w-full h-screen bg-blue-50'>
          <div className='hidden md:inline md:w-2/5 '>
                <div className='mt-16 mx-4  md:w-full'>
                    <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Sign Up to get Your Dreem Job</h3>
                    <p className='text-blue-500 font-semibold'>5 lakh+ jobs for you to explore</p>
                </div>
                <div className='flex justify-center'>
                  <img src={job_hunt} alt="" className='w-96' />
                </div>
          </div>
          <div className= 'w-full h-screen md:w-3/5 flex justify-end '>
            <div className='bg-white w-full h-full  md:rounded-l-lg shadow-2xl '>
                  <div className='flex h-full'>  
                      <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center ">
                          
                           <form onSubmit={handleOnSubmit} method='POST' className="flex flex-col w-full h-full pb-6 text-center">
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>                             
                                <p className="mb-4 text-grey-700">Enter your Details</p>
                                
                                <div className="flex items-center mb-3">
                                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>

                                <input
                                name="username"
                                type="username"
                                placeholder="Enter Your Name"
                                // errorMessage="Username must begin with a capital letter and be between 4 and 15 characters long"
                                // pattern="^[A-Z][a-zA-Z]{3,15}$" 
                                required 
                                onChange={handleOnChange}
                                className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                            
                                <input
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                // errorMessage="Invalid email format. Please enter a valid email address"
                                required
                                onChange={handleOnChange}
                                className="flex items-center w-full px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                                <input
                                name="password"
                                type="password"
                                placeholder="Enter a password"
                                //   errorMessage="Password must be between 8 and 20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                //   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$"
                                required
                                onChange={handleOnChange}
                                className="flex items-center w-full px-4 py-3 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />

                                <input
                                name="conform_password"
                                type="password"
                                placeholder="Conform Password"
                                // errorMessage="Password confirmation doesn't match"
                                //   pattern= values.password
                                required
                                onChange={handleOnChange}
                                className="flex items-center w-full px-4 py-3 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                                
                                <button className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                Send Otp
                                </button>
                                <p className="text-sm leading-relaxed text-grey-900">
                                Already have accouunt? <Link to={'/candidate/'}><span  className="font-bold text-grey-700 cursor-pointer">Sign in</span></Link>
                                </p>
                          </form>
                            
                        </div>
                      </div>
                  </div>
            </div>
          </div>
          
        </div>
    </div>
    </div>
  )
}

export default CandidateSignin
