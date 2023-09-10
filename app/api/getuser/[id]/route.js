import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../../lab/model/model";
import { dbconnect } from "../../lab/database";



export async function GET (req,content){

let id =content.params.id

await mongoose.connect(dbconnect)
.then((req)=>{
console.log("getusr api connected")
})




    let res= await user.findOne({_id:id})

    
    
    return NextResponse.json({
        data:res,
        message:"get user ",
        status:true
    })


}



