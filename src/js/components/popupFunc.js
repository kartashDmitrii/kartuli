export default class popupFunc {
    constructor(popup, button) {
        this.button = button;
        this.popup = popup;
        this.openPopupFunc = this.openPopup.bind(this);
        this.closePopupFunc = this.closePopup.bind(this);
        if ( Array.isArray(this.button)){
            this.button.forEach( elem => {
                elem.addEventListener('click', this.openPopupFunc);
            })
        } else {
            this.button.addEventListener('click', this.openPopupFunc);
        }
        this.popup.querySelector('.close').addEventListener('click', this.closePopupFunc);
        this.popup.parentNode.addEventListener('click', this.closePopupFunc);
    }
    openPopup(event){
        event.preventDefault();
        this.popup.classList.add('open');
        this.popup.parentNode.classList.add('open');
    }
    closePopup(event){
        if (!event.target.classList.contains('close') && event.target.closest('.popup') !== null){
            event.stopPropagation();
        } else {
            this.popup.classList.remove('open');
            this.popup.parentNode.classList.remove('open');
        }
    }
}