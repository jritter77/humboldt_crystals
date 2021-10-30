import { post } from "./webRequest";

// Downloads a single image to the server with given filename 
async function downloadImg(filename, url) {
    return await post('./server/downloadPhoto.php', JSON.stringify({
      url: url,
      save_as: filename
    }));
}
 

// Downloads multiple images to server, accepts an array of URLs
function downloadMultipleImgs(imgArr, prefix='img') {
    let i = 0;
    for (let url of imgArr) {
      downloadImg(`${prefix}_${i}`, url);
      i++;
    } 
}


function deleteImg(filename) {
  return post('./server/removeImage.php', JSON.stringify({filename: filename}));  
}


export {downloadImg, downloadMultipleImgs, deleteImg}