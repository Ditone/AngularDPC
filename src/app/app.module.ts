import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing-module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';

import { PageNotFoundComponent } from './page-not-found.component';
//import { MessageModule } from './messages - unusued/message.module';
import { PlayerModule } from './player-list/player.module';
import { MatchModule } from './match-list/match.module';
import { HomePageComponent } from './home-page/home-page.component';
import { TeamModule } from './team-list/team-details.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatchModule,
    PlayerModule,
    TeamModule,
    //MessageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
