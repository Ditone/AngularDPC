import { HttpErrorResponse } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { TeamList } from "../models/team-list";
import { MatchRetrieval } from "../services/match-retrieval.service";
import { PlayerRetrieval } from "../services/player-retrieval.service";

@Component({
  selector : 'pm-plist',
  templateUrl : './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit{

  constructor(private matchService : MatchRetrieval, private playerService : PlayerRetrieval){}

  matchDetails : Array <Match> = [];
  localPlayerList : Array <Player> = [];
  localTeamList : Array <TeamList> = [];


  ngOnInit() : void {
    // check to see if the player list is already populated
    // if it isn't, then gotta populate everything
    if (!this.playerService.listExists || this.matchDetails.length == 0){
      this.matchService.populateMatchIds();
      for (let mId of this.matchService.getIds()){
        console.log('fetching : ' + mId + ' ');
        this.matchService.retrieveMatch(mId).subscribe((match : Match ) => {
          // update the player list + team list
          this.playerService.addUpdatePlayers(match);
          // add match to matchDetails
          this.matchDetails.push(match);
          // log success
          console.log('Successfully added match ' + match.match_id + '.');
        }),
        (error : HttpErrorResponse) => {
        console.error(error.error);
        } 
      }
    }
    this.localPlayerList = this.playerService.getPlayers();
    this.localTeamList = this.playerService.getTeamList();

    this.localTeamList = [];
    this.localTeamList = [];
  }

  localFindPlayersTeamName(name : string){
    return this.playerService.findAPlayersTeam(name).name;
  }
}