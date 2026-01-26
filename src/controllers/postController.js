import { createPostService } from "../services/postServices";

export async function createPost(req,res){
    //call the service layer function
    console.log(req.file);//req.file.location
    //call the service layer function

    const post= await createPostService({
        capiton:req.body.caption,
        image:req.file.location
    });
    return res.json({
        success:true,
        message:'Post created successfully',
        data:post});
}