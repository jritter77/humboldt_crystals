import { Login } from "../components/login.js";
import { ChangePassword } from "../components/changePassword.js";
import { verifySession } from "../sessions.js";
import { NavBar } from '../components/navbar.js';


function logout() {
    sessionStorage.clear();
    $('#header').html(NavBar());
}


async function Admin() {
    const app = document.getElementById('app');


    if (!(await verifySession())) {
        Login();
    }
    else {
        $('#header').html(NavBar());
        app.innerHTML = `
            <div class="row">
                ${ContentTools()}
                ${SiteManagement()}
            </div>
            <div class='row'>
                ${SiteStatistics()}
            </div>
            `;
    }

    $('#logout').click(logout);
    $('#changePassword').click(ChangePassword);
}





const ContentTools = () => `
    <div 
    class="col  border border-primary rounded" 
    style="margin:5vw; padding-top:2vw;"
    >
        <h2 class='text-center'>Content Tools</h2>
        <ul style='margin:2vw;'>
            <li><a href='#catalog'>Manage Articles</a></li>
            <li><a href='#manageposts'>Manage News Post</a></li>
            <li><a href='#manageevents'>Manage Events</a></li>
        </ul>
        
    </div>
`;


const SiteManagement = () => `
    <div 
    class="col  border border-primary rounded" 
    style="margin:5vw; padding-top:2vw;"
    >
        <h2 class='text-center'>Site Management</h2>
        <ul style='margin:2vw;'>
            <li><a id='changePassword' href='#admin'>Change Password</a></li>
            <li><a id='logout' href='#home'>Logout</a></li>
            <li><a href='#'>Testing</a></li>
        </ul>
        
    </div>
`;


const SiteStatistics = () => `
    <div 
    class="col  border border-primary rounded" 
    style="margin:5vw; padding-top:2vw;"
    >
        <h2 class='text-center'>Site Statistics</h2>
        <div class='row'>
            <div class='col'><p>Site Status: OK</p></div>
            <div class='col'><p>Traffic This Month: xxxx</p></div>
            <div class='col'><p>Uptime: xx:xx:xx</p></div>
        </div>
        
    </div>
`;


export { Admin }