import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

function Modal({setShowModal,section,modalData}) {
  const[data,setData] = useState([])
  const[skills,setSkills] = useState([])
  const  modalRef = useRef();
  const closeModal =(e)=>{
    if(modalRef.current === e.target){
      setShowModal(false);
       }
     }
  const handleSave = ()=>{

  }
    useEffect(() => {
      setSkills(Array.isArray(modalData.skills) ? modalData.skills : []);
      
    }, [section==='skills'])

   
   
    
     const renderContent = () => {
      switch (section) {
        case 'personal':
          return (
            <div className=' '>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Personal Info</h1>
              <form className='  w-full '>
                  <div class="mb-2">
                    <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" defaultValue={modalData.user_name}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div class="mb-2">
                    <label for="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" defaultValue={modalData.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div class="mb-2">
                    <label for="place" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Place</label>
                    <input type="text" defaultValue={modalData.place} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div class="mb-2">
                    <label for="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                    <input type="number" defaultValue={modalData.phone} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div class="mb-2">
                    <label for="dob" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                    <input type="date" defaultValue={modalData.dob} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div class="mb-2">
                    <label for="Gender" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select name="Gender" 
                                  
                                    defaultValue={modalData.Gender}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      >
                                      <option value="">Select</option>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="others">Others</option>
                                    </select>
                    </div>
                    <div className='flex justify-center'>
                      <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' onClick={handleSave}>Save</button>
                    </div>
              </form>
            </div>
          );
        case 'education':
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Education Info</h1>
              <form className='  w-full '>
                  <div class="mb-2">
                    <label for="education" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Education</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                <div class="mb-2">
                  <label for="college" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">College</label>
                  <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-2">
                  <label for="specilization" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Specilization</label>
                  <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-2">
                  <label for="mark" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mark in cgpa</label>
                  <input type="number" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-2">
                  <label for="completed" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Completed On</label>
                  <input type="date" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='flex justify-center'>
                      <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' onClick={handleSave}>Save</button>
                    </div>
              </form>
            </div>
          );
        case 'skills':
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Skills</h1>
              <div className='flex gap-2 items-center'>
                <div class="mb-2 basis-5/6">
                  <label for="skills" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Skill</label>
                  <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button className='bg-green-400 rounded-md px-3 py-1.5 mt-4 hover:bg-green-500 cursor-pointer font-bold'>Add</button>
              </div>
              <div className=' w-full grid grid-cols-4 gap-3'>
              {Array.isArray(skills) ? skills.map((skill, index) => (
                <div key={index} className='bg-red-400 text-sm px-2 py-1 rounded-lg flex items-center'>
                  <div >{skill} </div>
                  <div className='cursor-pointer'>
                  <IoMdClose size={17}/>
                  </div>
                </div>
            )) : <p>No skills available</p>}
              </div>
              <form>
                
                    <div className='flex justify-center mt-3'>
                      <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' onClick={handleSave}>Save</button>
                    </div>
              </form>
            </div>
          );
        case 'otherInfo':
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Other Info</h1>
              <form className=' w-full'>
                  <div class="mb-2 basis-5/6">
                    <label for="linkedin"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Linkedin Link</label>
                    <input type="text" defaultValue={modalData.linkedin} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div class="mb-2 basis-5/6">
                    <label for="github"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Linkedin Link</label>
                    <input type="text" defaultValue={modalData.github} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div> 
                  <div class="mb-2 basis-5/6">
                    <label for="resume"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Resume</label>
                    <input type="file" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div> 
                  <div className='flex justify-center mt-3'>
                      <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' onClick={handleSave}>Save</button>
                    </div>
              </form>
            </div>
          );
        // case 'project':
        //   return (
        //     <div>
        //       <h1>Projects</h1>
        //       <form>
        //         <input type="text" placeholder="Project Name" defaultValue={modalData.projectName} />
        //         {/* Add other project fields here */}
        //         <button type="button" onClick={handleSave}>Save</button>
        //       </form>
        //     </div>
        //   );
        default:
          return <div>No section matched</div>;
      }
    };
  
  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
     <div className='mt-10 flex flex-col text-white  w-2/6'>
      <button className='place-self-end' onClick={()=>setShowModal(false)}><IoMdClose size={30}/></button>
      <div className='bg-indigo-200 rounded-xl px-10 py-5  items-center mx-4 '>
        
         {renderContent()}
        
      </div>
     </div>
    </div>
  )
}

export default Modal
