import { Injectable } from "@angular/core";
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from "rxjs";
import { Match } from "src/app/models/match";
import { Player } from "../models/player";
import { Team } from "../models/team";
import { TeamList } from "../models/team-list";
import { MatchListComponent } from "../match-list/match-list.component";

@Injectable({
    providedIn: 'root'
})
export class PlayerRetrieval {
    constructor (private http : HttpClient) {}

    private completePlayerList : Array<Player> = [];
    private teamList : Array <TeamList> = [];

    /* This function is a private helper function which will 
    ** Input: player obj
    ** Output: void
    ** Use case: Update existing player pings, otherwise save new player
    */
    private addUpdatePlayer (p : Player) : void {
        for (let pIndex of this.completePlayerList){
            if (pIndex.account_id == p.account_id){
                console.log (pIndex.name + " already exists. Existing pings: " + pIndex.pings + ". Adding pings: " + p.pings + ".");
                pIndex.pings += p.pings;
                return;
            }
        }
        this.completePlayerList.push(p);    
    }

    // Helper function to help identify if a team already exists
    private teamExists (t : Team) : boolean{
        for (let tl of this.teamList){
            if (t == tl.team){
                console.log(t.name + ' already exists.');
                return true;
            }
        }
        return false
    }

    private getPlayersOfTeam (m : Match, isRad : boolean) : Array<string>{
        
        var tempPlayerList : Array<string> = [];

        if (isRad){
            for (let p of m.players){
                if (p.isRadiant){
                    tempPlayerList.push(p.name);
                }
            }
        }

        else if (!isRad){
            for (let p of m.players){
                tempPlayerList.push(p.name);
            }
        }

        return tempPlayerList;
    }

    // Helper function called when a new team and associated list of players needs to be added
    // Need to know if it's the dire team or the radiant team
    private addTeam (t: Team, p : Array<string>) : void{
        this.teamList.push(new TeamList(t, p));
    }

    addUpdatePlayers (m : Match) : void{
        //does the dire team exist?
        // yes? move on to radiant team
        // no? stop and add the team

        if (!this.teamExists(m.dire_team)){
            this.addTeam(m.dire_team, this.getPlayersOfTeam(m, false));
        }

        //does the radiant team exist?
        // yes? move onto next step
        // no? stop and add the team
        if(!this.teamExists(m.radiant_team)){
            this.addTeam(m.radiant_team, this.getPlayersOfTeam(m, true));
        }


        //add all players from the match to the full player list
        for (let p of m.players){
            if (p.pings == undefined){
                console.log("Detected " + p.name + " has no pings.")
                p.pings = 0;
            }
            this.addUpdatePlayer(p);
        }
    }

    listExists () : boolean{
        if (this.completePlayerList.length > 0){ 
            return true ;
        }
        else{
            return false;
        }
    }

    //return a copy of the playerlist
    getPlayers () : Array<Player>{
        return [...this.completePlayerList];
    }

    // return a copy of the teamlist
    getTeamList() : Array<TeamList>{
        return [...this.teamList];
    }

    // clear existing player list
    clearPlayers () : void{
        this.completePlayerList = [];
        this.teamList = [];
    }

    findAPlayersTeam(id : string) : Team{
        let tempTeam! : Team;
        for (let t of this.teamList){
            for (let pId of t.pNames){
                if (id == pId){
                    tempTeam = t.team;
                }
            }
        }
        return tempTeam;
    }
}