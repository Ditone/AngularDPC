import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Match } from '../models/match';
import { MatchRetrieval } from '../services/match-retrieval.service';
import { PlayerRetrieval } from '../services/player-retrieval.service';
import { TeamRetrieval } from '../services/team-retrieval.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent{
  statusMessage = ''

  constructor(private matchService : MatchRetrieval, private playerService : PlayerRetrieval, private teamService : TeamRetrieval) {}

  ngOnInit() : void { 
    this.statusMessage = ' ';
    // If any of the lists are unpopulated, then populate
    if (this.matchService.getMatchList().length == 0 || this.playerService.getPlayers().length == 0 || this.teamService.getTeamList().length == 0)
    {
      this.statusMessage = 'Please wait while the data loads.';

      //get the match ids, in this case from a JSON from an already run query
      this.matchService.populateMatchIds ();

      // retrieve match for each ID, and run add/updates based on match info
      for (const mId of this.matchService.getIds()){
        this.retriveMatchFromId(mId);
      }
      this.statusMessage = 'Data has finished loading. Thank you for waiting';
    }
    else { this.statusMessage = 'Your data has already been loaded. Thank you.';}    
  }

  retriveMatchFromId (matchId : number): void {
    // retrieve match
    this.matchService.retrieveMatch(matchId).subscribe((match : Match ) => {
      // update the player list
      this.playerService.addUpdatePlayers(match);
      // update the team list
      this.teamService.addUpdateTeam(match, match.radiant_team);
      this.teamService.addUpdateTeam(match, match.dire_team);
      // add match to matchDetails
      this.matchService.addMatch(match);
      // log success
    }),
    (error : HttpErrorResponse) => {
      console.error(error.error);
    };
  }
}
