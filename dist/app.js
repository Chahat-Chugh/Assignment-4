import { UserCRUD } from "./UserCRUD.js";
class MainPage {
    constructor() {
        this.Btn = document.querySelector(".btn");
        this.userCRUD = new UserCRUD();
        this.Btn.addEventListener('click', () => this.load());
    }
    load() {
        if (this.Btn.innerHTML == "Load Data") {
            this.userCRUD.create();
            this.Btn.innerHTML = "Refresh";
        }
        else {
            this.userCRUD.refresh();
        }
    }
}
new MainPage();
