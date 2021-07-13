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
    $.ajax({
        url: './server/upload.php',
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return formData.get('fileToUpload').name;
}



export {get, post, uploadImg}