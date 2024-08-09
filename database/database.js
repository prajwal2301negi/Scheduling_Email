const  mongoose = require('mongoose');

const database = ()=>{
    mongoose.connect(process.env.MONGO,{
        dbName: "CRON_JOB",
    })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to databsse: ${err}`);
    });
};

module.exports = database;