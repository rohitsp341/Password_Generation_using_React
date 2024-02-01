import { useState , useCallback ,useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [Length,setLength] = useState(8);
  const [NumberAllower,setNumberAllower]=useState(false); //numbers checkbox
  const [CharAllowed,setCharAllowed]=useState(false);   // character checkbox
  const [password,setpassword]=useState('');  //password data displayed in input box



  const passwordRef=useRef(null);

  
  const ChangeValue=(e)=>{
    setLength(e.target.value);
  }



  const generatePassword=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(NumberAllower) str+="0123456789";
    
    if(CharAllowed) str+="!@#$%^&*()_+";  
    
    for(let i=1; i<Length; i++){
      const charIndex=Math.floor(Math.random()*str.length+1);   // if i dont want number from 0 to ultimate number so we are adding +1 , it starts from  1 to 255
      pass+=str.charAt(charIndex);

    }
    setpassword(pass)

  },[Length,NumberAllower,CharAllowed]); // so as long as these dependencies dont change




  useEffect(()=>{
    generatePassword();
  }, [Length, NumberAllower, CharAllowed]);
  


  // copy the text
  const copyPasswordtoClickboard=()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    // passwordRef.current?.setSelectRange(0,4);
  }


  // to generate new Password
  const NewPassword=()=>{
    generatePassword();

  }


  // const Reset=()=>{
  //   setLength(8);
  //   setNumberAllower('');
  //   setCharAllowed('');
  //   setpassword('');

  // }

  



  
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
            <input type="range" name="" min={6} max={100} value={Length} onChange={ChangeValue} className="cursor-pointer" ></input>
            <label htmlFor="length">Length :{Length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id="" defaultValue={NumberAllower} onChange={()=>{setNumberAllower((prev)=>!prev)}} />
            <label htmlFor="number">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id="" defaultValue={CharAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor="charInput">Character</label>
          </div>

        </div>

        
      </div>
      <div className="flex items-center justify-start mb-2">

          <button onClick={NewPassword} className="outline-none bg-green-800 text-white px-3 m-2 py-0.5 shrink-0">New</button>
          {/* <button onClick={Reset} className="outline-none bg-red-800 text-white px-3 m-2 py-0.5 shrink-0">Reset</button> */}
          
      </div>

    </div>
      
    </>
  );
}

export default App
