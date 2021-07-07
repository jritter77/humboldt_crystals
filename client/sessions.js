import {get, post} from './webRequest.js';


// starts a session for the user if the given credentials are valid
async function startSession(user, pass) {
    let token = await post('./server/user/login.php', JSON.stringify({user: user, pass: pass}));

    if (token){
        sessionStorage.setItem('token', token);
        return true;
    } 

    return false;
}



// verify session, clear session if false
async function verifySession() {
    let token = sessionStorage.getItem('token');

    if (token) {

        try {
            let tokenObj = JSON.parse(token);
            if (tokenObj.session) {
                const verify = await post('./server/user/verifySession.php', token);
                if (verify) {
                    sessionStorage.setItem('token', verify);
                    return true;
                }
            }

        }
        catch {
            sessionStorage.clear();
            return false;
        }

        sessionStorage.clear();
        return false;
    }
    
}


export {startSession, verifySession};