import {Article} from "../components/article.js";
import {get, post} from "../webRequest.js";


async function Details() {
    const app = document.getElementById('app');

    const loc = location.hash.substr(1);
    const articleId = loc.split("-")[1];

    const article = JSON.parse(await post('./server/getRecord.php', JSON.stringify({id: articleId})));

    app.innerHTML = `
    <div class="row">
        <div class="col">This is the Details Page! Current article: ${article[0].title}</div>
        ${Article(article[0])}
    </div>
    `;
}

export {Details}