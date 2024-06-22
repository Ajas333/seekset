import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import job_hunt from '../../assets/job_hunt.svg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema,initialValues } from '../../validation/SignupValidation'

function CandidateSignin({setIsSpinner}) {
    
    // const [values,setValues]=useState({
    //     username:"",
    //     email:"",
    //     password:"",
    //     conform_password:""
    // });
    const [formError , setFormError] = useState('')
    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000/';

    // const handleOnChange = (e)=>{
    //     setValues({...values,[e.target.name]:e.target.value})
    // };
    // console.log(values)

    const handleOnSubmit= async(values,{setSubmitting})=>{
        console.log("inside handle on submit", values);
        const formData = new FormData();
        formData.append("full_name",values.username);
        formData.append("email",values.email);
        formData.append("password",values.password);
        console.log("form data ...",formData)
        setIsSpinner(true)
        try{
            const response = await axios.post(baseURL+'api/account/cand_register/',formData)
            console.log("response...",response)
            if (response.status ==200){
              toast.success('Registered successfull!',{
                position: "top-center",
              });
                setIsSpinner(false)
                localStorage.setItem('email',values.email)
                navigate('/otp')
            }
            else{
              setFormError(response.data.message)
            }
        }
        catch(error){
          console.log(error)
        }finally{
          setSubmitting(false)
        }
    };

  return (
    <div>
      {/* <div>
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
                          <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleOnSubmit}
                          >
                            {({errors,touched,isSubmitting}) =>(
                              <Form  className="flex flex-col w-full h-full pb-6 text-center">
                                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>                             
                                    <p className="mb-4 text-grey-700">Enter your Details</p>
                                    
                                    <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>

                                    <Field
                                    name="username"
                                    type="username"
                                    placeholder="Enter Your Name" 
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.username && touched.username ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='username' component="div" className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.email && touched.email ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter a password"
                                    className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Conform Password"
                                    className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />
                                    {formError ?
                                    <div className='flex justify-start mb-5  pl-3 text-red-600 '>

                                      <p >{formError}</p>
                                    </div>
                                    : ""
                                  }
                                    <button type='submit' disabled={isSubmitting} className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                    Send Otp
                                    </button>
                                    <p className="text-sm leading-relaxed text-grey-900">
                                    Already have accouunt? <Link to={'/candidate/'}><span  className="font-bold text-grey-700 cursor-pointer">Sign in</span></Link>
                                    </p>
                                </Form>
                            )}
                          </Formik> 
                        </div>
                      </div>
                  </div>
            </div>
          </div>
          
        </div>
      </div> */}
       <div className='flex h-full'>  
                      <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center ">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleOnSubmit}
                          >
                            {({errors,touched,isSubmitting}) =>(
                              <Form  className="flex flex-col w-full h-full pb-6 text-center">
                                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Candidate Sign Up</h3>
                                    <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>

                                    <Field
                                    name="username"
                                    type="username"
                                    placeholder="Enter Your Name" 
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.username && touched.username ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='username' component="div" className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.email && touched.email ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter a password"
                                    className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

                                    <Field
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Conform Password"
                                    className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                    />
                                    <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />
                                    {formError ?
                                    <div className='flex justify-start mb-5  pl-3 text-red-600 '>

                                      <p >{formError}</p>
                                    </div>
                                    : ""
                                  }
                                    <button type='submit' disabled={isSubmitting} className="w-full px-4 py-3 mb-1 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                    Send Otp
                                    </button>
                                    
                                </Form>
                            )}
                          </Formik> 
                        </div>
                      </div>
                  </div>
    </div>
  )
}

export default CandidateSignin
