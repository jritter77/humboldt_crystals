import {get, post} from './webRequest.js';


async function getAllPosts() {
    try {
        return JSON.parse(await get('./server/posts/getAllPosts.php'));
    }
    catch (err) {
        console.log(err);
    }
}



async function addNewsPost(date, title, desc, images) {

    try {
        await post('./server/posts/addPost.php', JSON.stringify({
            date: date,
            title: title,
            description: desc,
            images: images
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function editNewsPost(id, title, desc, images) {

    try {
        await post('./server/posts/editPost.php', JSON.stringify({
            id: id,
            title: title,
            description: desc,
            images: images
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}



async function deleteNewsPost(id) {
    try {
        return await post('./server/posts/deletePost.php', JSON.stringify({
            id: id
        }));

    }
    catch (err) {
        console.log(err);
    }

    
}


export {getAllPosts, addNewsPost, deleteNewsPost, editNewsPost}