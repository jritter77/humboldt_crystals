import { Admin } from '../views/admin.js';
import { changePassword } from '../user.js';

async function handleSubmission(e) {
    e.preventDefault();

    // get form information
    const newPass = $('#newPass').val();
    const confPass = $('#confPass').val();

    
    if (newPass === confPass) {
        await changePassword(newPass);
    }

    alert('Password had successfully been changed!');
    Admin();
}



function ChangePassword() {
    $('#app').html(`
    <div class='row'>
        
        <div class='col' >
            <form id='login' class='needs-validation' style='margin:5vw;' novalidate>
                <div class='form-group'>
                    <label for='newPass'>New Password</label>
                    <input type='password' class='form-control' id='newPass' placeholder='Enter New Password'>
                </div>
                <div class='form-group'>
                    <label for='confPass'>Confirm New Password</label>
                    <input type='password' class='form-control' id='confPass' placeholder='Re-enter New Password'>
                </div>
                <button type='submit' class='btn btn-primary'>Submit</button>
            </form>
        </div>
        
    </div>
    `);

    $('#login').on('submit', handleSubmission);
}

export { ChangePassword }