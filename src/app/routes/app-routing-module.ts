import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { PageNotFoundComponent } from '../page-not-found.component';

@NgModule({
  imports :[
    RouterModule.forRoot([
      { path: 'home', component:HomePageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component:PageNotFoundComponent }
    ])
  ],
  exports : [RouterModule]
})
export class AppRoutingModule{}