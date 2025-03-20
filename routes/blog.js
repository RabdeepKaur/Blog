const{Router}= require("express")
const multer=require('multer')
const path=require('path')

const Blog= require("../modelS/blog")
const comment=require("./models/comment")

const router=Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./publc/uploads/${req.user._id}`))
    },
    filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user: req.user,
    })
})

router.get('/:id',async (req,res)=>{
  const blog=await Blog.findById (req.params.id).populate("createBY")
  return res.render('blog',{
    user:req.user,
    blog,
  });
})

router.post('/comment/:blogId',async(req,res)=>{
const comment=await Comment.create({
  content:res.body.content,
  blogId:req.params.blogId,
  createBy:req.user._id
});
return res.redirect(`/blog/${req.paramsblogId}`);
})

router.post("/",upload.single("coverImage"), async (req,res)=>{
    const {title,body}=req.body
 const blog= await Blog.create({
    body,
    title,
    createBy:req.user._id,
    coverImage:`/uploads/${req.file.filename}`
})
   return res.redirect(`/blog/${blog._id}`);
})
module.exports=router