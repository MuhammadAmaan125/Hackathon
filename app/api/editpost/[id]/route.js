import mongoose from "mongoose";
import { dbconnect } from "../../lab/database";
import { post } from "../../lab/model/model";
import { NextResponse } from "next/server";


export async function PUT(request,content){

    let id = content.params.id
    let data = await request.json()

console.log(id)
console.log(data)
    mongoose.connect(dbconnect)
.then(()=>{
    console.log("editpost api connect")
})


let obj ={_id:id}

let result = await post.findOneAndUpdate(obj,data)



    return NextResponse.json({
        data:result,
        message:"editpost api connect",
        status:true
    })



}