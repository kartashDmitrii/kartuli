 export default class videoPlayer {
    constructor(video, button) {
        this.video = video;
        this.button = button;
        this.button.addEventListener('click', () => {
            this.playVideo()
        });
    }
    playVideo() {
        if (!this.video.parentNode.classList.contains('active')) {
            this.video.controls = true;
            this.video.play();
            this.video.parentNode.classList.add('active')
        } else {
            this.video.controls = false;
            this.video.pause();
            this.button.parentNode.classList.remove('active')
        }
    }
}
