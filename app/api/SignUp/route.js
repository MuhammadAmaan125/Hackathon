import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../lab/model/model";
import { dbconnect } from "../lab/database";



export async function POST (request){
   let body = await request.json()

await mongoose.connect(dbconnect)
.then((req)=>{
console.log("connected")
})



const check= await user.findOne({email:body.email})
if(check==null){
  
    let res=  user(body)
    await res.save()
    
    
    return NextResponse.json({
        data:res,
        message:"signup",
        status:true
    })

}else{

  

    return NextResponse.json({
        data:[],
        message:"alredy rigesterd",
        status:true
    })

}


}


