import React from 'react'
import Chat from './Chat'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const LeftPanel = ({ispop6,setIspop6,friends,handleClick,online,chats,handleDis,krig,rec}) => {
    const [trig,setTrig]=useState(true)
    const [filChat,setFilChat]=useState([])
    const [search,setSearch]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        setTrig(!trig)
        console.log('hi')
        console.log(chats)
    },[chats])
    useEffect(()=>{
        setTrig(!trig)
    },[friends,krig])
    useEffect(()=>{
        if(search.length){
            let arr=chats.filter((item)=>item.name.includes(search))
            setFilChat(arr)
            setTrig(!trig)
        }
    },[search])
  return (
    <div className='w-96 overflow-y-auto overflow-x-hidden h-auto bottom-0 m-1 bg-gray-100 flex flex-col'>
        <div className='text-2xl h-12 items-center flex flex-row px-4 font-semibold bg-teal-300 '> Chats <button onClick={()=>{setIspop6(true)}} className='justify-center ml-auto mr-0 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-16 bg-red-300 h-9 '>Add</button><button onClick={()=>{localStorage.removeItem('token');handleDis();navigate('/')}} className='justify-center ml-4 mr-2 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Logout</button></div>
        <input value={search} placeholder='Search...' onChange={(e)=>{setSearch(e.target.value)}} className='w-72 h-10 rounded-2xl px-2 mx-2 my-2'/>
        {search&&filChat&&<ul className='my-2 mx-1'>
            {filChat.map((item)=>(<li className='my-2 rounded-lg'><Chat name={item.name}
            rec={rec}
            online={online}
            chat={item.last}
            handleClick={handleClick}/></li>))
            }
        </ul>}
        {!search&&<ul className='my-2 mx-1'>
            {chats.map((item)=>(<li className='my-2 rounded-lg'><Chat name={item.name}
            rec={rec}
            online={online}
            chat={item.last}
            handleClick={handleClick}/></li>))
            }
        </ul>}
        
      
    </div>
  )
}

export default LeftPanel
