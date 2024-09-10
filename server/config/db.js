//Instalize the mongose
const mongoose=require('mongoose');

//Get the url of the database from the url to connect the database and mongoose server
const URL='mongodb://localhost:27017/Ecommerce';

//conect the NODE WITH THE URL USING MONGOSE.CONNECT

mongoose.connect(URL).then(()=>{
    console.log("URL IS CORRECT");
})
.catch((err)=>{
    console.log({message:'Database is not Connected'},err)
})
//get the default connection

const db=mongoose.connection;
db.on('connected',()=>{
    console.log('database is connected');
})
db.on('disconnected',()=>{
    console.log('Database is disconnected');
})
db.on('error',(err)=>{
    console.log("Internal Error",err)
})
module.exports=db;