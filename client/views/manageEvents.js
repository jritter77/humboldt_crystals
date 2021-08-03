import { addEvent, deleteEvent, editEvent } from '../models/events.js';
import { Calendar, setEvents, getEventDetail } from '../components/calendar.js';
import { Modal } from "../components/modal.js";
import { verifySession } from "../models/sessions.js";
import { uploadImg } from "../models/webRequest.js";





function openNewCalendarEvent() {
    const day = this.children[0];

    if (!day.classList.contains('text-muted')) {
        $('#exampleModal').modal('toggle');

        if (day.children.length > 0) {
            const i = day.children[0].id;
            const e = getEventDetail(i);
            const images = (e.images) ? (e.images).split(' ') : [];
            $('#newCalendarEventTitle').val(e.title);
            $('#newCalendarEventDesc').val(e.description);
    
            $('#modalSubmit').val(e.id);

            $('#uploadResult').html('');

            // Clear any previous uploaded images from modal
            $('#uploadedImages').html('');
            
            // Show all optional images
            for (let image of images) {
                $(uploadedImage(image.split('/').pop())).appendTo('#uploadedImages').click(removeImage);
            }

            $('#modalSubmit').off('click');
            $('#modalSubmit').click(editCalendarEvent);
            $('#deleteEventButton').off('click');
            $('#deleteEventButton').click(() => deleteCalendarEvent(e.id));
        }   
        else {
            $('#newCalendarEventTitle').val('');
            $('#newCalendarEventDesc').val('');
    
            $('#modalSubmit').val(day.id);

            $('#uploadResult').html('');
            $('#uploadedImages').html('');
        
            $('#modalSubmit').off('click');
            $('#modalSubmit').click(newCalendarEvent);
            $('#deleteEventButton').off('click');
        }
    }
    
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



async function newCalendarEvent(e) {
    e.preventDefault();
    
    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText);
    });


    const month = $('#month').val();
    const day = this.value;
    const year = $('#year').html();
    
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await addEvent(title, month, day, year, desc, images.join(' '));
        setEvents();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newCalendarEventModal').addClass('was-validated');
    }

}





async function editCalendarEvent(e) {
    e.preventDefault();

    let images = [];
    $('.uploadedImage').each((i, image) => {
        images.push('./images/' + image.innerText);
    })

    const id = this.value;
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await editEvent(id, title, desc, images.join(' '));
        setEvents();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newCalendarEventModal').addClass('was-validated');
    }
}


async function deleteCalendarEvent(id) {
    await deleteEvent(id);
    setEvents();
    $('#exampleModal').modal('hide');
}


function eventCalendar() {
    Calendar('calendar');
    $('.dayContainer').click(openNewCalendarEvent);
    $('.modal-footer').prepend('<button id="deleteEventButton" class="btn btn-danger">Delete</button>');
}



async function ManageEvents() {

    $('#app').html('<div class="row text-center" id="calendar" style="margin: 10vw;margin-top: 1vw"></div>');

    await verifySession();

    // create Modal for newCalendarEvent
    Modal('New Event', newCalendarEventModal, newCalendarEvent);

    $('#fileToUpload').on('change', handleUpload);
    
    eventCalendar();
}




const uploadedImage = (filename) => {

    return `
        <div class='row' id='${filename}'>
            <button class='btn btn-danger removeImage col-1' value='${filename}'>X</button>   
            <p class='uploadedImage col'>${filename}</p>
        </div>
    `
}



const newCalendarEventModal = `
    <form id='newCalendarEventModal' class='needs-validation' novalidate>
        <div class='form-group'>
            <label for='newCalendarEventTitle'>Title</label>
            <input type='text' class='form-control' id='newCalendarEventTitle' placeholder='Title' required>
            <div class='invalid-feedback'>
                Please enter a title.
            </div>
        </div>
        <div class='form-group'>
            <label for='newCalendarEventDesc'>Description</label>
            <textarea class='form-control' id='newCalendarEventDesc' rows='3' placeholder='Description of Post.' required></textarea>
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

export { ManageEvents };