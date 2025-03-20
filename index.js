const path=require("path")
const express=require('express');
const mongoose=require("mongoose")
const cookieParser=require('cookie-parser');

const blog=require('./models/blog')

const userRouter= require("./routes/user");
const blogRouter=require("./routes/blog")

const { checkforauthcooke } = require("./middleware/authentication");


const app= express();
const PORT=8000;

mongoose.connect("mongodb://localhost:27017/hitman").then ((e)=>console.log('mongodb connect'))

app.set('view engine','ejs')
app.set('views',path.resolve("./views"));

app.get("/",async (req,res)=>{
    const allBlogs=await Blog.find({}).
    res.render("home",{
        user : req.user,
        blogs:allBlogs
    })
})

app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkforauthcooke('token'))
app.use(express.static (path.resolve("./public")))


app.use("/user",userRouter)
app.use("/blog",blogRouter)

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`))