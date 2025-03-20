const {createHmac,randomBytes}= require ('node:crypto')
const {Schema,model}= require('mongoose');
const { createTokenForUser } = require('../services/authentication');

const userScehma= new Schema({
    fullName:{
        type:String,
        require:true,
        unique:true,
        validate: {
            validator: function(v) {
              return v != null && v.length > 0;
            },
            message: 'Full name cannot be empty'
          }
        
    },
    salt:{
        type:String,
     
    },
    password:{
        type:String,
        required:true,
        
    },
    ProfileImageUrl:{
type:String,

    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{
    timestamps:true
});

userScehma.pre("save", function (next){
    const user= this;// pionts ot the current user
    if (!this.fullName) {
        next(new Error('Full name is required'));
      }
if(!user.isModified("password")) return;

const salt=randomBytes(16).toString();
const hashpassword=createHmac('sha256',salt).update(user.password).digest("hex")

this.salt=salt
this.password=hashpassword

next()
})

userScehma.static('matchpassword', async function(email,password){
const user= await this.findOne({email});
//if(!user) throw new Error('User not found'); // edge case write  first

const salt=user.salt
const hashedpassword=user.password

const userProvidedHash=createHmac('sha256',salt)
.update(user.password)
.digest("hex")

if(hashedpassword !== userProvidedHash) throw new Error(" incorrect password")

    const token=createTokenForUser(user);
    return token;
})

const User=model('user',userScehma)

module.exports=User;