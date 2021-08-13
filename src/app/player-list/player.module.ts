import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlayerDetailsComponent } from './player-details.component';
import { PlayerListComponent } from './player-list.component';

@NgModule({
  imports :[
    RouterModule.forChild([
      { path: 'players', component: PlayerListComponent },
      { path: 'players/:id', component : PlayerDetailsComponent}
    ]),
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations:[
    PlayerListComponent,
    PlayerDetailsComponent
  ]
})
export class PlayerModule {}