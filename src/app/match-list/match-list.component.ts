import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatchRetrieval } from '../services/match-retrieval.service';
//import { PlayerRetrieval } from './services/player-retrieval';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { PlayerRetrieval } from '../services/player-retrieval.service';
import { delay } from 'rxjs/operators';

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
    // clear any existing values (test)
    this.playerService.clearPlayers ();
    this.matchDetails = [];

    console.log('Length of match details ' + this.matchDetails.length)

    // test single match -- id : 5861478139 - Quincy Crew vs EG DPC Season 1 
    // generate matchID array
    this.matchService.populateMatchIds ();

    // retrieve matchs for each ID 
    for (let mId of this.matchService.getIds()){
      console.log('fetching : ' + mId + '.');
      this.retriveMatchFromId(mId);
    }
  }

  retriveMatchFromId (matchId : number): void {
    // retrieve match
    this.matchService.retrieveMatch(matchId).subscribe((match : Match ) => {
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