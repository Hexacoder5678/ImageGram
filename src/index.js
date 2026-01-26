import express from 'express';
import connectDB from './config/dbconfig.js';
import {createPost} from './controllers/postController.js';


const PORT=5000;

const app=express();//create express app server instance

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get('/ping/:name',(req,res)=>{
    const name=req.params.name
    return res.json({message:'pong'+' '+name});
});


app.post('/posts',s3uploader.single('image'),createPost);

//middleware:m1,m2,m3
/*function m1(req,res,next){
    console.log('m1');
    next();
}
function m2(req,res,next){
    console.log('m2');
    next();
}
function m3(req,res,next){
    console.log('m3');
    next();
}

app.post('/posts',m1,m2,m3,createPost);
*/


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