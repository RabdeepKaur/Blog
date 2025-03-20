const {Schema,model}=require("mongoose")

const blogSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:false
    },
    comment:{
        type: Scehma.Types.ObjectId,
        ref:"user"
    }
},
{timestamps:true}
)

const Blog=model('blog',Schema)

module.exports=Blog;