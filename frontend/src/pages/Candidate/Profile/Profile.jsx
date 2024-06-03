import React,{useState} from "react";
import default_img from "../../../assets/default.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdDateRange } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "../../../components/candidate/utilities/Modal";

function Profile() {

  
  const toggleModal= ()=>{

  }
  return (
    <div className="pt-12">
      <div className="flex justify-center">
        <div className="w-3/5 pt-7">
          <div className="flex bg-gray-50 gap-1 py-4 px-2 rounded-md relative">
            <div className="absolute top-0 right-0 px-2 py-1 ">
              <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={toggleModal} />
            </div>
            <div className="py-5">
              <img
                src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                class="w-32 rounded-full"
                alt="Avatar"
              />
            </div>
            <div className=" w-full px-3 py-2">
              <div className="mb-4">
                <span className="text-gray-600 font-bold text-2xl">
                  Ajas K M
                </span>
              </div>

              <div className=" flex justify-between">
                <div className="">
                  <div className=" ">
                    <div className="flex items-center mb-5 gap-1">
                      <IoLocationOutline className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600 font-semibold">Kochi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RxAvatar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 font-semibold">Male</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className=" ">
                    <div className="flex items-center mb-5 gap-1">
                      <MdOutlineMail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 font-semibold">
                        ajaskm@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdDateRange className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 font-semibold">
                        10\5\2024
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" ">
                    <div className="flex items-center mb-5 gap-1">
                      <FaPhone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600 font-semibold">
                        7994119979
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div>
        <Modal/>
       </div>
      </div>
    </div>
  );
}

export default Profile;
