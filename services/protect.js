const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) =>{
    const authHeader = req.header('Authorization');

    const token = req.cookies.token;
    if(!token) return res.status(401).json({error:"Access denied"});
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Invalid token"})
    }
}
module.exports = auth;

