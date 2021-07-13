
import {post} from '../webRequest.js';

async function sendEmail(sub, msg, from) {

    try {
        await post('./server/sendEmail.php', JSON.stringify({
            sub: sub,
            msg: msg,
            from: from
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function sendMessage(e) {
    e.preventDefault();

    const sub = $('#subject').val();
    const msg = $('#message').val();
    const email = $('#email').val();

    if (sub && msg && email) {
        await sendEmail(sub, msg, email);
        if ($('.alert').length < 1) {
            $('#app').prepend(`<div class='alert alert-success' role='alert'>Message sent successfully!</div>`);
        }

        document.getElementById('sendMessage').reset();
    }
    else {
        $('#sendMessage').addClass('was-validated');
    }
}




function Contact() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <div class="row">
        <div class="col">
        
        <form id='sendMessage' class='needs-validation' novalidate>
            <div class='form-group'>
                <label for='subject'>Subject</label>
                <input type='text' class='form-control' id='subject' required>
                <div class='invalid-feedback'>
                    Please enter a subject line.
                </div>
            </div>
            <div class='form-group'>
                <label for='message'>Message</label>
                <textarea class='form-control' id='message' rows='3' required></textarea>
                <div class='invalid-feedback'>
                    Please enter a message.
                </div>
            </div>
            <div class='form-group'>
                <label for='email'>Email</label>
                <input type='text' class='form-control' id='email' required>
                <div class='invalid-feedback'>
                    Please enter a valid email address.
                </div>
            </div>
            <button type='submit' class='btn btn-primary'>Submit</button>
        </form> 

        </div>
        
    </div>
    `;


    $('#sendMessage').on('submit', sendMessage);
}

export {Contact}