import mongoose from "mongoose"
import { user } from "../lab/model/model"
import { dbconnect } from "../lab/database"
import { NextResponse } from "next/server"





export async function POST(request){

    let body = await request.json()

    await mongoose.connect(dbconnect)
    .then(()=>{
        console.log("login api connect")
    })


    let filter = await user.findOne({email:body.email})
if(filter!=null){
    if(filter.password==body.password){
        return NextResponse.json({
            data:filter,
            message:"Account Login",
            status:true
        })
    }else{
        return NextResponse.json({
            data:filter,
            message:"Incorrect Password",
            status:true
        })
    }
   
}else{
    return NextResponse.json({
        data:[],
        message:"account not found",
        status:true
    })
}

    



}