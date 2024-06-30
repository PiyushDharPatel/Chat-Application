import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useEffect,useState,useRef } from 'react';
import emoo from './emoo.svg'
import attach from './attach.png'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Buffer } from 'buffer';
const Main = ({name,handleSend,messages,setRec2,typ,handleactive,handleRemove}) => {
    const [inp,setInp]=useState() 
    const [trig,setTrig]=useState(true)
    const messagesEndRef = useRef(null)
    const input1=useRef()
    const boc=useRef()
    const [emoji,setEmoji]=useState(false)
    const [em,setEm]=useState('')
    const [pdfpre,setPdfpre]=useState()
    const [imgData, setImgData] = useState();
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPdfpre(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(()=>{
    setRec2(name)
  },[name])
    useEffect(()=>{
        setTrig(!trig)     
    },[messages])
    useEffect(()=>{
        scrollToBottom()
    })
    useEffect(()=>{
        if(em){
          let ref=input1.current
          ref.focus()

          let start=(inp?inp.substring(0,ref.selectionStart):'')
          let end=(inp?inp.substring(ref.selectionStart):'')
          let text=start+em+end;
          
          
          setInp(text);

          setEm('')
          
        }
    },[em])
  return (
    <div className=' w-full   bg-gray-400 m-1'>
      <h1 className='text-2xl flex flex-row px-20 font-semibold p-1 bg-teal-300'>{name}{typ&&<div className='text-white ml-20 text-md '>typing....</div>}<button onClick={()=>{handleRemove(name)}} className='justify-center ml-auto mr-0 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Remove</button></h1>
      <ul className='flex flex-col h-[77vh] overflow-y-scroll w-full '>{messages.map((message)=>(message.sender===name?(message.type==='text')?
        <li className='bg-white text-wrap w-96 h-auto flex flex-row m-2 p-2 self-start rounded-2xl'>{message.message}<div className=' text-xs ml-auto mr-0'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div></li>:
        <li className='bg-white text-wrap w-96 h-auto flex flex-col m-2 p-2 self-start  rounded-2xl'><div className='self-center'>{(message.type.split('/')[0]==='image')?
        <img src={Buffer.from(message.message)} className='w-64'/>:''}</div><a href={Buffer.from(message.message)} className='text-blue-500' download={message.sender} >Download {message.type.split('/')[1]} File</a><div className=' text-xs ml-auto mr-0'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div></li>:
        (message.type==='text')?<li className='bg-teal-300 flex flex-row text-wrap w-96  h-auto m-2 p-2 self-end rounded-2xl'>{message.message}<div className=' text-xs ml-auto mr-1'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div><div className='text-xs self-end'>{message.read?'Seen':'Sent'}</div></li>:
        <li className='bg-teal-300 flex flex-col text-wrap w-96  h-auto m-2 p-2 self-end rounded-2xl'><div className='self-center'>{(message.type.split('/')[0]==='image')?
        <img src={Buffer.from(message.message)} className='w-64'/>:''}</div><a href={Buffer.from(message.message) } className='text-blue-500' download={message.sender} >Download {message.type.split('/')[1]} File</a><div className=' text-xs ml-auto mr-1'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div><div className='text-xs self-end'>{message.read?'Seen':'Sent'}</div></li>))}<div ref={messagesEndRef} /></ul>
      {pdfpre&&<div ref={boc} className='flex flex-col h-[28vw] w-[40vw] fixed ml-12 bottom-4 py-4 px-8 rounded-lg bg-gray-300'>{pdfpre&&pdfpre.type==='application/pdf'&&<Document ref={boc} file={pdfpre}>
       <div ref={boc} className='h-[16vw] fixed ml-36 mb-10 bottom-28 overflow-hidden'><div> <Page pageNumber={1} width={200} height={300} /></div><label ref={boc}  className='bottom-20 -ml-20 w-40 text-wrap fixed'>{pdfpre.name}</label></div>
      </Document>}
      {pdfpre&&pdfpre.type.split('/')[0]==='image'&&<div ref={boc} className='flex flex-col fixed mb-20  py-4 px-8 rounded-lg bg-gray-300'><img ref={boc} id='prev' src={imgData} className=' w-[28vw] h-[18vw] '/><label ref={boc} for='prev' className=''>{pdfpre.name}</label></div>}
      {pdfpre.type.split('/')[0]!='image'&&pdfpre.type!='application/pdf'&&<div className='mt-10 text-2xl font-semibold'>Preview Not Avaialable </div>}
      <button onClick={()=>{setPdfpre('')}} className='justify-center absolute mt-[24vw] ml-20 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Cancel</button>
      <button onClick={()=>{handleSend(name,imgData,pdfpre.type);setPdfpre('')}} className='justify-center absolute mt-[24vw] ml-80 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Send</button>

      </div>}
      
      <div className='flex justify-center items-center flex-row h-16 bg-teal-400'><label className='cursor-pointer' for='inp'><img src={attach} className='w-5 h-5'/></label><input id='inp' className='w-0 h-0 absolute' type='file' onChange={onChangePicture}/><input type='text' placeholder='Enter Your Text' ref={input1} value={inp} onChange={(e)=>{setInp(e.target.value);handleactive(name);}} className='h-10 px-4 mx-4 w-[55vw] '/><div className='bottom-20 right-12 fixed '><EmojiPicker autoFocusSearch={false} open={emoji} onEmojiClick={(e)=>{setEm(e.emoji)}}/></div><img onClick={()=>{setEmoji(!emoji);if(!emoji){input1.current.focus()}}} className='h-6 cursor-pointer w-6' src={emoo}/><button onClick={()=>{handleSend(name,inp,'text');setInp('')}} className='ml-5 rounded-xl w-16 h-8 bg-teal-300'>Send</button></div>
    </div>
  )
}

export default Main