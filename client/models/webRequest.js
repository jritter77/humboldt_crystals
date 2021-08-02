function get(endpoint) {
    
        return jQuery.ajax({

            type: "GET",
            url: endpoint,
            dataType: "html"

        })

}


function post(endpoint, params) {

    return jQuery.ajax({

        type: "POST",
        url: endpoint,
        data: {
            req: params
        },
        dataType: "html"

    })

}


function uploadImg(formData) {
    return $.ajax({
        url: './server/upload.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
}


function uploadMulti(formData) {
    return $.ajax({
        url: './server/uploadMultiple.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
}



export {get, post, uploadImg, uploadMulti}