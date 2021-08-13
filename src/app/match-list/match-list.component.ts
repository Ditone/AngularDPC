import { Component, OnInit } from '@angular/core';
import { MatchRetrieval } from '../services/match-retrieval.service';
import { Match } from '../models/match';
import { PlayerRetrieval } from '../services/player-retrieval.service';

@Component({
  selector: 'pm-mlist',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  //result from retrieveMatchIDs, used for finding each match in the season
  //array which stores all the Match objects
  matchDetails : Array<Match> = [];

  constructor(private matchService : MatchRetrieval, private playerService : PlayerRetrieval) {}
  
  ngOnInit() : void { 
    this.matchDetails = this.matchService.getMatchList();
  }
} 