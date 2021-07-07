function newsPost({ id, date, title, description }, index) {
    if (description.length > 30) {
        description = description.substring(0, 30) + '...';
    }

    return `
    <div class='row no-gutters text-center'>
        <div class='col'>
            <div class='row no-gutters'>
                <div class='col' ><button class='btn btn-danger deletePostButton' value='${id}'>X</button></div>
                <div class='col' data-toggle='modal' data-target="#exampleModal"><button class='btn btn-primary editPostButton' value='${index}'>Edit</button></div>
            </div>
        </div>
        <div class='col'>
            <p>${id}</p>
        </div>
        <div class='col'>
            <p>${date}</p>
        </div>
        <div class='col'>
            <p>${title}</p>
        </div>
        <div class='col-4'>
            <p>${description}</p>
        </div>
    </div>
    <hr>
    `
}


export { newsPost }