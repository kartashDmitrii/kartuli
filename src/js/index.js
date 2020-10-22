import videoPlayer from "./components/videoPlayer";
import popupFunc from "./components/popupFunc";
import burgerMenu from "./components/burgerMenu";

if (document.querySelector('.reviews .video')){
    document.querySelectorAll('.reviews .video').forEach( elem => {
        new videoPlayer(elem.querySelector('video'), elem.querySelector('.play-btn'))
    })
}
if (document.querySelector('.wrapper .popup')){
    new popupFunc(document.querySelector('.wrapper .popup'), document.querySelector('header .order'));
}

new burgerMenu(document.querySelector('header nav'),document.querySelector('header .burger'));