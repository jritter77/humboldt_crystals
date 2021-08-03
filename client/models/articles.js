import {get, post, uploadImg} from './webRequest.js';


async function getAllRecords() {
    try {
        return JSON.parse(await get('./server/records/getAllRecords.php'));
    }
    catch (err) {
        console.log(err);
    }
}



async function addRecord(title, desc, price, img, tags, opt) {

    try {
        const result = await post('./server/records/addRecord.php', JSON.stringify({
            title: title,
            description: desc,
            price: price,
            img: img,
            opt: opt,
            tags: tags
        }));

        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    

}



async function editRecord(id, title, desc, price, img, tags, opt) {

    try {
        await post('./server/records/editRecord.php', JSON.stringify({
            id: id,
            title: title,
            description: desc,
            price: price,
            img: img,
            opt: opt,
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





export {getAllRecords, addRecord, editRecord, deleteRecord}