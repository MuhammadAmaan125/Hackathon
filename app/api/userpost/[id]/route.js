import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { post } from "../../lab/model/model";
import { dbconnect } from "../../lab/database";



export async function GET (request,content){

    let id = content.params.id
    

await mongoose.connect(dbconnect)
.then((req)=>{
console.log("getpost api connected")
})




    let res= await post.find({uid:id})

    
    
    return NextResponse.json({
        data:res,
        message:"Data ok",
        status:true
    })


}



