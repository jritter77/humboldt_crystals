
function NavBar() {

const admin = (sessionStorage.getItem('token')) ? `<div class='col'><a style='color:white;' href="#admin">Admin</a></div>` : '';

return `<nav class="navbar navbar-dark bg-dark" id="nav">
    <div class="container-fluid">
        <div class='row'>
            <div class='col'>
                <div class="navbar-header">
                    <a class="navbar-brand" href="#home">Website Template</a>
                </div>
            </div>
        </div>
        <div class='row'>
            ${admin}
            <div class='col'><a style='color:white;' href="#catalog">Catalog</a></div>
            <div class='col'><a style='color:white;' href="#about">About</a></div>
            <div class='col'><a style='color:white;' href="#contact">Contact</a></div>
        </div>
    </div>
</nav>`;
}

export {NavBar}