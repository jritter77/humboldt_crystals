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





export {getAllRecords, addRecord, deleteRecord}