import { useState,useCallback, useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numAllowed,setNum]=useState(false)
  const[charAllowed,setChar]=useState(false)
  const[password,setPassword]=useState("")
  const passwordRef= useRef(null)


  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str+="0123456789";
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`";
    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();f

    window.navigator.clipboard.writeText(password)
  },[password])


useEffect(()=>{
 passwordgenerator()
},[length,numAllowed,charAllowed,passwordgenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-orange-500 text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3 bg-gray-600 my-4 rounded-2xl'
         placeholder='Password'
         readOnly
         ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none  bg-blue-500 text-white px-3 py-0.5 shrink-0 cursor-pointer '>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>length:{length}</label>

        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={numAllowed}
        id='numberinput'
        onChange={()=>{
          setNum((prev)=>!prev)
        }}
        />
        <label htmlFor="numberinput">NUMBER</label>
        </div>
                <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={charAllowed}
        id='charinput'
        onChange={()=>{
          setChar((prev)=>!prev)
        }}
        />
        <label htmlFor="charinput">character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
