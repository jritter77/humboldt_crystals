function About() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <div class="row" style='margin-top:5vw;'>
        <div class="col-md">
            <img src=./images/aboutPic1.jpg style='width:100%;'>
            <img src=./images/aboutPic2.jpg style='width:100%;margin-top:2vw;'>
        </div>
        <div class="col-md-6">
            <p>Humboldt Crystals is located in Eureka along the Pacific coast nestled among the majestic redwood trees. My business evolved over time.</p> 
            <p>I began working with beautiful beads and sparkling crystals making suncatchers as a way to relieve stress and bring positive creative energy into my life when I was caring for my mother who suffered with Alzheimer's.</p>
            <p>As time went on I realized I needed to find homes for the many bright, cheerful suncatchers I was making. So I plunged into world of local events and festivals. Its been great fun.</p>
            <p>Six years later I have a thriving business and have traveled to other states to participate in festivals.</p>
            <p>I enjoy the challenge of finding new and unique shaped crystals to incorporate into my one of a kind designs. I hand build all my pieces, with carefully chosen glass beads, quality crystals and often incorporate Pacific Coast driftwood, abalone shells or handsome metal pendants. I am committed to creating quality suncatchers, car charms and earrings along with great customer service.</p>
            <p>I take great pride in each of my creations and get pleasure from seeing the joy they bring to others.</p>
        </div>
        <div class="col-md">
            <img src=./images/aboutPic3.jpg style='width:100%;'>
            <img src=./images/aboutPic4.jpg style='width:100%;margin-top:2vw;'>
        </div>
    </div>
    <div class='row' style='height:10vw'>
    </div>
    `;
}

export {About}