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




function Ordering() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <div class="row">
        <div class="col-md text-center rounded" style="margin:5vw;border: 2px solid purple; padding: 2vw;">
            <h3>Ordering Instructions</h3>
            <p>Please navigate to the desired item and submit 
                a request form from the details page of the item.
                Shortly after submitting the request form you will recieve a
                Paypal invoice for the desired item. Once payment has been confirmed
                your item will be shipped to your address. (Currently not shipping outside of the 
                Continental United States.)</p>
            <h3>Special Orders</h3>
            <p>I take speial orders. Want a different color, different shaped crystal, or a different
                style? No problem, special orders are welcomed! Please send me a message with the Item's title,
                number, and desired modifactions.</p>
        </div>

        <div class="col-md rounded" style="margin:5vw;border: 2px solid purple; padding: 2vw;">
        
        <h3 class="text-center">Send a Message</h3>
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

export {Ordering}