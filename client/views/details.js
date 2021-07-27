import {get, post} from "../models/webRequest.js";


async function Details() {
    const app = document.getElementById('app');

    const loc = location.hash.substr(1);
    const articleId = loc.split("-")[1];

    const article = JSON.parse(await post('./server/records/getRecord.php', JSON.stringify({id: articleId})))[0];

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
                <button class='btn btn-primary'>Purchase Request</button>
        </div>
        <div class='col-md' style='margin-top:2vw'>
            ${ImageSelector(article)}
        </div>
    </div>
    `;

    $('.img-thumbnail').hover((e) => {
        $('#currentImage').attr('src', e.target.src);
    })
}



const ImageSelector = (articleId) => {

    const imgList = ['butterfly.jpg', 'elephant.jpg', 'sakura.jpg'];

    function getThumbnail(img) {
        return `<img class='img-thumbnail' src='./images/${img}' style='height:15vh;width:15vh;'>`
    }

    return `
        <div class='row no-gutters'>
            <div class='col-2'>
                ${imgList.map(getThumbnail).join('')}
            </div>
            <div class='col-10'>
                <img id='currentImage' src='./images/butterfly.jpg' style='height:80vh'>
            </div>
        </div>
    `
}

export {Details}