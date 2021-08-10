import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatchListComponent } from "./match-list.component";
import { MatchDetailsComponent } from './match-details.component'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports :[
        RouterModule.forChild([
            { path: 'matches', component: MatchListComponent },
            { path: 'matches/:id', component : MatchDetailsComponent }
        ]),
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations:[
        MatchListComponent,
        MatchDetailsComponent,
    ]
})
export class MatchModule {}