import videoPlayer from "./components/videoPlayer";
import popupFunc from "./components/popupFunc";
import burgerMenu from "./components/burgerMenu";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

if (document.querySelector('section.info .image')){
    let allImages = document.querySelectorAll('section.info .image img');
    let mySiema = new Siema({
        selector: 'section.info .image',
        duration: 700,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: false,
        multipleDrag: true,
        threshold: 20,
        loop: true,
        rtl: false,
        onInit: function(){
            allImages[this.currentSlide].classList.remove('active');
            setTimeout(()=>{
                this.next();
                setTimeout( () => {
                    allImages[this.currentSlide].classList.add('active');
                },500)
            },500);
            setInterval( ()=>{
                allImages[this.currentSlide].classList.remove('active');
                setTimeout(()=>{
                    this.next();
                    setTimeout( () => {
                        allImages[this.currentSlide].classList.add('active');
                    },500)
                },500);
            }, 6500);
        },
        onChange: function () {

        },
    });

}

if (document.querySelector('.reviews .video')){
    document.querySelectorAll('.reviews .video').forEach( elem => {
        new videoPlayer(elem.querySelector('video'), elem.querySelector('.play-btn'))
    })
}
if (document.querySelector('.wrapper .popup')){
    new popupFunc(document.querySelector('.wrapper .popup'), [document.querySelector('header .order'), document.querySelector('section.info .btn')]);
}

new burgerMenu(document.querySelector('header nav'),document.querySelector('header .burger'));

function SmoothVerticalScrolling(e, time, where) {
    let eTop;
    if (iOS){
        eTop = e.offsetTop;
    } else {
        eTop = e.getBoundingClientRect().top;
    }
    window.scrollTo({
        top: eTop - 50,
        behavior: "smooth"
    })
}


document.querySelectorAll('header nav a').forEach( link => {
    link.addEventListener('click', () => {
        SmoothVerticalScrolling(document.querySelector(`${link.dataset.href}`), 1500, 'top')
    })
});