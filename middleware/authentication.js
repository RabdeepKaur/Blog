function checkforauthcooke(cookieName){
    return (req,res,next) =>{
        const tokenCookeValue=req.cookies[cookieName];
        if(!tokenCookeValue){
            return  next();
        }
       try{
        const userPayload=validateToken(tokenCookieValue);
        req.user=userPayload;
        next();
       }
       catch(error){}
        nect();
       
    };
}


module.exports={
    checkforauthcooke    
}