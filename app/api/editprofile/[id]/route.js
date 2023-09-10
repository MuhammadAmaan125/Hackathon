import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../../lab/model/model";
import { dbconnect } from "../../lab/database";



export async function PUT (request,content){
 
const id = content.params.id

    const data = await request.json()




await mongoose.connect(dbconnect)
.then((req)=>{
console.log("post api connected")
})



  let obj = {_id:id}


  const filter = await user.findOneAndUpdate(obj,data)
 
    
    
    return NextResponse.json({
        data: filter,
        message:"edit user api",
        status:true
    })


}



