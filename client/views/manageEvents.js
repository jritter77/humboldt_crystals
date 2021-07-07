import { addEvent, deleteEvent, editEvent } from '../database.js';
import { Calendar, setEvents, getEventDetail } from '../components/calendar.js';
import { Modal } from "../components/modal.js";
import { verifySession } from "../sessions.js";





function openNewCalendarEvent() {
    const day = this.children[0];

    if (!day.classList.contains('text-muted')) {
        $('#exampleModal').modal('toggle');

        if (day.children.length > 0) {
            const i = day.children[0].id;
            const e = getEventDetail(i);
            $('#newCalendarEventTitle').val(e.title);
            $('#newCalendarEventDesc').val(e.description);
    
            $('#modalSubmit').val(e.id);
    
            $('#modalSubmit').off('click');
            $('#modalSubmit').click(editCalendarEvent);
            $('#deleteEventButton').off('click');
            $('#deleteEventButton').click(() => deleteCalendarEvent(e.id));
        }   
        else {
            $('#newCalendarEventTitle').val('');
            $('#newCalendarEventDesc').val('');
    
            $('#modalSubmit').val(day.id);
        
            $('#modalSubmit').off('click');
            $('#modalSubmit').click(newCalendarEvent);
            $('#deleteEventButton').off('click');
        }
    }
    
}




async function newCalendarEvent(e) {
    e.preventDefault();
    
    const month = $('#month').val();
    const day = this.value;
    const year = $('#year').html();
    
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await addEvent(title, month, day, year, desc);
        setEvents();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newCalendarEventModal').addClass('was-validated');
    }

}





async function editCalendarEvent(e) {
    e.preventDefault();

    const id = this.value;
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await editEvent(id, title, desc);
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

    
    eventCalendar();
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
    `;

export { ManageEvents };