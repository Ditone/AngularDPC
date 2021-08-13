import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { TeamList } from '../models/team-list';
import { MatchRetrieval } from '../services/match-retrieval.service';
import { PlayerRetrieval } from '../services/player-retrieval.service';
import { TeamRetrieval } from '../services/team-retrieval.service';

@Component({
  selector : 'pm-plist',
  templateUrl : './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit{

  constructor(private matchService : MatchRetrieval, private playerService : PlayerRetrieval, private teamService : TeamRetrieval){}

  localMatchDetails : Array <Match> = [];
  localPlayerList : Array <Player> = [];
  localTeamList : Array <TeamList> = [];

  ngOnInit() : void {
    this.localPlayerList = this.playerService.getPlayers();
    this.localTeamList = this.teamService.getTeamList();
    this.localMatchDetails = this.matchService.getMatchList();
  }

  localFindPlayersTeamName(name : string) : string{
    return this.teamService.findAPlayersTeam(name).name;
  }
}