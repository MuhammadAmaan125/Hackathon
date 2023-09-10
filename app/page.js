
"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {




  let route = useRouter()

  let [val,setval]=useState({
      email:"",
      password:""
  })




const movesignup=()=>{
route.push("./Components/SignUp")
  }

const userlogin=()=>{
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/Login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
          email:val.email,
          password:val.password
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
     if(response.data.message=="Account Login"){
      localStorage.setItem("user_id",response.data.data._id)
       toast.success('Successfully Login', {
          autoclose:900
      });
  
      
     
    route.replace("./Components/home")
    
  }
else if(response.data.message=="Incorrect Password"){
     
      toast.error("Incorrect Password", {
        autoclose:900
    });
  }
  else{
  
      toast.error("Account Not Found", {
        autoclose:900
    });
    }
    })
    .catch((error) => {
      console.log(error);
    });
    
}





  return(
  <>


<div class="h-screen bg-gray-50 flex flex-col justify-center items-center">
  <div class="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
      <h1 class="bg-no-repeat instagram-logo"></h1>
      <form class="mt-8 w-64 flex flex-col">
          <input 
          onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
          name="email"
          autofocus
                 class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                 id="email" placeholder="Phone number, username, or email" type="text"/>
          <input 
                  onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                  name="password"
          autofocus       
                 class="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                 id="password" placeholder="Password" type="password"/>
          <button type="button" class=" text-sm text-center bg-blue-500 text-white py-1 rounded font-medium" onClick={()=>userlogin()}>
              Log In
          </button>
      </form>
      <div class="flex justify-evenly space-x-2 w-64 mt-4">
          <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span class="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
      </div>
      <button class="mt-4 flex">
          <div class="bg-no-repeat facebook-logo mr-1"></div>
          <span class="text-xs text-blue-900 font-semibold">Log in with Facebook</span>
      </button>
      <a class="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a>
  </div>
  <div class="bg-white border border-gray-300 text-center w-80 py-4">
      <span class="text-sm">Don't have an account?</span>
      <button type="button" class="text-blue-500 text-sm font-semibold" onClick={()=>movesignup()}>Sign up</button>
  </div>
  <div class="mt-3 text-center">
      <span class="text-xs">Get the app</span>
      <div class="flex mt-3 space-x-2">
          <div class="bg-no-repeat apple-store-logo"></div>
          <div class="bg-no-repeat google-store-logo"></div>
      </div>
  </div>
</div>
<ToastContainer />
  </>
  )

}
