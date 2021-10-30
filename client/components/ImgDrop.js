import { deleteImg, downloadImg } from "../models/imageHandling.js";
import { uploadMulti } from "../models/webRequest.js";
import { FileBrowser } from "./FileBrowser.js";

class ImgDrop {
    constructor() {

        this.uploaded = [];

        this.html = $('<div></div>');

        this.dropzone = $(`
        <div class='border border-primary rounded' id='dropzone' style='height: 200px; padding:25px;'>
            <b>
                Drag one or more images here!
                <br>
                <br>
                <br>
                Or browse with button below...
            </b>
        </div>
        `);

        this.html.append(this.dropzone);

        this.dropzone[0].ondrop = async (e) => await this.dropHandler(e);
        this.dropzone.on('dragover', this.dragHandler);

        this.fileBrowser = new FileBrowser();
        this.fileBrowser.input.on('change', () => this.browserUploadHandler())
        this.html.append(this.fileBrowser.form);

        this.uploadDisplay = $('<div style="margin-top:16px"></div>');
        this.html.append(this.uploadDisplay);

    }

    // Handles files once dropped in space
    async dropHandler(e) {
        e.preventDefault();

        // Create new form data to carry files
        const files = new FormData();

        // Check for items
        if (e.dataTransfer.items) {

            e.dataTransfer.items[0];

            for (let i=0; i<e.dataTransfer.items.length; i++) {

                console.log(e.dataTransfer.items.length);

                // if the item is a file, append it to the form
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();

                    if (!this.uploaded.includes(file.name)) {
                        files.append('fileToUpload[]', file);
                        this.uploaded.push('./images/' + file.name);
                    }
                    
                }

                // of item is url, download from url
                else if (e.dataTransfer.items[i].kind === 'string') {
                    e.dataTransfer.items[0].getAsString(async url => {
                        const filename = url.substr(url.lastIndexOf('/')+1).replace(/[^a-zA-Z]/g, "") + '.jpg';
                        console.log(filename);
                        const result = await downloadImg(filename, url);
                        this.uploaded.push('./images/' + filename);
                        this.showUploaded();
                    });
                    break;
                }
            }
        }
        
        await uploadMulti(files);
        this.showUploaded();
        this.removeDragData(e);
    }


    dragHandler(e) {
        e.preventDefault();
    }


    removeDragData(ev) {
        if (ev.dataTransfer.items) {
        ev.dataTransfer.items.clear();
        } else {
        ev.dataTransfer.clearData();
        }
    }

    showUploaded() {
        this.uploadDisplay.html('');

        for (let img of this.uploaded) {
            const thumbnail = $(`<img class="img-thumbnail" style="width:128px;height:128px;" src=${img}>`);
            thumbnail.click((e) => this.removeImage(e));
            this.uploadDisplay.append(thumbnail);
        }
    }

    async removeImage(e) {
        const filename = e.target.src.substr(e.target.src.lastIndexOf('/') + 1);
        await deleteImg(filename);
        this.uploaded.splice(this.uploaded.indexOf(filename), 1);
        this.showUploaded();
    }

    async browserUploadHandler() {
        const imgs = await this.fileBrowser.handleUpload();

        for (let img of imgs) {
            if (!this.uploaded.includes('./images/' + img.name)) {
                this.uploaded.push('./images/' + img.name);
            }
        }
        
        this.showUploaded();
    }

}

export {ImgDrop}