

function Carousel(articles) {

    console.log(articles);

    return `
            <div id="carouselIndicators" class="carousel slide" data-ride="carousel" style='width:70%;height:30vw;margin-left:15%;'>
                <ol class="carousel-indicators">
                    <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" >
                    <div class="carousel-item active">
                        <div class='row no-gutters'>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[0].img}></div>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[1].img}></div>
                        </div>    
                    </div>
                    <div class="carousel-item">
                        <div class='row no-gutters'>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[2].img}></div>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[3].img}></div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class='row no-gutters'>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[1].img}></div>
                            <div class='col'><img style="width:100%;height:30vw;" src=${articles[3].img}></div>
                        </div>
                    </div>
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