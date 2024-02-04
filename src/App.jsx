import { useState , useCallback ,useEffect , useRef} from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numberAllower,setNumberAllower]=useState(false); //numbers checkbox
  const [charAllowed,setCharAllowed]=useState(false);   // character checkbox
  const [password,setPassword]=useState('');  //password data displayed in input box



  const passwordRef=useRef(null);

  
  const ChangeValue=(e)=>{
    setLength(e.target.value);
  }


  const generatePass = useCallback(() => {
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "!@#$%^&*()_+";
    if(!numberAllower && !charAllowed) {
      for(let i=1; i<length; i++){
        const charIndex=Math.floor(Math.random()*str.length+1);  
        pass+=str.charAt(charIndex);
      }
    }
    else if(numberAllower && !charAllowed) {
      for(let i=1; i<length; i++) {
        const chance = Math.floor(Math.random()*9+1)
        if(chance < 4) {
          pass+=num.charAt(Math.floor(Math.random()*num.length+1))
        }
        else {
          pass+=str.charAt(Math.floor(Math.random()*str.length+1))
        }
      }
    }
    else if(charAllowed && !numberAllower) {
      for(let i=1; i<length; i++) {
        const chance = Math.floor(Math.random()*9+1)
        if(chance < 4) {
          pass+=char.charAt(Math.floor(Math.random()*char.length+1))
        }
        else {
          pass+=str.charAt(Math.floor(Math.random()*str.length+1))
        }
      }
    }
    else {
      for(let i=1; i<length; i++) {
        const chance = Math.floor(Math.random()*9+1)
        if(chance < 2) {
          pass+=num.charAt(Math.floor(Math.random()*num.length+1))
        }
        else if(chance > 2 && chance < 5) {
          pass+=char.charAt(Math.floor(Math.random()*char.length+1))
        }
        else {
          pass+=str.charAt(Math.floor(Math.random()*str.length+1))
        }
      }
    }
setPassword(pass);
  }, [length, numberAllower, charAllowed]);

/*
  const generatePassword=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllower) str+="0123456789";
    
    if(charAllowed) str+="!@#$%^&*()_+";  
    
    for(let i=1; i<length; i++){
      const charIndex=Math.floor(Math.random()*str.length+1);   // if i dont want number from 0 to ultimate number so we are adding +1 , it starts from  1 to 255
      pass+=str.charAt(charIndex);

    }
    setPassword(pass)

  },[length,numberAllower,charAllowed]); // so as long as these dependencies dont change


*/

  useEffect(()=>{
    generatePass();
  }, [length, numberAllower, charAllowed]);
  


  // copy the text
  const copyPasswordtoClickboard=()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    // passwordRef.current?.setSelectRange(0,4);
  }


  // to generate new Password
  const NewPassword=()=>{
    generatePass();

  }


   const Reset=()=>{
     setLength(8);
     document.getElementById("numberAllowerCheckbox").checked = false; //deselects the checkbox
     document.getElementById("charAllowerCheckbox").checked = false;
     setNumberAllower('');
     setCharAllowed('');
     setPassword('');

   }

  



  
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-400">

      <h1 className="text-3xl font-bold mb-2 text-center"> Password Generate</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">

        <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordtoClickboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" name="" min={6} max={100} value={length} onChange={ChangeValue} className="cursor-pointer" ></input>
            <label htmlFor="length">Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id="numberAllowerCheckbox" defaultValue={numberAllower} onChange={()=>{setNumberAllower((prev)=>!prev)}} />
            <label htmlFor="number">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id="charAllowerCheckbox" defaultValue={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor="charInput">Character</label>
          </div>

        </div>

        
      </div>
      <div className="flex items-center justify-start mb-2">

          <button onClick={NewPassword} className="outline-none bg-green-800 text-white px-3 m-2 py-0.5 shrink-0">New</button>
           <button onClick={Reset} className="outline-none bg-red-800 text-white px-3 m-2 py-0.5 shrink-0">Reset</button> 
          
      </div>

    </div>
      
    </>
  );
}

export default App
