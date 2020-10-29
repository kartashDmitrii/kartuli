export default class BurgerMenu{
    constructor(popup, burger) {
        this.burger = burger;
        this.popup = popup;
        let thisOpenPopup = this.openPopup.bind(this);
        let thisClosePopup = this.closePopup.bind(this);
        this.burger.addEventListener('click', thisOpenPopup);
        this.popup.querySelector('.close').addEventListener('click', thisClosePopup);
        document.querySelector('header .order.close').addEventListener('click', thisClosePopup);
        this.popup.querySelectorAll('a').forEach( elem => elem.addEventListener('click', thisClosePopup))
    }
    openPopup(){
        this.popup.classList.add('open');
        document.querySelector('.user-panel').classList.add('active')
    }
    closePopup(){
        this.popup.classList.remove('open');
        document.querySelector('.user-panel').classList.remove('active')
    }
}