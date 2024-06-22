import React,{useState} from 'react'
import SideBar from '../../../components/employer/SideBar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Qmodal from '../../../components/employer/utilities/Qmodal'
import Swal from 'sweetalert2'

function PostJob() {
  const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access')
  const [data,setData]=useState({
    'title':"",
    'location':"",
    'jobtype':"",
    'jobmode':"",
    'experiance':"",
    'applyBefore':"",
    'about':"",
    'responsibility':"",
    "saleryfrom":"",
    "saleryto":""
  })
  const [questions, setQuestions] = useState(['']);
  const [modal,setModal] = useState(false)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      cancelButton: "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    },
    buttonsStyling: false
  });

  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  console.log(data)

  const handleSubmitSwal = (e) =>{
    e.preventDefault()
     swalWithBootstrapButtons.fire({
      title: "Any Questions?",
      text: "extra questions for the candidate!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "No Submit!",
      cancelButtonText: "Yes i have!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit()
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire({
        //   title: "Question Added",
        //   icon: "success"
        // });
        setModal(true)
      }
    });
  }

  const handleSubmit = async() =>{
    const lpa= `${data.saleryfrom}-${data.saleryto}`
    console.log(lpa)
    const formData = new FormData()
    formData.append("title",data.title || "")
    formData.append("location",data.location || "")
    formData.append("lpa",lpa || "")
    formData.append("jobtype", data.jobtype || "")
    formData.append("jobmode",data.jobmode || "")
    formData.append("experiance",data.experiance || "")
    formData.append("applyBefore",data.applyBefore || "")
    formData.append("about" , data.about || "")
    formData.append("responsibility",data.responsibility || "")
    questions.forEach((question, index) => {
      if (question.trim() !== "") {
        formData.append(`questions[${index}]`, question);
      }
    });
    try{
      const responce = await axios.post(baseURL+'api/empjob/postjob/',formData,{
        headers:{
  
          'Authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'multipart/form-data'
      }
      })
      if(responce.status == 200){
        swalWithBootstrapButtons.fire({
          title: "Posted!",
          icon: "success"
        });
        setData({
          'title':"",
          'location':"",
          'jobtype':"",
          'jobmode':"",
          'experiance':"",
          'applyBefore':"",
          'about':"",
          'responsibility':"",
          "saleryfrom":"",
          "saleryto":""
        })
        setQuestions(['']);
        setModal(false)
        console.log(data)

      }
    }
    catch(error){
      console.log("error from backend",error)
    }
    
    console.log(responce)
  }
  
  return (
    <div className='pt-14 '>
    <SideBar/>

        <div className='p-4 sm:ml-64'>
      {modal && <Qmodal  setModal={setModal} setQuestions={setQuestions} questions={questions} handleformSubmit={handleSubmit}/>}


                <div>
                  <p>Post job here..</p>
                </div>
                <div className=' w-full flex justify-center'>
                   <div className='bg-purple-50 py-4 rounded-lg'>
                   <form method='POST' onSubmit={handleSubmitSwal}> 
                      <div className='mx-20 w-4/5 '>
                        <div className='flex justify-center gap-2'>
                            
                            <div className="relative w-full min-w-[180px] h-10">
                              <input
                                className="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                placeholder=" " 
                                onChange={handleChange}
                                value={data.title}
                                name='title'/>
                                <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
                                Title
                              </label>
                            </div>

                            <div className="relative w-full min-w-[180px] h-10">
                              <input
                                className="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                placeholder=" "
                                onChange={handleChange}
                                value={data.location}
                                name='location' /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
                                Location
                              </label>
                            </div>
                        </div>
                        <div className='mt-3 pl-'>
                          <span className='text-xs font-medium text-gray-500 '>Salery in lpa</span>
                        </div>
                        <div className='flex justify-center gap-2'>
                            
                            <div className="relative w-full min-w-[180px] h-10">
                              <input
                                onChange={handleChange}
                                value={data.saleryfrom}
                                className="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                placeholder=" " name="saleryfrom" type='number'/><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
                                from
                              </label>
                            </div>

                            <div className="relative w-full min-w-[180px] h-10">
                              <input
                                onChange={handleChange}
                                value={data.saleryto}
                                className="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                placeholder=" " name="saleryto" type='number'/><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
                                to
                              </label>
                            </div>
                        </div>
                        


                        <div className='flex justify-center mt-3 gap-2'>
                          <div className=' w-full'>
                              <label htmlFor="jobtype" className='ml-2 text-xs font-medium text-gray-500'>Job Type</label>
                              <select name="jobtype" 
                                onChange={handleChange}
                                value={data.jobtype}
                                  className="peer w-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                  >
                                  <option value="">Select</option>
                                  <option value="Full Time">Full Time</option>
                                  <option value="Part Time">Part Time</option>
                                </select>
                          </div>
                          <div className=' w-full'> 
                          <label htmlFor="jobmode" className='ml-2 text-xs font-medium text-gray-500'>Job Mode</label>
                            <select name="jobmode" 
                              onChange={handleChange}
                              value={data.jobmode}
                              className="peer w-full   text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                              >
                              <option value="">Select</option>
                              <option value="Remote">Remote</option>
                              <option value="On Site">On Site</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>
                        </div>
                        <div className='flex justify-center mt-3'>
                          <div className='w-full'>
                            <label htmlFor="experiance" className='ml-2 text-xs font-medium text-gray-500'>Experiance</label>
                              <select name="experiance"   
                                onChange={handleChange}    
                                value={data.experiance}                
                                className="peer w-full   text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                              
                              >
                                <option value="">Select</option>
                                <option value="Internship">Internship</option>
                                <option value="Entry Level">Entry Level</option>
                                <option value="Associate">Associate</option>
                                <option value="Mid Level">Mid Level</option>
                                <option value="Senior Level">Senior Level</option>
                            </select>    
                          </div>
                          <div className='w-full'>
                          <label htmlFor="applyBefore" className='ml-2 text-xs font-medium text-gray-500'>Apply Before</label>
                              <input type="date" placeholder='Select Date' name="applyBefore"  
                                  onChange={handleChange}
                                  value={data.applyBefore}
                                  className="peer w-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                                
                              />
                          </div>
                        </div>
                        <div className='flex justify-center'>
                          <textarea 
                            onChange={handleChange}
                            value={data.about}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            id="about" name="about" rows="4" cols="50" 
                            placeholder='About the company'/>
                        </div>
                        <div className='flex justify-center'>
                          <textarea 
                            onChange={handleChange}
                            value={data.responsibility}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            id="about" name="responsibility" rows="4" cols="50" 
                            placeholder='Responsibilitties'/>
                        </div>
                       
                             
                       
                      </div>
                        <div className='flex justify-center mr-12 ml-12'>
                            {/* <button type='button' onClick={()=>setModal(true)} className='bg-green-500 hover:bg-green-400 text-white font-semibold px-2 rounded'>
                              Add Question
                            </button> */}
                            <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                            Submit
                            </button>
                        
                        </div>
                  </form>
                   </div>
                </div>
        </div>
    </div>
  )
}

export default PostJob
