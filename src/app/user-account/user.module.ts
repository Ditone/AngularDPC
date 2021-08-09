import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginService } from "../services/login.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'login', component : LoginService }
        ])
    ],
    declarations: [
        LoginService
    ]
})
export class UserModule {}