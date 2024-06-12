  import React, { useRef, useState,useEffect } from 'react'
  // import { IoMdClose } from "react-icons/io";
  // import { w3cwebsocket as W3CWebSocket } from "websocket";
  // import axios from 'axios';
  import { IoSend } from "react-icons/io5";

  function ChatModal({setChat,profile_pic,userName,emp_name,chatMessages,client}) {

      const  modalRef = useRef();
      const baseURL='http://127.0.0.1:8000/'
     
      const [message, setMessage] = useState("");
      const closeModal =(e)=>{
        if(modalRef.current === e.target){
          setChat();
          }
        }
       

        const sendMessage = () =>{
          if (!client || client.readyState !== client.OPEN) {
              console.error("WebSocket is not open");
              return;
            }
            const sendername = emp_name
            console.log("SENDER NAME:", sendername);
            const messageData = { message, sendername };
            const messageString = JSON.stringify(messageData);
            console.log("Sending Message:", messageString);
            client.send(messageString);
            setMessage("");

        }
        console.log("chat messages.................",chatMessages)
    return (
      <div ref={modalRef} onClick={closeModal} className="fixed inset-0   flex justify-end items-end z-50">
          <div className='bg-blue-100 w-96 h-96 rounded-md mr-5 relative'>
                  <div className='bg-blue-300  w-full flex px-4 gap-2 py-2'>
                    <div className='h-8 w-8 e'>
                        <img src={profile_pic} alt="user" className="h-full w-full object-cover text-gray-700" />
                    </div>
                    <p className='text-gray-700 font-bold'>{userName}</p>
                  </div>
                  <div className='chat-area flex-grow overflow-auto p-2 max-h-64'>
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message bg-white p-2 my-1 rounded-lg max-w-72 shadow">
                            <strong>{msg.sendername}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
                  <div className=' absolute bottom-3 left-0 right-0 flex'>
                  <div className='w-full flex items-center rounded-lg bg-white shadow-sm'>
                      <textarea
                          placeholder="Type your message..."
                          name="message"
                          id="message"
                          rows={1}
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          className="flex-grow resize-none rounded-lg border-none p-4 focus:outline-none"
                      />
                      <button className='px-3 text-blue-700 focus:outline-none' onClick={sendMessage}>
                          <IoSend size={25} />
                      </button>
                  </div>
                      
                  </div>
          </div>
    </div>
    )
  }

  export default ChatModal