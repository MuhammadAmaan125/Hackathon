import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    bio:String

})

const dataschema =mongoose.Schema({
    title:String,
    description:String,
    img_url:String,
    uid:String,
    username:String
})


if(mongoose.models['users']){
    delete mongoose.models["users"]
}

if(mongoose.models['posts']){
    delete mongoose.models["posts"]
}

export const post = mongoose.model("posts",dataschema)
export const user = mongoose.model('users',userSchema)