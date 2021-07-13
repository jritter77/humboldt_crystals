import {sendEmail} from '../models/sendEmail.js';



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
        <div class="col-md text-center rounded" style="margin:5vw;border: 2px solid purple; padding: 2vw;">
            <ul class='list-group text-left'>
                <li class='list-group-item'><b>Phone:</b> (707)-502-4546</li>
                <li class='list-group-item'><b>Email:</b> humboldtcrystals@gmail.com</li>
                <li class='list-group-item'><b>Facebook:</b> <a href="https://www.facebook.com/HumboldtCrystals/">facebook.com/HumboldtCrystals/</a></li>
            </ul>
            <img src='./images/dragonfly.jpg' style='width:128px;margin-top:5vw;'>
        </div>

        <div class="col-md rounded" style="margin:5vw;border: 2px solid purple; padding: 2vw;">
        
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