import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Player } from "../models/player";
import { TeamList } from "../models/team-list";
import { PlayerRetrieval } from "../services/player-retrieval.service";
import { TeamRetrieval } from "../services/team-retrieval.service";


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  constructor(private playerService : PlayerRetrieval, private teamService : TeamRetrieval){}

  localPlayerList: Array <Player> = [];
  localTeamList: Array <TeamList> = [];

  /*component wants to display the list of teams, sharing this information:
    Team Logo, Team Name, List of player names (broken into different rows) showing Tag.Name
    Team Name and Team Logo clickable to go to team details
    Player names clickable to go to player details
  */
  ngOnInit(): void {
    this.localPlayerList = this.playerService.getPlayers();
    this.localTeamList = this.teamService.getTeamList();
  }

}
