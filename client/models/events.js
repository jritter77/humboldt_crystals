import {get, post} from './webRequest.js';


async function getAllEvents() {
    try {
        return JSON.parse(await get('./server/events/getAllEvents.php'));
    }
    catch (err) {
        console.log(err);
    }
}



async function getMonthEvents(month, year) {
    try {
        return  JSON.parse(await post('./server/events/getMonthEvents.php', JSON.stringify({
            month: month,
            year: year
        })));
    }
    catch (err) {
        console.log(err);
    }
}



async function addEvent(title, month, day, year, desc) {

    try {
        await post('./server/events/addEvent.php', JSON.stringify({
            title: title,
            month: month,
            day: day,
            year: year,
            description: desc
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function editEvent(id, title, desc) {

    try {
        await post('./server/events/editEvent.php', JSON.stringify({
            id: id,
            title: title,
            description: desc
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}



async function deleteEvent(id) {
    try {
        return await post('./server/events/deleteEvent.php', JSON.stringify({
            id: id
        }));

    }
    catch (err) {
        console.log(err);
    }

    
}

export {getAllEvents, addEvent, deleteEvent, editEvent, getMonthEvents}