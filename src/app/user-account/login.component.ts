import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    errorMessage : string = '';
    pageTitle = 'Log In';

    constructor (private loginService : LoginService, private router : Router) {}

    login (loginForm : NgForm){
        if (loginForm && loginForm.valid){
                const userName = loginForm.form.value.userName;
                const password = loginForm.form.value.password;
                this.loginService.login (userName, password);

                // Navigate back to the matches page after loggin in
                this.router.navigate(['/matches']);
        } else{
            this.errorMessage = 'Please enter a username and password';
        }
    }

}