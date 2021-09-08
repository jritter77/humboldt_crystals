function Article({id, title, img, description, price, tags}, index) {

    // Delete button component
    const deleteButton = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            return `
            <div class='col'>
                <button class='btn btn-danger deleteArticleButton' value='${id}'>X</button>
            </div>
            `
        }
        
        return '';
    }


    const editButton = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            return `
            <div class='col'>
                <button class='btn btn-primary editArticleButton' data-toggle="modal" data-target="#exampleModal" value='${index}'>Edit</button>
            </div>
            `
        }
        
        return '';
    }


    // Return the HTML of the Article component
    return (`
    <div style="margin-top:5vw;" class='col-sm-6 col-md-4'>
        <h4>${title}</h4>
        <a href="#details-${id}"><img style="min-width:200px;min-height:200px;width:20vw;height:20vw;" class='img-thumbnail' src=${img.toLowerCase()} alt='img not found...'/><a>
        <p>${description}</p>
        <p><b>Number:</b> ${id}</p>
        <p><b>Tags:</b> ${(tags) ? (tags) : ""}</p>
        <div class='row'>
            <div class='col'>
                <p><b>Price: </b>$${price}</p>
            </div>
            ${editButton()}
            ${deleteButton()}
        </div>
    </div>
    `);
}



export {Article}