import { post } from "./webRequest.js";


async function changePassword(newPass) {

    try {
        const result = await post('./server/user/changePassword.php', JSON.stringify({
            newPass: newPass
        }));
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    

}


export { changePassword }