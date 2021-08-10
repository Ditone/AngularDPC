import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TeamDetailsComponent } from './team-details.component'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { TeamListComponent } from './team-list.component';
import { TeamList } from "../models/team-list";

@NgModule({
    imports :[
        RouterModule.forChild([
            { path: 'teams', component : TeamList},
            { path: 'teams/:id', component : TeamDetailsComponent }
        ]),
        CommonModule,
        FormsModule,
        RouterModule,
        MatTableModule
    ],
    declarations:[
        TeamDetailsComponent,
        TeamListComponent
    ]
})
export class TeamModule {}