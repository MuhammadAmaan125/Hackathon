"use client"
import "./page.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import img from "../../assits/blank-profile-picture-973460_640.webp"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import logo from "../../assits/Capture-removebg-preview.png"



export default function Profile(props){

  const [showModal, setShowModal] =useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


let [edata,setedata]=useState("")
let [val,setval]=useState({
  title:"",
  description:"",
  img_url:""
})

console.log(val)

  let key =props.params.id


   let route=useRouter()


let  [data,setdata]=useState({
  username:"",
  bio:""
})
let [userdata,setuserdata]=useState([])


   
console.log(userdata)
   
      
   useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/getuser/${key}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.data.username));
      setedata(
        response.data.data
      )
    })
    .catch((error) => {
      console.log(error);
    });
   },[])
    

useEffect(()=>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/userpost/${key}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
setuserdata(
    response.data.data
) 

})
  .catch((error) => {
    console.log(error);
  });
  

},[])


 let edituser=()=>{
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/editprofile/${key}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {
      username:data.username,
      bio:data.bio
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
  
  setShowModal(false)
 

 }

let deletepost =(e)=>{
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/deletepost/${e}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}
  
let editpost =(e)=>{
  
   console.log(e)
let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: `http://localhost:3000/api/editpost/${e}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : {
    title:val.title,
    description:val.description,
    img_url:val.img_url
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

}






    return(
    
<>
<div className="container-fluid">
  
<nav className="w-full">
      <div class="mock"></div>
      <div class="fixed">
        <div class="nav-content">
        <Image class="logo w-28 cursor-pointer" alt="logo" src={logo} onClick={()=>route.back()} />

          <div class="desktop-only">
          <div class="bg-neutral-200 px-4 py-1.5 rounded-lg md:flex items-center gap-2 hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-5 h-5 text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input type="text" placeholder="Search" class="bg-transparent focus:outline-none" /></div>
          </div>
         
          
         
<div className="mx-3">
<button class="text-gray-500 bg-gray-200 cursor-pointer" onClick={()=>route.replace("/")}>Log Out</button>

</div>
         
        </div>
      </div>
    </nav>
    <main>
      <header>
        <div class="header-wrap ">
          <div class="profile-pic">
     <Image src={img}></Image>
          </div>
          <div class="profile-info">
            <div class="title row">
              <h2>{edata.username}</h2>
              <span class="verfied-icon"></span>
              <Button   onClick={() => setShowModal(true)} className="bg-gray-200 p-2 text-gray-500 md:mx-0 mx-3 font-bold cursor-pointer rounded-md" >Edit Profile</Button>
              <Button onClick={()=>route.push("../addpost")} className="bg-gray-200 p-2 text-gray-500 font-bold cursor-pointer rounded-md" >Add Post</Button>
            </div>
            <div class="desktop-only">
              <div class="details row">
                <ul>
                  <li><span>{userdata.length}</span> posts</li>
                
                </ul>
              </div>
              <div class="descriptions row last">
               <p>{edata.bio}</p>
              </div>
            </div>
          </div>
        </div>
  
      </header>

     
      <div class="desktop-only">
        <div class="tabs">
          <div class="tab-item active" >
            <svg
              aria-label="Posts"
              class="_8-yf5"
              fill="#262626"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clip-rule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span>POSTS</span>
          </div>
          <div class="tab-item" >
            <svg
              aria-label="Posts"
              class="_8-yf5"
              fill="#8e8e8e"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"
              ></path>
            </svg>
            <span>IGTV</span>
          </div>
          <div class="tab-item">
            <svg
              aria-label="Tagged"
              class="_8-yf5"
              fill="#8e8e8e"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"
              ></path>
            </svg>
            <span>TAGGED</span>
          </div>
        </div>
      </div>
      <div class="mobile-tabs mobile-only">
        <ul>
          <li>
            <div>{userdata.length}</div>
            posts
          </li>
          <li>
            <div>25.1m</div>
            followers
          </li>
          <li>
            <div>6</div>
            following
          </li>
        </ul>
        <div class="actions">
          <svg
            aria-label="Posts"
            class="_8-yf5"
            fill="rgb(0, 149, 246)"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path
              clip-rule="evenodd"
              d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <svg
            aria-label="Posts"
            class="_8-yf5"
            fill="#8e8e8e"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path
              d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"
            ></path>
          </svg>
          <svg
            aria-label="Tagged"
            class="_8-yf5"
            fill="#8e8e8e"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path
              d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="gallery">
       
     {
        userdata.map((v,i)=>{
          return(
            <>
  
  <div class="card max-w-sm rounded overflow-hidden shadow-lg " key={i}>
  <img class="w-full md:h-60 sm:h-auto " src={v.img_url} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{v.title}</div>
    <p class="text-gray-700 text-base">
     {v.description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <Button  onClick={()=>onOpen()} type="button" class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer" >Edit</Button>
    <button type="button" class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer" onClick={(e)=>deletepost(v._id)}>Delete </button>

  </div>
</div>



{/* edit Modal Start*/}


<Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
              <ModalBody>
                <Input
                onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                  name="title"
                autoFocus
                  endContent
                  label="Title"
                  placeholder="Enter your title"
                  variant="bordered"
                />
                <Input
                  onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                name="description"
                  endContent
                  label="Description"
                  placeholder="Enter your Description"
                  type="text"
                  variant="bordered"
                />
                              <Input
                         onChange={(e)=>setval({...val,[e.target.name]:e.target.value})}
                         name="img_url"
                  autoFocus
                  endContent
                  label="img_url"
                  placeholder="Enter your img_url"
                  variant="bordered"
                />

              </ModalBody>
              <ModalFooter>
                <Button className="text-gray-500 bg-white" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-gray-200 text-gray-500" onClick={(e)=>editpost(v._id)}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


{/* edit Modal End*/}


            </>
          )
        })
       }

      </div>
    </main>









      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   Edit Profile
                  </h3>
                  <button
                    className="p-1 cursor-pointer ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
              
                <div className="relative p-6 flex-auto">
              
                <Input
                onChange={(e)=>setdata({...data,[e.target.name]:e.target.value})}
                name="username"
                value={data.username}
                  autoFocus
                  endContent
                  label="username"
                  placeholder="Enter your username"
                  variant="bordered"
                 
                />
                <Input
                  endContent
                  onChange={(e)=>setdata({...data,[e.target.name]:e.target.value})}
                  name="bio"
                  value={data.bio}
                  label="Add Bio"
                  placeholder="Enter your Bio"
                  type="text"
                  variant="bordered"
                  className="mt-5"
                />

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 cursor-pointer background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                  <button
                    className="bg-gray-200 cursor-pointer text-gray-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>edituser()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


</div>


</>

    
)

}








