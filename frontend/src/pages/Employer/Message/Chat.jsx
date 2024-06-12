import React,{useState} from 'react'
import SideBar from '../../../components/employer/SideBar'
import Message from '../../../components/employer/utilities/Message';

function Chat() {
    const [inputMessage,setInputMessage] = useState('')
    function BriefcaseIcon(props) {
        return (
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>
        );
      }
      
     
      function SendIcon(props) {
        return (
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        );
      }
    const handleChange =(e)=>{
        setInputMessage(e.target.value)
    }
    const handleSendMessage = ()=>{
        console.log(inputMessage)
    }
  return (
    <div className=''>
    <div>
        <SideBar/>
    </div>
    <div className='pt-12 ml-64'>
  
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
         
          <nav className="flex-1 overflow-auto py-2">
            <div className="grid gap-1 px-4 text-sm font-medium">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <div className="h-8 w-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                  
                </div>
                <div className="flex-1 truncate">John Doe</div>
                <p className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  2
                </p>
              </a>
             
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
         
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8">
                <img src="/placeholder.svg" alt="Avatar" />
              
              </div>
              <div>
                <div className="font-medium">Sarah Anderson</div>
              </div>
            </div>
          </div>
         
        </header>
        <main className="flex-1 overflow-auto p-4 ">
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            <Message text="uvuvyvvvvvvuiivv" send/>
            <Message text="ugtdrhjbu" recived/>
           
          </div>
        </main>
        <div className="border-t bg-white px-4 py-2 dark:bg-gray-950">
          <div className="relative">
            <textarea
              placeholder="Type your message..."
              name="message"
              id="message"
              rows={1}
              onChange={handleChange}
              className="min-h-[48px] w-full resize-none rounded-2xl border border-gray-200  bg-white p-3 pr-16 shadow-sm dark:border-gray-800 dark:bg-gray-950"
            />
            <button type="submit" className="absolute top-3 right-3 w-8 h-8" onClick={handleSendMessage}>
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>

</div>
  )
}

export default Chat
