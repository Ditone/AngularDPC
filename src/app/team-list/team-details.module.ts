import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TeamDetailsComponent } from './team-details.component';
import { TeamListComponent } from './team-list.component';


@NgModule({
  imports :[
    RouterModule.forChild([
      { path: 'teams', component : TeamListComponent},
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