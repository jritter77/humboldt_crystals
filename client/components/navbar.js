
function NavBar() {

const admin = (sessionStorage.getItem('token')) ? `<div class='col'><b><a style='color:white;' href="#admin">Admin</a></b></div>` : '';

return `<nav class="navbar navbar-dark" id="nav" style="background: rgb(87,14,140);background: linear-gradient(45deg, rgba(87,14,140,1) 0%, rgba(255,0,220,1) 100%);">
    <div class="container-fluid">
        <div class='row'>
            <div class='col'>
                <div class="navbar-header">
                    <a href='#home'><img src="./images/logo.png"  class="navbar-brand" href="#home"></a>
                    
                </div>
            </div>
        </div>
        <div class='row'>
            ${admin}
            <div class='col'><b><a style='color:white;' href="#catalog">Catalog</a></b></div>
            <div class='col'><b><a style='color:white;' href="#about">About</a></b></div>
            <div class='col'><b><a style='color:white;' href="#ordering">Ordering</a></b></div>
        </div>
    </div>
</nav>`;
}

export {NavBar}