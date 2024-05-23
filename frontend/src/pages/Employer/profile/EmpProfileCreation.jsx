import React,{useState} from 'react'
import logo from '../../../assets/logo.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from '../../../Redux/UserDetails/userBasicDetailsSlice';


function EmpProfileCreation() {
    const baseURL='http://127.0.0.1:8000/'
    const token = localStorage.getItem('access'); 
    const authentication_user = useSelector(state => state.authentication_user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [profile_pic, setProfilepic] = useState({
        image: null
      });
    const [data,setData]=useState({
        'phone':"",
        'website_link':'',
        'headquarters':'',
        'industry':'',
        'hr_name':'',
        'hr_phone':'',
        'hr_email':'',
        'address':'',
        'about':'',
    })

    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleImageChange = (e) => {
        setProfilepic({ image: e.target.files[0] });
      };
    console.log(data)
    console.log(profile_pic)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("email",authentication_user.email),
        formData.append("phone",data.phone || "")
        formData.append("website_link",data.website_link || "")
        formData.append("headquarters",data.headquarters || "")
        formData.append("industry",data.industry || "")
        formData.append("hr_name",data.hr_name || "")
        formData.append("hr_phone",data.hr_phone || "")
        formData.append("hr_email",data.hr_email || "")
        formData.append("address",data.address || "")
        formData.append("about",data.about || "")
        if (profile_pic.image) {
            formData.append("profile_pic", profile_pic.image, profile_pic.image.name);
          }
        try{
            const response = await axios.post(baseURL+'api/account/user/emp_profile_creation/',formData,{
                headers:{

                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })

            console.log(response)
            if(response.status==200){
                dispatch(
                  set_user_basic_details({
                    profile_pic : response.data.data.profile_pic
                  })
                )
                navigate('/employer/home/')
              }
            }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>
      
      <div className='flex w-full  bg-blue-50'>
        <div className='hidden md:inline md:w-2/5 '>
          <div className=' mt-16 mx-4  md:w-full'>
            <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Complete Company Profile</h3>
            <p className='text-blue-500 font-semibold'>Unlock 500+ jobs from top companies and receive direct calls <br /> from HRs</p>
            <p className='text-blue-500 font-semibold'></p>
          </div>
          <div className='mt-16 mx-4  md:w-full'>
            <ul>
             
            </ul>
          </div>
        </div>
        <div className='w-full  md:w-3/5 flex justify-end'>
          <div className='bg-white w-full h-full md:rounded-l-lg shadow-2xl'>
            <div className='h-full pb-5 pt-14'>
              <div>
                <p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>About Company</p>
                <div className="mt-4 ">
                  <form method='POST'onSubmit={handleSubmit}> 
                      <div className='mx-20 w-4/5 '>
                        <div className='flex justify-center'>
                          <input type="text" placeholder='Company Name' value={authentication_user.name}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            readOnly
                          />
                          <input type="text" placeholder='Mobile Number' name="phone"  onChange={handleChange}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex'>
                          <input type="text" placeholder='Email' value={authentication_user.email}
                            className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            readOnly
                          />
                          <input type="text" placeholder='Company Website' name="website_link" onChange={handleChange}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex justify-center'>
                          <input type="text" placeholder='Headquaters' name='headquarters' value={data.headquarters} onChange={handleChange}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                        
                          />
                          <input type="text" placeholder='Industry Type' name="industry" value={data.industry} onChange={handleChange}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex justify-center'>
                          <textarea 
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                            id="about" name="about" rows="4" cols="50" 
                            placeholder='About the company' value={data.about} onChange={handleChange} />
                        </div>
                        <div className='flex justify-center'>
                          <input type="text" placeholder='HR Name' name='hr_name' value={data.hr_name} onChange={handleChange}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                        
                          />
                          <input type="text" placeholder='HR Mobile Number' name="hr_phone" value={data.hr_phone} onChange={handleChange}
                            className="flex items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex justify-center'>
                          <input type="Email" placeholder='HR Email' name='hr_email' value={data.hr_email} onChange={handleChange}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                        <div className='flex justify-center'>
                          <input type="text" placeholder='Address' name='address' value={data.address} onChange={handleChange}
                            className="w-full mb-5 mx-2 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>          
                        <div className='px-2'>
                          <label htmlFor="profile_pic" className='text-gray-500 ml-2'>Profile Image</label>
                          <input type="file" name="profile_pic" onChange={handleImageChange}
                            className="flex items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                          />
                        </div>
                      </div>
                        <div className='flex justify-end mr-12'>
                            <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                            Submit
                            </button>
                        
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

export default EmpProfileCreation
