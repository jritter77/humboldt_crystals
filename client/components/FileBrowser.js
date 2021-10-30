import { uploadImg, uploadMulti } from "../models/webRequest";

class FileBrowser {
    constructor() {
        this.form = $('<form></form>');
        this.input = $('<input type="file" name="fileToUpload[]" multiple>');

        this.form.append(this.input);

    }

    async handleUpload() {
        const img = new FormData(this.form[0]);
        await uploadMulti(img);
        return this.input[0].files;
    }

    clear() {
        this.input[0].value = null;
    }


}

export {FileBrowser}