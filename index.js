const express = require('express');
const dotenv = require('dotenv');
const database = require('./database/database.js')
const cronJob = require('./cron.js');

const User = require('./models/user.models.js')


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

cronJob.sendMailAllUser();

database();

app.post('/create',async(req,res)=>{
    try{
        const{name,email,password,mobile} = req.body;
        const user = new User({name,email,password,mobile});
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
  
})

app.listen(3000, function(){
    console.log('Server is running on port 3000');
})