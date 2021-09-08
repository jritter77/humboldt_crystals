import { Article } from "../components/article.js";
import { Modal } from "../components/modal.js";
import { addRecord, deleteRecord, editRecord, getAllRecords } from "../models/articles.js";
import { uploadImg } from "../models/webRequest.js";
import { verifySession } from "../models/sessions.js";


/** PAGE VARS */

// Declare all global variables for the page
let articles;
let searchTerm = "";
let activeFilters;
let activePriceRange;




/** PAGE FUNCTIONS */



window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (location.hash.substring(1) === 'catalog') {
        const topButton = document.getElementById('topButton');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "inline";
        }
        else {
            topButton.style.display = "none";
        }
    }
}

function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



function openNewArticle() {
    $('#newArticleTitle').val('');
    $('#newArticleDesc').val('');
    $('#newArticlePrice').val('');
    $('#newArticleTags').val('');
    $('#uploadedImages').html('');

    $('#modalSubmit').off('click');
    $('#modalSubmit').click(addArticle);
}


function openEditArticle(index) {
    const a = articles[index];
    const opt = (a.opt) ? (a.opt).split(' ') : [];
    $('#modalSubmit').val(a.id);
    $('#newArticleTitle').val(a.title);
    $('#newArticleDesc').val(a.description);
    $('#newArticlePrice').val(a.price);
    $('#newArticleTags').val(a.tags);

    // Clear any previous uploaded images from modal
    $('#uploadedImages').html('');

    // Show main image
    $(uploadedImage(a.img.split('/').pop())).appendTo('#uploadedImages').click(removeImage);
    
    // Show all optional images
    for (let image of opt) {
        $(uploadedImage(image.split('/').pop())).appendTo('#uploadedImages').click(removeImage);
    }


    $('#modalSubmit').off('click');
    $('#modalSubmit').click(editArticle);
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



// Add Article function adds new article to database
async function addArticle(e) {
    e.preventDefault();

    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText.toLowerCase());
    });


    const title = $('#newArticleTitle').val();
    const desc = $('#newArticleDesc').val();
    const price = $('#newArticlePrice').val();
    const img = images[0];
    const tags = $('#newArticleTags').val();
    const opt = images.slice(1).join(' ');

    if (title && desc && price && img) {
        await addRecord(title, desc, price, img, tags, opt);
        refreshArticles();
        $('#exampleModal').modal('hide');
        alert('New Item Created Successfully!');
    }
    else {
        $('#newArticleModal').addClass('was-validated');
        $('#img_upload').addClass('was-validated');
    }
}


// Edit Article function edits article in database
async function editArticle(e) {
    e.preventDefault();


    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText.toLowerCase());
    })

    const id = this.value;
    const title = $('#newArticleTitle').val();
    const desc = $('#newArticleDesc').val();
    const price = $('#newArticlePrice').val();
    const img = images[0];
    const tags = $('#newArticleTags').val();
    const opt = images.slice(1).join(' ');

    if (title && desc && price && img) {
        await editRecord(id, title, desc, price, img, tags, opt);
        refreshArticles();
        $('#exampleModal').modal('hide');
        alert('Item Was Edited Successfully!');
    }
    else {
        $('#newArticleModal').addClass('was-validated');
        $('#img_upload').addClass('was-validated');
    }
}


// deletes article from db
async function deleteArticle(id) {
    await deleteRecord(id);
    refreshArticles();
}


// Checks for the current searchTerm in the title and description of given article
function checkSearchTerm(a) {
    const title = a.title.toLowerCase().search(searchTerm.toLowerCase()) > -1;
    const desc = a.description.toLowerCase().search(searchTerm.toLowerCase()) > -1;
    if (title || desc) {
        return true;
    }
    return false;
}


// Collects which filters are currently active and stores the results in activeFilters
function getActiveFilters() {
    activeFilters = [];
    $('.articleFilter').each((i, e) => {
        if (e.checked) {
            activeFilters.push(e.value.toLowerCase());
        }
    });
}


// sets the current price range to the selected option
function getPriceRange() {
    $('.articlePriceRange').each((i, e) => {
        if (e.checked) {
            if (e.value === 'any') {
                activePriceRange = [0, Infinity];
                return false;
            }

            const range = e.value.split('-');
            range[1] = (range[1] === '*') ? Infinity : range[1];
            activePriceRange = range;
            return false;
        }
    });
}


// Filter function used to filter articles when searching
function filterArticles(a) {
    const tags = (a.tags) ? a.tags.toLowerCase() : "";
    const min = parseInt(activePriceRange[0]);
    const max = (activePriceRange[1] === Infinity) ? Infinity : parseInt(activePriceRange[1]);
    const price = parseInt(a.price);

    if (price >= min && price < max) {                  // Filter by price
        if (activeFilters.length > 0) {                 // Check for active filters
            for (let af of activeFilters) {             
                if (tags.indexOf(af) > -1) {
                    return checkSearchTerm(a);
                }
            }
        }
        else {
            return checkSearchTerm(a);
        }
    }


    return false;
}

// Filters the articles according to all search variables
function handleSearch(e) {
    e.preventDefault();

    searchTerm = $('#search').children(':first').val();
    searchTerm = (searchTerm) ? searchTerm : "";

    getActiveFilters();
    getPriceRange();

    $('#articles').html(articles.filter(filterArticles).map(Article));

}


async function refreshArticles() {
    articles = await getAllRecords();
    $('#articles').html(articles.map(Article).join(''));

    // Set onclick event of all deleteArticleButtons
    $('.deleteArticleButton').each((i, e) => {
        e.onclick = () => deleteArticle(e.value);
    })
}



function removeImage(e) {
    console.log(e.target.value)
    const div = document.getElementById(e.target.value);
    div.remove();
}


/** MAIN PAGE **/


// This is the main Page component to be displayed, houses all other components.
async function Catalog() {

    await verifySession();


    // GET articles from db
    articles = await getAllRecords();

    // WRITE THE HTML TO THE APP CONTAINER  
    const app = document.getElementById('app');

    app.innerHTML = `
    <div class='row no-gutters'>
        ${catalogCtl()}
        <div class='col'>
            <div id='articles' class='row d-flex justify-content-center'>
                ${articles.map((e, i) => Article(e, i)).join('')}
            </div>
        </div>
        
    </div>
    <div class='text-right fixed-bottom'>
        <button class='btn btn-secondary' id='topButton' style='margin:3vw;display:none;'>Top</button>
    </div>
    `;

    $('#topButton').click(goToTop);

    // create Modal for newArticle
    Modal('New Article', newArticleModal, addArticle);

    $('#fileToUpload').on('change', handleUpload);

    // Set onSubmit of search form
    $('#search').on('submit', handleSearch);

    // Set onclick event of all deleteArticleButtons
    $('.deleteArticleButton').each((i, e) => {
        e.onclick = () => deleteArticle(e.value);
    })


    $('#new_article_btn').click(openNewArticle);
    
    // Set onclick event of all editArticleButtons
    $('.editArticleButton').each((i, e) => {
        e.onclick = () => openEditArticle(e.value);
    });

    
}







/** COMPONENTS **/


// Catalog Control Component
const catalogCtl = () => `
    <div class='col-xs-1' style='margin-top:5vw;margin-right:3vw;'>
        <h3 class='text-center rounded' style='background-color:purple;color:white;'>Filters</h3>
        <div class='rounded' style="border: 2px solid purple">
            <div class='row'>
                ${filters()}
            </div>
            <div class='row'>
                <div class='col'>${search()}</div>
            </div>
        </div>
        ${(sessionStorage.getItem('token')) ? adminTools() : ""}
    </div>
  `;



// Search Component
const search = () => `
    <form id='search' style='margin:1vw;margin-top:3vw;'>
        <input class='form-control' placeholder='Search'></input>
        <button class='btn btn-primary' type='submit' style='margin-top:1vw'>Submit</button>
    </form>
    `;



// Filter Component
const filters = () => {

    return `
        <div class='col' style='margin:1vw;'>
        ${themesFilter()}
        ${priceRange()}
        </div>
        <div class='col' style='margin:1vw;'>
        ${typesFilter()}
        </div>
    `;

}


const checkBox = label => `
    <div class="form-check">
        <input class="form-check-input articleFilter" type="checkbox" value="${label}" id="filter_${label}">
        <label class="form-check-label" for="filter_${label}">
            ${label}
        </label>
    </div>`;



const typesFilter = () => {
    const types = ['Car Charms', 'Angels', 'Single Strand Suncatcher', 'Double Strand Suncatcher',
                    'Triple Strand Suncatcher', 'Multiple Strand Suncatcher', 'Earrings'];

    return `
        <div>
            <a data-toggle="collapse" href="#typeCollapse" role="button">
                <b>Types:</b>
            </a>
            <div class="collapse" id="typeCollapse">
            ${types.map(checkBox).join('')}
            </div>
        </div>
    `
    
    
}


const themesFilter = () => {
    const themes = ['Animals', 'Nature', 'Sports', 'Redwood'];

    return `
        <div>
            <a data-toggle="collapse" href="#themeCollapse" role="button">
                <b>Themes:</b>
            </a>
            <div class="collapse" id="themeCollapse">
            ${themes.map(checkBox).join('')}
            </div>
        </div>
    `
}

// Price Range component
const priceRange = () => {
    const ranges = ['any', '0-50', '50-100', '100-*'];

    const radioButton = (label) => `
        <div class="form-check">
            <input class="form-check-input articlePriceRange" name='price_range' type="radio" value="${label}" id="price_range_${label}" ${(label === 'any') ? 'checked' : ''}>
            <label class="form-check-label" for="price_range_${label}">
                ${label}
            </label>
        </div>
    `

    return `
        <div style='margin-top:1vw;'>
            <a data-toggle="collapse" href="#priceCollapse" role="button">
                <b>Price:</b>
            </a>
            <div class="collapse" id="priceCollapse">
            ${ranges.map(radioButton).join('')}
            </div>
        </div>
    `

}


// Admin Tools component
const adminTools = () => {
    return `
        <div class='rounded' style='margin-top:1vw;border: 2px solid purple'>
            <div style='margin:1vw'>
                <p>ADMIN TOOLS</p>
                <button class='btn btn-success' id='new_article_btn' data-toggle="modal" data-target="#exampleModal">New Article</button>
            </div>
        </div>
    `;
}


const uploadedImage = (filename) => {

    return `
        <div class='row' id='${filename}'>
            <button class='btn btn-danger removeImage col-1' value='${filename}'>X</button>   
            <p class='uploadedImage col'>${filename}</p>
        </div>
    `
}



// Body for New Article Modal component
const newArticleModal = `
        <form id='newArticleModal' class='needs-validation' novalidate>
            <div class='form-group'>
                <label for='newArticleTitle'>Article Title</label>
                <input type='text' class='form-control' id='newArticleTitle' placeholder='Title' required>
                <div class='invalid-feedback'>
                    Please enter a title.
                </div>
            </div>
            <div class='form-group'>
                <label for='newArticleDesc'>Description</label>
                <textarea class='form-control' id='newArticleDesc' rows='3' placeholder='Description of article.' required></textarea>
                <div class='invalid-feedback'>
                    Please enter a description.
                </div>
            </div>
            <div class='form-group'>
                <label for='newArticlePrice'>Price</label>
                <input type='text' class='form-control' id='newArticlePrice' placeholder='0.00' required>
                <div class='invalid-feedback'>
                    Please enter a price.
                </div>
            </div>
            <div class='form-group'>
                <label for='newArticleTags'>Tags</label>
                <input type='text' class='form-control' id='newArticleTags' placeholder='tag1, tag2, tag3...'>
            </div>
        </form>
        <form id='img_upload' class='needs-validation' novalidate>
            Select Cover Image:
            <input type='file' name='fileToUpload' id='fileToUpload' >
            <div id='uploadResult'></div>
        </form> 
        <div id=uploadedImages></div> 
    `;




export { Catalog }