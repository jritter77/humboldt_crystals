import { Modal } from "../components/modal.js";
import {get, post} from "../models/webRequest.js";
import {sendEmail} from '../models/sendEmail.js';

let article;

async function handleRequest(e) {
    e.preventDefault();

    const fn = $('#firstName').val();
    const ln = $('#lastName').val();
    const address = $('#address').val();
    const city = $('#city').val();
    const state = $('#state').val();
    const zip = $('#zip').val();
    const email = $('#email').val();

    const sub = `Purchase Request - ${article.title} #${article.id}`;
    const msg = `You have a recieved a purchase request for the following item:

    Title: ${article.title}
    Item Number: ${article.id}
    Price: $${article.price}

    Purchaser Info:

    Name: ${fn} ${ln}
    Email: ${email}
    Shipping Address: ${address} ${city}, ${state} ${zip}`;    

    if (sub && msg && email) {
        await sendEmail(sub, msg, email);
        alert('Message Sent Successfully!');
        
        $('#exampleModal').modal('hide');
        document.getElementById('purchaseRequestModal').reset(); 
    }
    else {
        $('#purchaseRequestModal').addClass('was-validated');
    }
}


async function Details() {
    const app = document.getElementById('app');

    const loc = location.hash.substr(1);
    const articleId = loc.split("-")[1];

    article = JSON.parse(await post('./server/records/getRecord.php', JSON.stringify({id: articleId})))[0];

    app.innerHTML = `
    <div class="row" >
        <div class="col-md" style='margin-top:2vw;padding-left:5vw;'>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            
                <p style='margin-top:5vw'><b>Number:</b> ${article.id}</p>
                <p ><b>Tags:</b> ${article.tags}</p>
                <p ><b>Price:</b> $${article.price}</p>
            
            <h5 style='margin-top:10vw'>
                Interested in this item?
            </h5>
            <p>
                Submit a purchase request to begin the ordering process! More information
                regarding the ordering process can be found on the Ordering page. 
            </p> 
                <button class='btn btn-primary' data-toggle="modal" data-target="#exampleModal">Purchase Request</button>
        </div>
        <div class='col-md' style='margin-top:2vw'>
            ${ImageSelector(article)}
        </div>
    </div>
    <div style='height:5vw'></div>
    `;


    Modal('Purchase Request', purchaseRequestModal, handleRequest);

    $('#modalSubmit').html('Send Request');

    $('.img-thumbnail').hover((e) => {
        $('#currentImage').attr('src', e.target.src);
    })
}



const ImageSelector = (articleId) => {

    let imgList = [article.img];
    
    if (article.opt) {
        imgList = imgList.concat(article.opt.split(' '));
    }
    


    function getThumbnail(img) {
        return `<img class='img-thumbnail' src='${img.toLowerCase()}' style='width:100%;'>`
    }

    return `
        <div class='row no-gutters'>
            <div class='col-2'>
                ${imgList.map(getThumbnail).join('')}
            </div>
            <div class='col-10'>
                <img id='currentImage' src='${imgList[0]}' style='width:100%;'>
            </div>
        </div>
    `
}


const purchaseRequestModal = `
    <h4>Instructions:</h4>
    <p>
        Please enter your email address and shipping information below to send a purchase 
        request for this item.<br>    
        After your request has been recieved a Paypal invoice will be sent to your email.<br>
        Once Payment has been recieved you will be sent a confirmation email and your item 
        will be shipped to your address.
    </p>
    <form id='purchaseRequestModal' class='needs-validation' novalidate>
        <div class='form-group'>
            <label for='email'>Email</label>
            <input type='text' class='form-control' id='email' placeholder='youremail@gmail.com' required>
            <div class='invalid-feedback'>
                Please enter a valid email address.
            </div>
        </div>
        <h4>Shipping Info:</h4>
        <div class='row'>
            <div class='form-group col'>
                <label for='firstName'>First Name</label>
                <input type='text' class='form-control' id='firstName' placeholder='John' required>
                <div class='invalid-feedback'>
                    Please enter your first name.
                </div>
            </div>
            <div class='form-group col'>
                <label for='lastName'>Last Name</label>
                <input type='text' class='form-control' id='lastName' placeholder='Smith' required>
                <div class='invalid-feedback'>
                    Please enter your last name.
                </div>
            </div>
        </div>
        <div class='form-group'>
            <label for='address'>Address</label>
            <input type='text' class='form-control' id='address' placeholder='0000 Main St.' required>
            <div class='invalid-feedback'>
                Please enter a an address.
            </div>
        </div>
        <div class='row'>
            <div class='form-group col'>
                <label for='city'>City</label>
                <input type='text' class='form-control' id='city' placeholder='Eureka' required>
                <div class='invalid-feedback'>
                    Please enter a city or town name.
                </div>
            </div>
            <div class='form-group col'>
                <label for='state'>State</label>
                <input type='text' class='form-control' id='state' placeholder='CA' required>
                <div class='invalid-feedback'>
                    Please select a state.
                </div>
            </div>
            <div class='form-group col'>
                <label for='zip'>ZIP</label>
                <input type='text' class='form-control' id='zip' placeholder='95501' required>
                <div class='invalid-feedback'>
                    Please enter a vaild ZIP code. 
                </div>
            </div>
        </div>
    </form>
`

export {Details}