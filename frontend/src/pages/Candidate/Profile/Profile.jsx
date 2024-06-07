import React,{useState,useEffect} from "react";
import default_img from "../../../assets/default.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdDateRange } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "../../../components/candidate/utilities/Modal";
import { MdDelete } from "react-icons/md";
import axios from "axios";

function Profile() {
  const [showModal,setShowModal] =useState(false)
  const [section,setSection] =useState("")
  const [modalData,setModalData]=useState([])

  const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access')
  const[profileData,setProfileData] = useState([])
  const[eduData,setEduData] = useState([])
  const[skills,setSkills] = useState([])
  const[project,setProject] = useState([])

  


  useEffect(() => {
    const fetchData = async()=>{
        try{
            const response =await axios.get(baseURL+'api/empjob/profile/',{
              headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            })
            console.log("profile data............",response.data)
            if(response.status == 200){
              setProfileData(response.data.data)
              setEduData(response.data.data.education)                            
            }
        }
        catch(error){
          console.log(error)
        }
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (profileData?.skills) {
      const value = profileData.skills.split(',');
      console.log(value)
      setSkills(value);
    } else {
      setSkills([]); 
    }
  }, [profileData])
  
  const toggleModal = (section = "", modalData = []) => {
    setShowModal(true);
    setSection(section);
    setModalData(modalData);
  };

  console.log("sedrftgyhuji",profileData)
  console.log(profileData.resume)
  console.log("852967485",eduData)
  console.log("skilsssssssss",skills)
  return (
    <div className="pt-12 ">
      <div className="flex justify-center">
      <div className="z-50">
       {showModal && <Modal setShowModal={setShowModal} section={section} modalData={modalData}/>}
       </div>
        <div className="w-4/6 py-7">
          {/* personal info */}
          <div className=" bg-gray-50 gap-1 py-1 px-2 rounded-md relative">
            <div>
                <div className="absolute top-0 right-0 px-2 py-2 ">
                  <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("personal", profileData)} />
                </div>
                <div className="font-bold text-xl text-gray-500">
                  Personal Info
                </div>
            </div>
            <div className="flex">
              <div className="py-5 pl-5">
                <img
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  class="w-32 rounded-full"
                  alt="Avatar"
                />
              </div>
                <div className=" w-full px-3 py-2">
                <div className="mb-4">
                  <span className="text-gray-600 font-bold text-2xl">
                    {profileData.user_name}
                  </span>
                </div>

                <div className=" flex flex-row">
                  <div className=" basis-2/6">
                    <div className=" ">
                      <div className="flex items-center mb-5 gap-1">
                        <IoLocationOutline className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 font-semibold">{profileData.place}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <RxAvatar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 font-semibold">{profileData.Gender}</span>
                      </div>
                    </div>
                  </div>
                  <div className="basis-2/6">
                    <div className=" ">
                      <div className="flex items-center mb-5 gap-1">
                        <MdOutlineMail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 font-semibold">
                          {profileData.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdDateRange className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 font-semibold">
                          {profileData.dob}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className=" basis-2/6">
                      <div className="flex items-center mb-5 gap-1">
                        <FaPhone className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 font-semibold">
                          {profileData.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>

          {/* Educational info */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-12 px-2 rounded-md relative">
              <div>
          
                  <div className="absolute bottom-0 right-0 px-2 py-1 ">
                  <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2"
                  onClick={() => toggleModal("education", eduData)}> Add</button>
                  </div>
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Educational Info
                  </div>
              </div>
              {eduData.map((edu)=>(
                <div className="">
                  
                    <div className="flex flex-row gap-3">
                      <div className=" basis-1/6">
                        <p className="text-center font-semibold text-gray-700 ">{edu.education} </p>
                      </div>
                      <div className=" basis-2/6">
                        <p className="text-center font-semibold text-gray-700 " >{edu.specilization}</p>
                      </div>
                      <div className=" basis-2/6">
                        <p className="text-center font-semibold text-gray-700 " >{edu.college}</p>
                      </div>
                      <div className=" basis-1/6">
                          <p className="text-center font-semibold text-gray-700 " >{edu.completed}</p>
                      </div>
                      <div className=" basis-1/6">
                          <p className="text-center font-semibold text-gray-700 " >{edu.mark}</p>
                      </div>
                      <div className=" basis-1/6 justify-center flex">
                          <p className=" font-semibold text-gray-700 cursor-pointer" ><MdDelete/></p>
                      </div>
                    </div>
                    
                </div>  
              ))}
          </div>

          {/* Skills */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-5 px-2 rounded-md relative">
              <div>
                  <div className="absolute top-0 right-0 p-2 ">
                    <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("skills", { skills })}/>
                  </div>
                 
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Skills
                  </div>
              </div>
              <div className="flex flex-row gap-2">
                {skills.map((skill)=>(
                  <div className="bg-indigo-100 rounded-lg py-1.5 px-3">
                      {skill}
                  </div>
                ))}
                
              </div>
                
              
          </div>
          {/* other info */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-5 px-2 rounded-md relative">
              <div>
                  <div className="absolute top-0 right-0 p-2 ">
                    <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("otherInfo", profileData)}  />
                  </div>
                 
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Other Info
                  </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className=" basis-1/6">
                  <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-bold text-gray-700">Linkedin</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">GitHub</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Resume</p>
                        </div>
                  </div>
                        
                </div>
                <div className=" basis-5/6">
                  <div className="flex flex-col gap-3">
                  <div>
                            <p className="font-bold text-blue-700">{profileData.linkedin}</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-700">{profileData.github}</p>
                        </div>
                        <div>
                        <p className='text-base text-blue-700 '><a 
                            href={`${baseURL}${profileData.resume}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View Resume
                        </a></p>
                        </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Projucts */}
          {/* <div className="mt-4 bg-gray-50 gap-1 py-1 pb-5 px-2 rounded-md relative">
              <div>
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Projects
                  </div>
                  <div className="absolute bottom-0 right-0 px-2 py-1 ">
                  <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2"
                    onClick={() => toggleModal("project", null)}>Add</button>
                  </div>
              </div>
              <div>
                <div>
                  {project ? (
                     <>
                      <div className="text-base font-semibold text-gray-800 flex gap-1">
                        <p>SeekSet</p>
                        <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("projects", project)} />
                      </div>
                      <div className="text-base text-gray-800">
                            seekset is a job portal website that build with python Django in backend and react in frontend i finished my figma and started coding..
                            https://www.figma.com/file/ik9IyV4iCrhMOriklNIjFw/Hire?type=design&node-id=0%3A1&mode=design&t=YD5gtkKYACJvPgJK-1
                            api documentation
                            https://documenter.getpostman.com/view/32412583/2sA3BuUncz#bafb5758-e8e5-4843-934a-f5df336198c3
                      </div>
                    </>
                  ):(
                    <div>no projects....</div>
                  ) }
                 
                </div>
              </div>
          </div> */}
        </div>
       
      </div>
    </div>
  );
}

export default Profile;
