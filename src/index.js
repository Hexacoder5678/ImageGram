import express from 'express';
import connectDB from './config/dbconfig.js';
//import postRouter from './routers/post.js';
//import userRouter from './routers/user.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import ip from 'ip';
import {rateLimit} from 'express-rate-limit';


const PORT=5000;


const limiter=rateLimit({
    windowsMs:0.5*60*1000,//30seconds
    max:5//limit each IP to 5 requests per windowsMs 
});


const app=express();//create express app server instance
const upload=multer();


app.use(limiter);//apply rate limiter to all requests
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

//app.use('/posts',postRouter);//if the url has /posts,then use the postRoter to handle the request
//app.use('/users',userRouter);//if the url starts with /users,then use the userRouter to handle the request


app.use('/api',apiRouter);//if the url starts with /api then the request is forwarded to the apiRouter

app.get('/ping',isAuthenticated,(req,res)=>{
    console.log(req.body);
    console.log(req.query);
    console.log(req.user);
    const name=req.params.name;
    const ipadrr=ip.address();
    return res.json({message:'pong'+' '+name+ipadrr});
});



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