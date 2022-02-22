import {UserCRUD} from "./UserCRUD.js";
import {ImainButtons} from "./mainButtonsInterface";

class MainPage implements ImainButtons{

    Btn: HTMLButtonElement;
    userCRUD: UserCRUD;
    constructor()
    {
        this.Btn = document.querySelector(".btn")!;
        this.userCRUD = new UserCRUD();
        this.Btn.addEventListener('click',() => this.load());
    }

    load()
    {
        if(this.Btn.innerHTML == "Load Data")
        {
            this.userCRUD.create();
            this.Btn.innerHTML = "Refresh";
        }
        else{
            this.userCRUD.refresh();
        }       
    }

}

new MainPage();