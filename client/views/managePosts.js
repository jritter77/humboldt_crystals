import {getAllPosts, addNewsPost, deleteNewsPost, editNewsPost} from '../models/posts.js';
import { newsPost } from "../components/newsPost.js";
import { Modal } from "../components/modal.js";
import { verifySession } from "../models/sessions.js";
import { uploadImg } from "../models/webRequest.js";

let posts = [];



function openNewPost() {
    $('#newPostTitle').val('');
    $('#newPostDesc').val('');

    $('#uploadedImages').html('');
    $('#uploadResult').html('');

    $('#modalSubmit').off('click');
    $('#modalSubmit').click(newPost);
}


function openEditPost(index) {
    const p = posts[index];
    const images = (p.images) ? (p.images).split(' ') : [];
    $('#modalSubmit').val(p.id);
    $('#newPostTitle').val(p.title);
    $('#newPostDesc').val(p.description);

    // Clear any previous uploaded images from modal
    $('#uploadedImages').html('');
    $('#uploadResult').html('');
            
    // Show all optional images
    for (let image of images) {
        $(uploadedImage(image.split('/').pop())).appendTo('#uploadedImages').click(removeImage);
    }

    $('#modalSubmit').off('click');
    $('#modalSubmit').click(editPost);
}




async function handleUpload() {
    if (document.getElementById('fileToUpload').files.length > 0) {
        const img = new FormData(document.getElementById('img_upload'));
        $('#uploadResult').html('uploading...');
        const result = await uploadImg(img);
        $('#uploadResult').html(result);
        $(uploadedImage(img.get('fileToUpload').name)).appendTo('#uploadedImages').click(removeImage); 
    }
    else {
        $('#uploadResult').html('');
    }
}


function removeImage(e) {
    console.log(e.target.value)
    const div = document.getElementById(e.target.value);
    div.remove();
}



async function newPost(e) {
    e.preventDefault();

    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText);
    });

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const curDate = `${month}/${day}/${year}`;
    const title = $('#newPostTitle').val();
    const desc = $('#newPostDesc').val();
    

    if (title && desc) {
        await addNewsPost(curDate, title, desc, images.join(' '));
        refreshPosts();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newPostModal').addClass('was-validated');
    }

}





async function editPost(e) {
    e.preventDefault();

    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText);
    })

    const id = this.value;
    const title = $('#newPostTitle').val();
    const desc = $('#newPostDesc').val();
    

    if (title && desc) {
        await editNewsPost(id, title, desc, images.join(' '));
        refreshPosts();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newPostModal').addClass('was-validated');
    }
}


async function deletePost(id) {
    const c = confirm('Are you sure you want to delete this Post?');
    if (c) {
        await deleteNewsPost(id);
        refreshPosts();
    }
}


async function refreshPosts() {
    posts = await getAllPosts();

    posts.reverse();

    $('#posts').html(posts.map((e, i) => newsPost(e, i)).join(''));

    // Set onclick event of all deletePostButtons
    $('.editPostButton').each((i, e) => {
        e.onclick = () => openEditPost(e.value);
    });

    // Set onclick event of all deletePostButtons
    $('.deletePostButton').each((i, e) => {
        e.onclick = () => deletePost(e.value);
    });
}



async function ManagePosts() {

    $('#app').html('');

    await verifySession();
    
    // create Modal for newPost
    Modal('New Post', newPostModal, newPost);

    $('#fileToUpload').on('change', handleUpload);

    // create post list
    await postList();
    
}




async function postList() {
    const app = $('#app');

    posts = await getAllPosts();

    posts.reverse();

    app.append(`
    <hr>
    <div class='row no-gutters text-center'>
        <div class='col'>
            <button id='newPost' data-toggle='modal' data-target="#exampleModal" class='btn btn-success'>+</button>
        </div>
        <div class='col'>
            <p><u>ID #</u></p>
        </div>
        <div class='col'>
            <p><u>Date</u></p>
        </div>
        <div class='col'>
            <p><u>Title</u></p>
        </div>
        <div class='col-4'>
            <p><u>Description</u></p>
        </div>
    </div>
    <hr>
    <div id='posts'>
    ${posts.map((e, i) => newsPost(e, i)).join('')}
    </div>
    `);

    $('#newPost').click(openNewPost);

    // Set onclick event of all deletePostButtons
    $('.editPostButton').each((i, e) => {
        e.onclick = () => openEditPost(e.value);
    });

    // Set onclick event of all deletePostButtons
    $('.deletePostButton').each((i, e) => {
        e.onclick = () => deletePost(e.value);
    });
}


const uploadedImage = (filename) => {

    return `
        <div class='row' id='${filename}'>
            <button class='btn btn-danger removeImage col-1' value='${filename}'>X</button>   
            <p class='uploadedImage col'>${filename}</p>
        </div>
    `
}


const newPostModal = `
    <form id='newPostModal' class='needs-validation' novalidate>
        <div class='form-group'>
            <label for='newPostTitle'>Title</label>
            <input type='text' class='form-control' id='newPostTitle' placeholder='Title' required>
            <div class='invalid-feedback'>
                Please enter a title.
            </div>
        </div>
        <div class='form-group'>
            <label for='newPostDesc'>Description</label>
            <textarea class='form-control' id='newPostDesc' rows='3' placeholder='Description of Post.' required></textarea>
            <div class='invalid-feedback'>
                Please enter a description.
            </div>
        </div>
    </form>
    <form id='img_upload' class='needs-validation' novalidate>
        Select Cover Image:
        <input type='file' name='fileToUpload' id='fileToUpload' >
        <div id='uploadResult'></div>
    </form> 
    <div id=uploadedImages></div> 
    `;

export {ManagePosts};