import React from 'react';
import signup_img from '../../assets/signup.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema, initialValues } from '../../validation/SignupValidation';

function EmpSignup({setIsSpinner}) {
    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000/';

    const handleOnSubmit = async (values, { setSubmitting }) => {
        console.log("inside handle on submit", values);
        const formData = new FormData();
        formData.append("full_name", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        setIsSpinner(true)
        try {
            const response = await axios.post(baseURL + 'api/account/emp_register/', formData);
            if (response.status === 200) {
                toast.success('Registered successfull!',{
                    position: "top-center",
                  });
                setIsSpinner(false)
                localStorage.setItem('email', values.email);
                navigate('/otp');
            }
            else{
                toast.error('something went wrong try again later!',{
                    position: "top-center",
                  });
                setIsSpinner(false)
                navigate('/login')
            }
        } catch (error) {
            console.error("There was an error!", error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        // <div className='flex w-full h-screen bg-blue-50'>
        //     <div className='hidden md:inline md:w-2/5'>
        //         <div className='mt-16 mx-4 md:w-full'>
        //             <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Sign Up to post JOBS</h3>
        //             <p className='text-blue-500 font-semibold'>5 lakh+ candidates</p>
        //         </div>
        //         <div className='flex justify-center'>
        //             <img src={signup_img} alt="" className='w-96' />
        //         </div>
        //     </div>
        //     <div className='w-full h-screen md:w-3/5 flex justify-end'>
        //         <div className='bg-white w-full h-full md:rounded-l-lg shadow-2xl'>
        //             <div className='flex h-full'>
        //                 <div className="flex items-center justify-center w-full">
        //                     <div className="flex items-center">
        //                         <Formik
        //                             initialValues={initialValues}
        //                             validationSchema={SignupSchema}
        //                             onSubmit={handleOnSubmit}
        //                         >
        //                             {({ errors, touched, isSubmitting }) => (
        //                                 <Form className="flex flex-col w-full h-full pb-6 text-center">
        //                                     <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
        //                                     <p className="mb-4 text-grey-700">Enter your Details</p>

        //                                     <div className="flex items-center mb-3">
        //                                         <hr className="h-0 border-b border-solid border-grey-500 grow" />
        //                                     </div>

        //                                     <Field
        //                                         name="username"
        //                                         type="text"
        //                                         placeholder="Enter Company Name"
        //                                         className={`flex items-center w-full px-4 py-3 mr-2 ${errors.username && touched.username ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
        //                                     />
        //                                     <ErrorMessage name='username' component="div" className='text-red-500 text-sm mb-2' />

        //                                     <Field
        //                                         name="email"
        //                                         type="email"
        //                                         placeholder="example@gmail.com"
        //                                         className={`flex items-center w-full px-4 py-3 mr-2 ${errors.email && touched.email ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
        //                                     />
        //                                     <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />

        //                                     <Field
        //                                         name="password"
        //                                         type="password"
        //                                         placeholder="Enter a password"
        //                                         className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
        //                                     />
        //                                     <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

        //                                     <Field
        //                                         name="confirm_password"
        //                                         type="password"
        //                                         placeholder="Confirm Password"
        //                                         className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
        //                                     />
        //                                     <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />

        //                                     <button
        //                                         type="submit"
        //                                         disabled={isSubmitting}
        //                                         className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
        //                                     >
        //                                         Send Otp
        //                                     </button>
        //                                     <p className="text-sm leading-relaxed text-grey-900">
        //                                         Already have an account? <Link to={'/employer/'}><span className="font-bold text-grey-700 cursor-pointer">Sign in</span></Link>
        //                                     </p>
        //                                 </Form>
        //                             )}
        //                         </Formik>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
            <div className='flex h-full'>
                        <div className="flex items-center justify-center w-full">
                            <div className="flex items-center">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={SignupSchema}
                                    onSubmit={handleOnSubmit}
                                >
                                    {({ errors, touched, isSubmitting }) => (
                                        <Form className="flex flex-col w-full h-full pb-6 text-center">
                                            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Employer Sign Up</h3>
                                            <div className="flex items-center mb-3">
                                                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                            </div>

                                            <Field
                                                name="username"
                                                type="text"
                                                placeholder="Enter Company Name"
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
                                                placeholder="Enter your password"
                                                className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                            />
                                            <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

                                            <Field
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm Password"
                                                className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                            />
                                            <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-4 py-3 mb-1 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                                            >
                                                Send Otp
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                </div>
    );
}

export default EmpSignup;

