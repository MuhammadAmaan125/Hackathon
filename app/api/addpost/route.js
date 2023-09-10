import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { post } from "../lab/model/model";
import { dbconnect } from "../lab/database";



export async function POST (request){
   let body = await request.json()

await mongoose.connect(dbconnect)
.then((req)=>{
console.log("post api connected")
})



  
    let res= post(body)
    await res.save()
    
    
    return NextResponse.json({
        data:res,
        message:"Data Transfer",
        status:true
    })


}



