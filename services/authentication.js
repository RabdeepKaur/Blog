const JWT=require('jsonwebtoken')

const secret="$uperMan@123"

function createTokenForUser(user){
    const playload={
        _id:user._id,
        emial:user.email,
        profleImgeURL:user.profileImageURL,
        role:user.role,
    };
    const token=JWT.sign(playload,secret)
    return token;
}

function validateToken(token){
    const playload=JWT.verify(token,secret);
    return playload;
}

module.exports={
    createTokenForUser  ,validateToken
}