import React from 'react'
import SideBar from '../../../components/employer/SideBar'
  
  
function Message() {
  return (
    <div className=''>
        <div>
            <SideBar/>
        </div>
        <div className='pt-12 ml-64'>
      
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          
            <div className="flex flex-col">
           
                <main className="flex flex-1 flex-col lg:grid lg:grid-cols-[280px_1fr]">
                <div className="border-r bg-gray-100/40 dark:bg-gray-800/40 overflow-auto">
                    <div className="flex h-full flex-col gap-2 px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Chats</h2>
                       <button>new chat</button>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="grid gap-2">
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                            prefetch={false}
                        >
                            <p className="border w-8 h-8">
                            <img src="/placeholder.svg" alt="Image" />
                            <span>JD</span>
                            </p>
                            <div className="flex-1 truncate">
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                Hey, did you see the new job posting?
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">2h</div>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            <p className="border w-8 h-8">
                            <img src="/placeholder.svg" alt="Image" />
                            <span>JS</span>
                            </p>
                            <div className="flex-1 truncate">
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                I'm interested in the marketing role, can we chat?
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">1d</div>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            <p className="border w-8 h-8">
                            <img src="/placeholder.svg" alt="Image" />
                            <span>MJ</span>
                            </p>
                            <div className="flex-1 truncate">
                            <div className="font-medium">Michael Johnson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                I have some questions about the application process.
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">3d</div>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            <p className="border w-8 h-8">
                            <img src="/placeholder.svg" alt="Image" />
                            <span>SA</span>
                            </p>
                            <div className="flex-1 truncate">
                            <div className="font-medium">Sarah Adams</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                Can we schedule a call for the interview?
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">1w</div>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <div className="grid place-items-center h-full">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Welcome to the Job Portal</h1>
                    <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
                    </div>
                </div>
                </main>
            </div>
            </div>

        </div>
    
    </div>
  )
}

export default Message
