import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");
  const passref= useRef();

  const GeneratePassword=useCallback(()=>{
   let pass=""
   let str="ABCDEFIJKLMNOPQRSTUVWXYZabcdefijklmnopqrstuvwxyz"

   if(numberAllowed){
    str+="0123456789"
   }
   if(charAllowed){
    str+="~!@#$%^&*(){}[]"
   }
   
   for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
  }

   setPassword(pass)

  },[length, numberAllowed, charAllowed])

  useEffect(()=>{
   GeneratePassword();
  },[length, charAllowed, numberAllowed])

  const CopyText = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password);
  })

  return (
   <div className="text-white">
    <h1 className="text-4xl flex justify-center my-9">Password Generator</h1>
    <div className="bg-slate-800 w-2/3 h-36 mx-auto my-12 rounded-lg">
    <div className="flex p-6">
    <input type="text" placeholder="Password" className="w-full h-9 rounded-md py-1 px-3 outline-none text-orange-500" value={password} readOnly ref={passref} />
    <button className="bg-blue-700 w-28 h-9 rounded-md py-1 px-3 text-lg cursor-pointer hover:bg-blue-800" onClick={CopyText}>Copy</button>
    </div>
    <div className="flex justify-between p-2 text-lg text-orange-500 gap-">
      <div className="flex items-center gap-2">
      <input type="range" min={7} max={100} onChange={(e) => {setLength(e.target.value)}}/>
      <label>Length: ({length})</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" onChange={() => {
              setNumberAllowed((prev) => !prev);
          }} />
        <label>:Numbers</label>
      </div>
      <div className="flex items-center gap-2">
      <input type="checkbox" className="text-blue-600" onChange={() => {
              setCharAllowed((prev) => !prev);
          }} />
      <label>:Characters</label>
      </div>
    </div>
    </div>
   </div>
  )
}

export default App
