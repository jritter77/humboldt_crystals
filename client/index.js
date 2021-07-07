
import {Home} from "./views/home.js";
import {About} from "./views/about.js";
import {Contact} from "./views/contact.js";
import {Details} from "./views/details.js";
import {Catalog} from "./views/catalog.js";
import {Admin} from "./views/admin.js";
import {ManagePosts} from "./views/managePosts.js";
import {ManageEvents} from "./views/manageEvents.js";
import {NavBar} from './components/navbar.js';

$('#header').html(NavBar());

const pages = {
    home: Home,
    about: About,
    contact: Contact,
    details: Details,
    catalog: Catalog,
    admin: Admin,
    manageposts: ManagePosts,
    manageevents: ManageEvents
}

function getPageFromURL() {
    const loc = location.hash.substring(1);
    return loc.split("-")[0];
    
}

// Populate contentDiv wtih retrieved HTML
function loadContent() {
    let fragmentId = getPageFromURL();
    pages[fragmentId]();
}

// Set to home page if no hash
if (!location.hash) {
    location.hash = '#home';
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener('hashchange', loadContent);