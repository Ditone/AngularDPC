import { Component, OnInit } from '@angular/core';
import { AccountInfo } from '../models/account-info';
import { ActivatedRoute } from '@angular/router';
import { AccountRetrieval } from '../services/account-retrieval.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamRetrieval } from '../services/team-retrieval.service';
import { Team } from '../models/team';

@Component({
  selector : 'pm-pdetails',
  templateUrl : './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit{

  accountDetails! : AccountInfo;
  playerTeam! : Team;

  constructor(private accountService : AccountRetrieval, private route : ActivatedRoute,  private teamService : TeamRetrieval) {}

  getPlayerDetails(accId : number) : void{
    //retrieves the match
    this.accountService.retrieveAccount(accId).subscribe((accInfo : AccountInfo) => {
      //set account details to the retrieved account information
      this.accountDetails = accInfo;
      this.getPlayersTeam();
      this.fixPlayerDetails(this.accountDetails);
      
    }),
    (error : HttpErrorResponse) => {
      console.error(error.error);
    };
  }

  fixPlayerDetails (accInfo : AccountInfo) : void{
    if (accInfo.competitive_rank){
      accInfo.competitive_rank = 'Unranked';
    }
    if (accInfo.leaderboard_rank){
      accInfo.leaderboard_rank = 0;
    }
    accInfo.profile.loccountrycode = accInfo.profile.loccountrycode || 'Not listed.';
  }

  getPlayersTeam () : void{
    this.playerTeam = this.teamService.findAPlayersTeam(this.accountDetails.profile.name);
  }

  ngOnInit():void{
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!+this.route.snapshot.paramMap.get('id')!){
      console.error('ID is null');
    }
    else{
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.getPlayerDetails(+this.route.snapshot.paramMap.get('id')!);
    }
  }
}