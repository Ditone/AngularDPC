import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';
import { Team } from '../models/team';
import { TeamRetrieval } from '../services/team-retrieval.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  constructor(private teamService : TeamRetrieval, private route : ActivatedRoute) {}
   
   displayedTeam! : Team;
   displayedPlayers : Array<Player> = [];

   getTeam (id : number) : void{
     this.displayedTeam = this.teamService.getTeam(id);
     this.displayedPlayers = this.teamService.getPlayers(this.displayedTeam.name);
   }

  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! == null){
      console.error('ID is null');
    }
    else{
      this.getTeam(+this.route.snapshot.paramMap.get('id')!)
    }
  }
}
