

function Carousel(articles) {

    const imgWidth = '100%';
    const imgHeight = (window.innerWidth > 768) ? '30vw' : '40vw';

    function fillImages() {
        let html = "";

        let slides = 1;

        // limits slides if not enough articles present
        if (articles.length >= 6) {
            slides = 2;
        }
        else if (articles.length >= 9) {
            slides = 3;
        }



        for (let slide=0; slide<slides; slide++) {
            
            html += (slide===0) ? '<div class="carousel-item active">' : '<div class="carousel-item">';

            html += `
                <div class='row no-gutters'>
                    <div class='col'><img style="width:${imgWidth};height:${imgHeight};" src=${articles[articles.length-(1+3*slide)].img}></div>
                    <div class='col'><img style="width:${imgWidth};height:${imgHeight};" src=${articles[articles.length-(2+3*slide)].img}></div>
                    ${(window.innerWidth > 768) ? `<div class='col'><img style="width:${imgWidth};height:${imgHeight};" src=${articles[articles.length-(3+3*slide)].img}></div>` : ''}
                </div>    
            </div>`

        }

        return html;

    }

    return `
            <div id="carouselIndicators" class="carousel slide" data-ride="carousel" style='width:90%;height:${imgHeight};margin-left:5%;'>
                
                <div class="carousel-inner" >
                    ${fillImages()}
                </div>
                <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
    `
}

export { Carousel }