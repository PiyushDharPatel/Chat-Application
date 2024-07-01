import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const Chat = ({name,handleClick,online,chat,rec}) => {
    const [trig,setTrig]=useState(true)
    useEffect(()=>{
        console.log('nah')
        setTrig(!trig)
    },[online])
  return (
    <div onClick={()=>{
      console.log(name+'i')
        handleClick(name)
    }} className={`w-full ${rec===name?'bg-blue-300':'hover:bg-gradient-to-r from-slate-200 to-white bg-white'} transition-all duration-300 ease-in-out rounded-lg flex flex-row items-center px-2 h-16 `}>
    {name}{chat[0]?chat[0].sender===name?<div className='text-nowrap overflow-x-hidden mr-2 ml-3'>{chat[0].type==='text'?chat[0].message:'File'}</div>:<div className='text-nowrap overflow-x-hidden mr-4 ml-2'>you : {chat[0].type==='text'?chat[0].message:'File'}</div>:''}
    {online.includes(name)?<div className='w-2 h-2 mr-0 ml-auto rounded-full bg-green-400'></div>:<div className='w-2 h-2 mr-0 ml-auto rounded-full bg-gray-400'></div>}
    </div>
  )
}

export default Chat
