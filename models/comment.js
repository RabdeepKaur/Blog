const {Schema,model}= require("mongoose")

const commentSchema= new Schema({
    content:{
        type:String,
        required:true
    },
    createBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
    },
},{timestamps:true}
)

const comment=model("comment",commentSchema);

module.exports=comment;