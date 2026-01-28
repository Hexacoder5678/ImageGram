import { createPostService, getAllPostsService, updatePostService ,deletePostService} from "../services/postService.js";

export async function createPost(req, res) {
    try {
        console.log(req.file);

        const post = await createPostService({
            caption: req.body.caption,
            image: req.file.location
        });

        return res.json({
            success: true,
            message: "Post created successfully",
            data: post
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating post"
        });
    }
}


export async function getAllPosts(req,res){
    try{
       const limit=req.query.limit || 10;
       const offset=req.query.offset || 0;
       const paginatedPosts=await getAllPostsService(offset,limit);

       return res.status(200).json({
        success:true,
        message:"All posts fetched successfully",
        data:paginatedPosts
       });
    }catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Internal Server Error"
         });
    }
}

export async function deletePost(req,res){
    try{
        const postId=req.params.id;
        const response=await deletePostService(postId);
        return res.status(200).json({
            success:true,
            message:"Post deleted successfully",
            data:response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

export async function updatePost(req,res){
    try{
        console.log("req file",req.file);
        const updateObject=req.body;
        if(req.file){
            updateObject.image=req.file.location;
        }
        const response=await updatePostService(req.params.id,updateObject);
        return res.status(200).json({
            success:true,
            message:"Post updated successfully",
            data:response
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}