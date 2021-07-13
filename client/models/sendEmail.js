import {post} from './webRequest.js';

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

export {sendEmail}