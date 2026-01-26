import multer from "multer";
import multers3 from "multer-s3";
import s3 from './awsConfig.js';
import { AWS_BUCKET_NAME } from "./serverConfig";


export const s3uploader=multer({//uploader is a middleware
    storage:multers3({
        s3:s3,
        bucket:AWS_BUCKET_NAME,
        key:function (req,file,cb){
            console.log(file);
            const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9)//to make sure that the key is unique
            cb(null,file.fieldname+"-"+uniqueSuffix+"."+file.mimetype.split("/")[1]);
        }
    })
});