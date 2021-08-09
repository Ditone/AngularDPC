import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'DotACollector';

  constructor (private loginService : LoginService, private router : Router) {}

  get isLoggedIn() : boolean{
    return this.loginService.isLoggedIn;
  }

  get userName(): string{
    if (this.loginService.currentUser){
      return this.loginService.currentUser.userName;
    }
    return ' ';
  }

  logout() : void{
    this.loginService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
