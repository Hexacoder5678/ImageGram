import { createPost } from "../controllers/postController";

export const createPost=async (createPostObejct)=>{
    
    // 1.take the image of the post and upload o aws

    //2. get the url of the image from the response

    //3. create a post with the caption and the image url in the db using repository

    // 4. return the post obejct


    const caption=createPostObejct.caption?.trim();
    const image=createPostObejct.image;

    const post=await createPost(caption,image);
    return post;
}
hZgYj0ROoDprkKYMUPfAM0tGjbAeDneO+fh3dDNv=secret access key



AKIA2CGFJUGRRC2JQA5P=accesskey