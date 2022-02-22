import { User } from "./User.js";
import data from "./data.json" assert { type: "json" };
import { Role } from "./Role.js";
export class UserCRUD {
    constructor() {
        this.users = [];
        this.col = [];
        this.tableContainer = document.querySelector('.table');
        this.initialize();
        this.tableEle = document.createElement("table");
    }
    initialize() {
        for (let key in data[0]) {
            if (this.col.indexOf(key) < 0) {
                this.col.push(key);
            }
        }
        data.forEach(ob => {
            this.users.push(new User(ob["First Name"], ob["Middle Name"], ob["Last Name"], ob.Email, ob.Phone, ob.Role, ob.Address));
        });
    }
    create() {
        this.tableEle = document.createElement("table");
        let tr = this.tableEle.insertRow(-1);
        for (let i = 0; i < this.col.length; i++) {
            let th = tr.insertCell(i);
            th.innerHTML = this.col[i];
        }
        for (let i = 0; i < this.users.length; i++) {
            tr = document.createElement("tr");
            let editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.addEventListener('click', () => this.update(this.users[i]));
            editBtn.classList.add("edit");
            let deleteBtn = document.createElement("button");
            deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.addEventListener('click', (e) => this.delete(e));
            deleteBtn.classList.add("dlt");
            tr.innerHTML = `<td>${this.users[i].firstName}</td>
                        <td>${this.users[i].middleName}</td>
                        <td>${this.users[i].lastName}</td>
                        <td>${this.users[i].email}</td>
                        <td>${this.users[i].phone_no}</td>
                        <td>${this.users[i].role}</td>
                        <td>${this.users[i].address}</td>
                        `;
            tr.append(editBtn);
            tr.append(deleteBtn);
            this.tableEle.append(tr);
            this.read();
        }
    }
    read() {
        this.tableContainer.innerHTML = "";
        this.tableContainer.append(this.tableEle);
    }
    update(user) {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i + 1];
        let editbtn = tr.children[7];
        let dltbtn = tr.children[8];
        if (editbtn.innerHTML === "Edit") {
            tr.contentEditable = "true";
            editbtn.innerHTML = "Save";
            dltbtn.innerHTML = "Cancel";
            editbtn.contentEditable = "false";
            dltbtn.contentEditable = "false";
            let select = document.createElement("select");
            select.classList.add("select");
            for (const i in Role) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                if (tr.children[5].textContent === i) {
                    option.selected = true;
                }
                else
                    option.selected = false;
                select.appendChild(option);
            }
            tr.children[5].replaceWith(select);
        }
        else {
            tr.contentEditable = "false";
            editbtn.innerHTML = "Edit";
            dltbtn.innerHTML = "Delete";
            user.firstName = tr.children[0].textContent;
            user.middleName = tr.children[1].textContent;
            user.lastName = tr.children[2].textContent;
            user.email = tr.children[3].textContent;
            user.phone_no = tr.children[4].textContent;
            user.address = tr.children[6].textContent;
            for (let i = 0; i <= 2; i++) {
                let s = tr.children[5].children[i];
                if (s.selected) {
                    user.role = s.textContent;
                }
            }
            let td = document.createElement("td");
            tr.children[5].replaceWith(td);
            tr.children[5].innerHTML = user.role;
        }
    }
    cancel(user) {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i + 1];
        let editbtn = tr.children[7];
        let dltbtn = tr.children[8];
        tr.contentEditable = "false";
        dltbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        this.create();
    }
    delete(e) {
        let targetBtn = e.target;
        let tr = targetBtn.parentElement;
        let index = tr.rowIndex;
        if (targetBtn.innerHTML === "Delete") {
            tr.remove();
            this.users.splice(index - 1, 1);
            this.create();
        }
        else {
            this.cancel(this.users[index - 1]);
        }
    }
    refresh() {
        this.users = [];
        this.initialize();
        this.create();
    }
}
