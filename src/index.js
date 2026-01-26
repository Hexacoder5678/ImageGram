import express from 'express';
import connectDB from './config/dbconfig.js';
const PORT=5000;

const app=express();//crerate express app server instance

app.get('/',(req,res)=>{
    return res.send('Home');
});

app.get('/ping',(req,res)=>{
    return res.json({message:'ping'});
});

app.get('/hello',(req,res)=>{
    return res.json({message:'Hello World'});
});

app.post('/hello',(req,res)=>{
    return res.json({message:'Post:Hello World'});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


/* to make the post request we have to write in the console 
 of the inspect beacuse server and the client are both on the same machine
  therfore we have to make the post request in the console of 
   the inspect. The request which we make using the browser search bar
  is for get request*/

  //so like this we will make the request//

  /*

  async function fun(){
    const response=await fetch("http://localhost:5000/hello",{method:"POST"});
    const data=await response.json();
    console.log(data);
}

*/

//now we will call the function fun()//
//fun();