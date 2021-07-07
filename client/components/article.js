function Article({id, title, img, description, price, tags}) {

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


    // Return the HTML of the Article component
    return (`
    <div style="margin:2rem;" class='col-sm-6 col-md-3'>
        <h4>${title}</h4>
        <a href="#details-${id}"><img style="width:150px;height:150px;" class='img-thumbnail' src=${img} alt='img not found...'/><a>
        <p>${description}</p>
        <p>Tags: <b>${(tags) ? (tags) : ""}</b></p>
        <div class='row'>
            <div class='col'>
                <p>$${price}</p>
            </div>
            ${deleteButton()}
        </div>
    </div>
    `);
}



export {Article}