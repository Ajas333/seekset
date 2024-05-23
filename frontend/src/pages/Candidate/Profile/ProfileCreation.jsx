import React, { useState,useEffect } from 'react';
import logo from '../../../assets/logo.png';
import { CiCircleRemove } from "react-icons/ci";
import { FcCheckmark } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from '../../../Redux/UserDetails/userBasicDetailsSlice';




function ProfileCreation() {


  const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access'); 
  const authentication_user = useSelector(state => state.authentication_user);
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [profile_pic, setProfilepic] = useState({
    image: null
  });
  const [resume, setResume] = useState({
    resume: null
  });
  const [data, setData] = useState({
    'phone': "",
    'dob': "",
    'gender': "",
    'specilization': "",
    'education': "",
    'completed': "",
    'mark': "",
    'college': "",
    'linkedin': "",
    'github': "",

  });

  const stepDown = () => setStep(step - 1);
  const stepUp = () => setStep(step + 1);

  const handleSkill = (e) => setSkill(e.target.value);

  const handleAddSkill = () => {
    if (skill.trim() !== '') {
      setSkills([...skills, skill.trim()]);
      setSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    setProfilepic({ image: e.target.files[0] });
  };

  const handleResumeChange = (e) => {
    setResume({ resume: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit =async(e) =>{
    e.preventDefault()
    
    const skill=skills.toString()
    
    const formData=new FormData();
    formData.append("email",authentication_user.email)
    formData.append("phone", data.phone || "");
    formData.append("dob", data.dob || "");
    formData.append("Gender", data.gender || "");
    if (profile_pic.image) {
      formData.append("profile_pic", profile_pic.image, profile_pic.image.name);
    }
    formData.append("education", data.education || "");
    formData.append("specilization", data.specilization || "");
    formData.append("college", data.college || "");
    formData.append("completed", data.completed || "");
    formData.append("mark", data.mark || "");
    formData.append("skills",skill);
    formData.append("linkedin", data.linkedin || "");
    formData.append("github", data.github || "");
    if (resume.resume) {
      formData.append("resume", resume.resume, resume.resume.name);
    }
    console.log("form data................",formData)
    try{
        const responce=await axios.post(baseURL+'api/account/user/profile_creation/',formData,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          })
        console.log("response...........................",responce)
        if(responce.status==200){
          dispatch(
            set_user_basic_details({
              profile_pic : responce.data.data.profile_pic
            })
          )
          navigate('/candidate/home/')
        }
    }
    catch(error){
        console.log("error",error)
    }

  }



  console.log(data);
  console.log(profile_pic);
  console.log(resume);
  console.log(token)
  useEffect(() => {
    return () => {
        console.log("drftgyhujikotyhuji",authentication_user)
    };
  }, [])
  return (
    <div>
      <div className='absolute m-2'>
        <img src={logo} alt="" className='w-12 h-10' />
      </div>
      <div className='flex w-full h-screen bg-blue-50'>
        <div className='hidden md:inline md:w-2/5 '>
          <div className='mt-16 mx-4  md:w-full'>
            <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Complete Your Profile</h3>
            <p className='text-blue-500 font-semibold'>Unlock 500+ jobs from top companies and receive direct calls <br /> from HRs</p>
            <p className='text-blue-500 font-semibold'>{authentication_user.name}</p>
          </div>
          <div className='mt-16 mx-4  md:w-full'>
            <ul>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Take 3 Steps</span></li>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Direct call from HR</span></li>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Connect with Top Companies</span></li>
            </ul>
          </div>
        </div>
        <div className='w-full h-screen md:w-3/5 flex justify-end'>
          <div className='bg-white w-full h-full md:rounded-l-lg shadow-2xl'>
            <div className='h-full '>
              {/* numbers */}
              <div className='flex mt-16 md:mt-8 h-12 w-full justify-center'>
                <div>
                  <div className={`flex justify-center rounded-full ${step > 1 ? 'border-4' : 'border-2'} ${step > 1 ? 'border-green-500' : 'border-gray-900'} border-solid w-12 h-12`}>
                    {step > 1 ? (<FcCheckmark className='mt-2 h-6 w-8' />) : (<span className='mt-2'>1</span>)}
                  </div>
                </div>
                <div className='mt-5 w-28 '>
                  <hr className={`h-0 border-b-2 border-solid ${step > 1 ? 'border-green-500' : 'border-gray-700'}`} />
                </div>
                <div>
                  <div className={`flex justify-center rounded-full ${step > 2 ? 'border-4' : 'border-2'} ${step > 2 ? 'border-green-500' : 'border-gray-900'} border-solid w-12 h-12`}>
                    {step > 2 ? (<FcCheckmark className='mt-2 h-6 w-8' />) : (<span className='mt-2'>2</span>)}
                  </div>
                </div>
                <div className='mt-5 w-28 '>
                  <hr className={`h-0 border-b-2 border-solid ${step > 2 ? 'border-green-500' : 'border-gray-900'} `} />
                </div>
                <div>
                  <div className='flex justify-center rounded-full border-2 border-gray-900 border-solid w-12 h-12'>
                    <span className='mt-2'>3</span>
                  </div>
                </div>
              </div>
              {/* about me content */}
              <div>
                {step === 1 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>About me</p>)}
                {step === 2 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>Education</p>)}
                {step === 3 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>Skills</p>)}

                <div className="mt-4 ">
                  <form method='POST' onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className='aboutme mx-20 w-4/5 '>
                        <div className='flex justify-center'>
                          <input type="text" placeholder='Username' value={authentication_user.name}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            readOnly
                          />
                          <input type="text" placeholder='Mobile Number' name="phone" onChange={handleChange} value={data.phone}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex'>
                          <input type="text" placeholder='Email' value={authentication_user.email}
                            className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            readOnly
                          />
                        </div>
                        <div className='flex justify-center'>
                          <input type="date" placeholder='Date Of Birth' name="dob" onChange={handleChange} value={data.dob}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                          <select name="gender" onChange={handleChange} value={data.gender}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                        <div className='px-2'>
                          <label htmlFor="profile_pic" className='text-gray-500 ml-2'>Profile Image</label>
                          <input type="file" name="profile_pic" onChange={handleImageChange}
                            className="flex items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className='education mx-20 w-4/5 '>
                        <p className='text-sm font-medium text-gray-400 mb-3'>Highest Education</p>
                        <div className='flex justify-center'>
                          <select name="education" onChange={handleChange} value={data.education}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          >
                            <option value="">Select</option>
                            <option value="10th">10th</option>
                            <option value="higher_secondary">Higher Secondary</option>
                            <option value="graduation">Graduation</option>
                            <option value="post_graduation">Post Graduation</option>
                            <option value="iti">ITI</option>
                            <option value="diploma">Diploma</option>
                          </select>
                          <input type="text" placeholder='Specialization' name="specilization" onChange={handleChange} value={data.specilization}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex'>
                          <input type="text" placeholder='School/College' name="college" onChange={handleChange} value={data.college}
                            className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex justify-center'>
                          <input type="date" placeholder='Completed On' name="completed" onChange={handleChange} value={data.completed}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                          <input type="text" placeholder='Mark in CGPA' name="mark" onChange={handleChange} value={data.mark}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <>
                        <div className='skills mx-20 w-4/5 '>
                          <div className='flex'>
                            <input type="text" placeholder='Add Skill' name="skills"
                              value={skill}
                              className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                              onChange={handleSkill}
                            />
                            <div onClick={handleAddSkill} className="h-8 cursor-pointer bg-blue-700 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                              Add
                            </div>
                          </div>
                          <div className='mx-24 skills-list mt-5 flex flex-wrap'>
                            {skills.map((skill, index) => (
                              <div key={index} className='mr-2 mb-2 px-2 pb-1 skill-item bg-green-200 rounded-md flex'>
                                <span className="text-sm font-medium text-gray-600">{skill}</span>
                                <span className='mt-1 ml-1 cursor-pointer' onClick={() => handleRemoveSkill(index)}><CiCircleRemove /></span>
                              </div>
                            ))}
                          </div>
                          <div className='flex'>
                            <input type="text" placeholder='LinkedIn link' name="linkedin" onChange={handleChange} value={data.linkedin}
                              className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            />
                          </div>
                          <div className='flex'>
                            <input type="text" placeholder='Github link' name="github" onChange={handleChange} value={data.github}
                              className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            />
                          </div>
                          <div className='px-2'>
                            <label htmlFor="resume" className='text-gray-500 ml-2'>Resume</label>
                            <input type="file" name="resume" onChange={handleResumeChange}
                              className="flex items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className='flex justify-end mr-12'>
                      {step > 1 && (
                        <div onClick={stepDown} className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold px-2 rounded mr-2">
                          Prev
                        </div>
                      )}
                      {step < 3 && (
                        <div onClick={stepUp} className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold px-2 rounded">
                          Next
                        </div>
                      )}
                      {step === 3 && (
                        <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                          Submit
                        </button>
                      )}
                    </div>
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

export default ProfileCreation;
