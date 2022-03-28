
require("dotenv").config();


const jwt = require("jsonwebtoken");

const verifyToken = (token)=>{
    return new Promise ((resolve,reject)=>{
        jwt.verify(token,process.env.key),(err,decoded)=>{
            if(err){
                return reject(err);
            }
            return resolve(decoded);
        }
    })
}

const authenticate  = async (req,res,next)=>{
    if(!req.header.authorization){
        return res.status(400).send({message:"token not correct or not found"});
        
    }
    if(!req.header.authorization.startWith("Bearer ")){
        return res.status(400).send({message:"token not correct or not found"});

    }
    const token = req.header.authorization.split(" ")[1]

    let decoded;
    try {
        decoded = await verifyToken(token)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message:"token not correct or not found"});
    }

    req.userId = decoded.user._id;
    return next();
}

module.exports = authenticate;