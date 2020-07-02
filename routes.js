const express = require('express');
const router = express.Router(); 

const jwt =  require('jsonwebtoken');
const User = require('./models/User');



router.get('/', (req,res)=> {
    res.send('This is working as it should');
})

router.get('/users', async (req,res)=> {
    const users = await User.find(); 
    res.send(users)

});

router.get('/users/:id', async (req,res)=> {

    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user)

});

router.post('/user', async (req,res)=> {

    const user = await User.create(req.body);
    res.send(user);

});

const PRIVATE = 'gfdas'; 

router.post('/login', async (req,res) => {
    const {email, password} = req.body; 
    const user = await User.findOne({email: email}); 
    if (user){
        if(user.password === password){

           const token =jwt.sign(user.toJSON(), PRIVATE);
           res.send({token:token});
            
            res.send({message:'User logged in'}); 
        }else{
            res.status(401).send({message:'Incorrect password'})

        }
    }else{
        res.status(401).send({message:'User does not exist'})
    }

});

const authencticationMiddleware = (req,res,next) =>{
    const token = req.headers.token;
    try{
        const decode = jwt.verify(token,PRIVATE);
        req.user = decode
    }catch(err){
        return res.status(401).send({message: 'unauthorized access'})
    }
    next();
}

router.get('/protected', authencticationMiddleware, (req,res) => {
    res.send({message: "Your logged in"});


})



module.exports = router;