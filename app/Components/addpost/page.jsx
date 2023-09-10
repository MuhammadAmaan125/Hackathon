"use client"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function AddPost (){
    let route =useRouter()
let key =localStorage.getItem("user_id")
let [name,setname]=useState("")
let [val,setval]=useState({
  title:"",
  description:"",
  img_url:"",
  uid:key
})


console.log(name)

 let  datapost=()=>{
  if(val.title == ""|| val.description =="" || val.img_url=="" || name==""){
  alert("enter Requerid Fields")  
  }
  else{

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/addpost',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        title:val.title,
        description:val.description,
        img_url:val.img_url,
        uid:val.uid,
        username:name
      }
    };
    
    axios.request(config)
    .then((response) => {
    route.back()
      
    })
    .catch((error) => {
      console.log(error);
    });
      
  }
  
  
 }  

 
 useEffect(()=>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/userdata/${key}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
if(response){
  setname(
    response.data.data.username
  )
}

  })
  .catch((error) => {
    console.log(error);
  });
  

 },[])



  
  return(
        <>
        <h1>  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Post</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6 " action="#">
      <div>
        <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
        <div class="mt-2">
          <input 
          onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
          id="name" name="title" type="text" autocomplete="name"    required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="father name" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
        </div>
        <div class="mt-2">
          <input 
          onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
          id="fathername" name="description"  type="text" autocomplete="current-password"  required class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="Contact" class="block text-sm font-medium leading-6 text-gray-900">Image Link</label>
        <div class="mt-2">
          <input 
          onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
          id="contact" name="img_url" type="text" autocomplete="contact"    required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm px-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>


      <div className="flex justify-center">
      <button type="button"  class="flex w-full justify-center rounded-md bg-gray-200 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 shadow-sm  cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={()=>route.back()}>Back</button>
        <button type="button"  class="flex w-full justify-center rounded-md bg-gray-200 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 shadow-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " onClick={()=>datapost()}>Post </button>
      </div>
    </form>


  </div>
</div>
</h1>
        </>
    )
}
