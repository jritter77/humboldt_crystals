import { Carousel } from "../components/carousel.js";
import { Calendar, getEventDetail } from "../components/calendar.js";
import { getAllPosts} from '../models/posts.js';
import { getAllRecords } from "../models/articles.js";
import { Modal } from '../components/modal.js';



let posts = [];
let articles = [];


function displayEvent(el) {
    const day = el.children[0];
    if (!day.classList.contains('text-muted')) {
        if (day.children.length) {
            let index = day.children[0].id;
            let e = getEventDetail(index);
            $('.modal-title').html(e.title);
            $('.modal-body').html(`<p>${e.description}</p>`)
            $('#exampleModal').modal('toggle');
            
            for (let image of e.images.split(' ')) {
                $('.modal-body').append(`<img src=${image} style='width:50%;'>`);
            }
        }
        else {
            alert('No events for selected day.');
        }
    }
    
}



function displayPost() {
    const p = posts[this.id];
    $('.modal-title').html(p.title);
    $('.modal-body').html(`<p>${p.description}</p>`);

    for (let image of p.images.split(' ')) {
        $('.modal-body').append(`<img src=${image} style='width:50%;'>`);
    }
}



async function Home() {
    const app = document.getElementById('app');

    posts = await getAllPosts();
    articles = await getAllRecords();

    posts.reverse();


    


    
    app.innerHTML = `
    <div class="row no-gutters">
        <div class="col-md text-center" style="margin-top:5vw;">
            ${Carousel(articles)}
        </div>
    </div>
    <div class="row text-center" id="about">
        <div 
        class='text-center'
        style="margin-top:5vw;width:100%; background-image: url(./images/background_original.png);background-attachment: fixed;background-repeat: no-repeat;background-size: 120vw 120vw; padding: 2vw; font-family: Brush Script MT;"
        >
            <h1 style='color:white;font-size:5vw;'>Beautifully Handcrafted Beaded Crystal Suncatchers</h1>
        </div>
    </div>
    <div class="row" id="calendarAndNews">
        <div 
        class="col-md text-center rounded" 
        style="margin:5vw; margin-top:5vw; padding-top:2vw; background: rgb(87,14,140);background: linear-gradient(45deg, rgba(87,14,140,1) 0%, rgba(255,0,220,1) 100%);"
        >
            <h2 style='color:white;'>News Feed</h2>
            <div class='text-left overflow-auto' style='max-height: 80%;'>
                ${posts.map((p, index) => post(p, index)).join('')}
            </div>
            
        </div>
    </div>
    
    `;

    


    $('.newspost').click(displayPost);

    Modal('News Post', '', null);

    $('.dayContainer').each((i, el) => {
        el.onclick = () => displayEvent(el);
    })

}



const post = ({id, title, description}, index) => {
    
    if (description.length > 40) {
        description = description.substring(0, 40) + '...';
    }


    return `
        <div 
        onMouseOver='this.style.backgroundColor="violet"'
        onMouseOut='this.style.backgroundColor="white";'
        class='newspost rounded' 
        id='${index}'
        data-toggle='modal' 
        data-target="#exampleModal"
        style='cursor: pointer; padding: 1em; border: 1px solid purple; background-color:white;'
        >
            <p>#${id} - ${title}</p> ${description}
        </div>`;
}





export { Home }