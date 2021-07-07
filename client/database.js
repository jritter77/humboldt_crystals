import {get, post, uploadImg} from './webRequest.js';


async function getAllRecords() {
    try {
        return JSON.parse(await get('./server/records/getAllRecords.php'));
    }
    catch (err) {
        console.log(err);
    }
}



async function addRecord(title, desc, price, img, tags) {

    try {
        const imgPath = './images/' + await uploadImg(img);
        await post('./server/records/addRecord.php', JSON.stringify({
            title: title,
            description: desc,
            price: price,
            img: imgPath,
            tags: tags
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function deleteRecord(id) {
    try {
        await post('./server/records/deleteRecord.php', JSON.stringify({
            id: id
        }));
    }
    catch (err) {
        console.log(err);
    }
}




async function getAllPosts() {
    try {
        return JSON.parse(await get('./server/posts/getAllPosts.php'));
    }
    catch (err) {
        console.log(err);
    }
}



async function addNewsPost(date, title, desc) {

    try {
        await post('./server/posts/addPost.php', JSON.stringify({
            date: date,
            title: title,
            description: desc
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function editNewsPost(id, title, desc) {

    try {
        await post('./server/posts/editPost.php', JSON.stringify({
            id: id,
            title: title,
            description: desc
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}



async function deleteNewsPost(id) {
    try {
        return await post('./server/posts/deletePost.php', JSON.stringify({
            id: id
        }));

    }
    catch (err) {
        console.log(err);
    }

    
}



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





export {addRecord, deleteRecord, getAllRecords, 
        getAllPosts, addNewsPost, deleteNewsPost, editNewsPost,
        getAllEvents, getMonthEvents, addEvent, deleteEvent, editEvent};