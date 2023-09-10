"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(){

    let route = useRouter()


    const movelogin=()=>{
        route.back()
    }



const [val,setval]=useState({
          name:"",
          username:"",
          email:"",
          password:"",
          contact:""

})


  const  handlepost=()=>{
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/SignUp',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {
            email:val.email,
            name:val.name,
            username:val.username,
            password:val.password
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.message=="alredy rigesterd"){
            
            toast.success("user alredy rigesterd", {
                autoclose:900
            });
        }else{

            toast.success("user signup", {
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
    <div class="bg-white border border-gray-300 w-80 py-5 flex items-center flex-col mb-3 ">
        <h1 class="bg-no-repeat instagram-logo"></h1>
    
       <div className="text-center mt-2">
        <span className="font-bold"> Sign up to see photos and videos from your friends </span>
       </div>
       
    
        <form class="mt-8 w-64 flex flex-col">
            <input 
            onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
            name="email"
            autofocus
                   class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="email" placeholder="Mobile Number or Email" type="text"/>
                     <input autofocus
                              onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                              name="name"
                  class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="name" placeholder="Full Name" type="text"/> 
                     <input autofocus
                                 onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                                 name="username"
                   class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="username" placeholder="Username" type="text"/>
            <input autofocus
                        onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                        name="password"
                   class="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="password" placeholder="Password" type="password"/>
            <button type="button" class=" text-sm text-center bg-blue-300 text-white py-1 rounded font-medium" onClick={()=>handlepost()}>
                Sign Up
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
        
    </div>
    <div class="bg-white border border-gray-300 text-center w-80 py-4">
        <span class="text-sm"> Have an account?</span>
        <button class="text-blue-500 text-sm font-semibold" onClick={()=>movelogin()}>Log in</button>
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