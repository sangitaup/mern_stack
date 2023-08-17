const express = require('express');
const Jwt = require('jsonwebtoken');
const secretKey= 'security';
const app = express();

app.get('/', (req,resp)=>{
    resp.json({
        message:"sample api"
    })
})

app.post('/login',(req, resp)=>{
    const user={
        id:1,
        username: 'ruche',
        email: 'ruchi@gmail.com'
    }
    Jwt.sign({user}, secretKey, {expiresIn: '300s'}, (err,token)=>{
           resp.json({
            token
           }) 
    })
        app.post('/profile',verifyToken,(req,resp)=>{
            Jwt.verify(req.token, secretKey, (err, authData)=>{
                if(err){
                    resp.send({result: "Invalid token"})
                }else{
                    resp.json({
                        message:'profile accessed',
                        authData
                    })
                }
            })

        })


})

function verifyToken(req,resp,next){
const bearerHeader= req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();

}else{
    resp.send({
        result:"Token is not valid"
    })
    
}
}

app.listen(4000,()=>{
    console.log("app is running on 4000 port");
})











