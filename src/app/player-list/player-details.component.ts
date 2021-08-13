import { Component, OnInit } from "@angular/core";
import { AccountInfo } from "../models/account-info";
import { ActivatedRoute } from '@angular/router';
import { AccountRetrieval } from "../services/account-retrieval.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TeamRetrieval } from "../services/team-retrieval.service";
import { Team } from "../models/team";

@Component({
    selector : 'pm-pdetails',
    templateUrl : './player-details.component.html',
    styleUrls: ['./player-details.component.scss']
  })
  export class PlayerDetailsComponent implements OnInit{
 
    constructor(private accountService : AccountRetrieval, private route : ActivatedRoute,  private teamService : TeamRetrieval) {}

    accountDetails! : AccountInfo;
    playerTeam! : Team;

    getPlayerDetails(accId : number) : void{
      //retrieves the match
      this.accountService.retrieveAccount(accId).subscribe((accInfo : AccountInfo) => {
        //set account details to the retrieved account information
        this.accountDetails = accInfo;
        this.getPlayersTeam(accInfo.profile.account_id);
 
        this.fixPlayerDetails(this.accountDetails);
        
      }),
      (error : HttpErrorResponse) => {
        console.error(error.error);
      }
    }

    fixPlayerDetails (accInfo : AccountInfo){
      if (accInfo.competitive_rank == null || accInfo.competitive_rank == undefined){
        accInfo.competitive_rank = 'Unranked';
      }
      if (accInfo.leaderboard_rank == null || accInfo.competitive_rank){
        accInfo.leaderboard_rank = 0;
      }
      if (accInfo.profile.loccountrycode == null || accInfo.profile.loccountrycode == undefined){
        accInfo.profile.loccountrycode = 'Not listed.'
      }
    }

    getPlayersTeam (accId : number) : void{
      this.playerTeam = this.teamService.findAPlayersTeam(this.accountDetails.profile.name);
    }

    ngOnInit (){
      if (+this.route.snapshot.paramMap.get('id')! == null){
        console.error('ID is null');
      }
      else{
        this.getPlayerDetails(+this.route.snapshot.paramMap.get('id')!);
      }
    }
}