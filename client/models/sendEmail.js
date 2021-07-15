import {post} from './webRequest.js';

async function sendEmail(sub, msg, from) {

    try {
        const result = await post('./server/sendEmail.php', JSON.stringify({
            sub: sub,
            msg: msg,
            from: from
        }));
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }

}

export {sendEmail}