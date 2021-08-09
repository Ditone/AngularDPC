import { Injectable } from "@angular/core";
import { MessageService } from "../messages/message.service";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    currentUser : User | undefined;

    get isLoggedIn() : boolean {
        return !!this.currentUser;
    }

    constructor(private messageService : MessageService){}

    login (userName: string, password: string):void{
        if (!userName || !password){
            this.messageService.addMessage('Please enter a username and password');
            return;
        }
        if (userName === 'admin'){
            this.currentUser = {
                id : 1,
                userName : userName,
                isAdmin: true
            };
            this.messageService.addMessage('Admin Login');
            return;
        }
        this.currentUser = {
            id : 2,
            userName : userName,
            isAdmin : false
        };
        this.messageService.addMessage ('User : ${this.currentUser.userName} logged in');
    }

    logout () : void{
        this.currentUser = null;
    }
}