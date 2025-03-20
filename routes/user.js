const {Router}= require("express");
const User=require("../models/user")

const router=Router();

//  request to get the sign in page 
router.get("/signin",(req,res)=>{
    return res.render("signin")
}) 

// request to get signup page  this request the server to send the page 
router.get("/signup",(req,res)=>{
    return res.render("signup")
}) 

router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
  const token= await User.matchpassword(email,password);
  
   
    return res.cookie('token',token).redirect("/")

})

// User the sign up frontend display hoga , thsi display the page from the front page 
router.post("/signup", async (req,res)=>{
    const {fullName,email,password}= req.body
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/")
})

router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect("/home")
})

module.exports=router
