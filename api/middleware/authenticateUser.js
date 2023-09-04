const {sign, verify} = require("jsonwebtoken"); 
require("dotenv").config();

function createToken(user){
    return sign({
        email: user.email,
        password: user.password, 
    }, 

    process.env.SECRET_KEY,

    {
        expiresIn: "1h", 
    }
    
    );
}

function verifyAToken(req, res, next){
    try{
        const token = 
        req.cookies["AuthorisedUser"] !==null
        ? req.cookies["AuthorisedUser"]
        : "Please register";

        const isValid = null; 

        if(!token){
            isValid = verify(token, process.env.SECRET_KEY);

            if(isValid){
                req.authenticated = true;
                next();
            }
            else{
                res.json({
                    status: res.statusCode,
                    message: "Please register",
                })
            }

        }
        else{
            res.json({
                status: res.statusCode,
                message: "Please register",
            })
        }
    }
    catch (err) {
        res.json({
          status: res.statusCode,
          message: err.message,
        });
}
}

module.exports = {createToken, verifyAToken};