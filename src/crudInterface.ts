import {User} from "./User.js";

export interface CRUD<T>
{
    create() : void;
    read() : void;
    update(ob:T) : void;
    delete(e:Event) : void;
    cancel(ob:T) : void;

}