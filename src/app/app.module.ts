import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './routes/app-routing-module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found.component';
import { MessageModule } from './messages/message.module';
import { PlayerModule } from './player-list/player.module';
import { MatchModule } from './match-list/match.module';
import { HomePageComponent } from './home-page/home-page.component';

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
    MatchModule,
    PlayerModule,
    MessageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
