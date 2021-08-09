import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MatchListComponent } from './match-list.component/match-list.component';
import { PlayerListComponent } from './player-list/player-list.component';
//import { PlayerDetailsComponent } from './player-list/player-details.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { MessageModule } from './messages/message.module';

@NgModule({
  declarations: [
    AppComponent,
    MatchListComponent,
    PlayerListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component:HomePageComponent },
      { path: 'matches', component:MatchListComponent },
      { path: 'players', component:PlayerListComponent },
      //{ path: 'players/id', component:PlayerDetailsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
