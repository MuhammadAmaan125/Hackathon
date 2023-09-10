import mongoose from "mongoose";
import { post } from "../../lab/model/model";
import { dbconnect } from "../../lab/database";
import { NextResponse } from "next/server";

export async function DELETE (request,content){

let id =content.params.id
console.log(id)
    await mongoose.connect(dbconnect)
.then((req)=>{
console.log("delete api run")
})

let obj ={_id:id}

let res = await post.deleteOne(obj)

return NextResponse.json({
data:res,
message:" run",
status:true
})

}