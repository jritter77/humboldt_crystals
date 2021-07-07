import {getAllPosts, addNewsPost, deleteNewsPost, editNewsPost} from '../database.js';
import { newsPost } from "../components/newsPost.js";
import { Modal } from "../components/modal.js";
import { verifySession } from "../sessions.js";

let posts = [];



function openNewPost() {
    $('#newPostTitle').val('');
    $('#newPostDesc').val('');

    $('#modalSubmit').off('click');
    $('#modalSubmit').click(newPost);
}


function openEditPost(index) {
    const p = posts[index]
    $('#modalSubmit').val(p.id);
    $('#newPostTitle').val(p.title);
    $('#newPostDesc').val(p.description);

    $('#modalSubmit').off('click');
    $('#modalSubmit').click(editPost);
}


async function newPost(e) {
    e.preventDefault();

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const curDate = `${month}/${day}/${year}`;
    const title = $('#newPostTitle').val();
    const desc = $('#newPostDesc').val();
    

    if (title && desc) {
        await addNewsPost(curDate, title, desc);
        refreshPosts();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newPostModal').addClass('was-validated');
    }

}





async function editPost(e) {
    e.preventDefault();

    const id = this.value;
    const title = $('#newPostTitle').val();
    const desc = $('#newPostDesc').val();
    

    if (title && desc) {
        await editNewsPost(id, title, desc);
        refreshPosts();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newPostModal').addClass('was-validated');
    }
}


async function deletePost(id) {
    await deleteNewsPost(id);
    refreshPosts();
}


async function refreshPosts() {
    posts = await getAllPosts();

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

    // create post list
    await postList();
    
}




async function postList() {
    const app = $('#app');

    posts = await getAllPosts();

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
    `;

export {ManagePosts};