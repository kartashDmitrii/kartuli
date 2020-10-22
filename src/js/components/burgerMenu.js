export default class BurgerMenu{
    constructor(popup, burger) {
        this.burger = burger;
        this.popup = popup;
        let thisOpenPopup = this.openPopup.bind(this);
        let thisClosePopup = this.closePopup.bind(this);
        this.burger.addEventListener('click', thisOpenPopup);
        this.popup.querySelector('.close').addEventListener('click', thisClosePopup)
    }
    openPopup(){
        this.popup.classList.add('open')
    }
    closePopup(){
        this.popup.classList.remove('open')
    }
}