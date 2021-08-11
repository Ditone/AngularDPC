import { Injectable } from "@angular/core";
import { Match } from "src/app/models/match";
import { Team } from "../models/team";
import { TeamList } from "../models/team-list";
import { Player } from "../models/player";
import { PlayerRetrieval } from "./player-retrieval.service";

@Injectable({
    providedIn: 'root'
})
export class TeamRetrieval {

    constructor (private playerService : PlayerRetrieval) {}

    private teamList : Array<TeamList> = []

    // Function to help identify if a team already exists
    private teamExists (t : Team) : boolean{
        for (let tl of this.teamList){
            if (t.team_id == tl.team.team_id){
                return true;
            }
        }
        return false
    }

    // Helper function called when a new team and associated list of players needs to be added
    // Need to know if it's the dire team or the radiant team
    private addTeam (t: Team, p : Array<Player>) : void{
        this.teamList.push(new TeamList(t, p));
    }

    private updateTeam(t: Team, ps : Array<Player>) : void{
        // find the teamlist obj containing team
        // take that player list, run addPlayersOneTeam (thatPlayerList)
        // set that teamlist obj's playerlist to the new player list

        for (let tl of this.teamList){
            if (tl.team.team_id == t.team_id){
                tl.players = this.playerService.addPlayersOneTeam(tl.players)
                return
            }
        }

        console.log ("Something went terribly wrong running private updateTeam on "  + t.name)
    }

    // Helper function called in the add/update team
    // Gets all players on a team so they know which players to update
    private getPlayersOfTeam (m : Match, isRad : boolean) : Array<Player>{
        var tempPlayerList : Array<Player> = [];
        
        if (isRad){
            for (let p of m.players){
                if (p.isRadiant){
                    tempPlayerList.push(p);
                }
            }
        }

        else if (!isRad){
            for (let p of m.players){
                tempPlayerList.push(p);
            }
        }

        return tempPlayerList;
    }

    //does the dire team exist?
    // yes? move on to radiant team, no? stop and add the team
    addUpdateTeam (m : Match) : void{
        if (!this.teamExists(m.dire_team)){
            this.addTeam(m.dire_team, this.getPlayersOfTeam(m, false));
            return;
        }

        //does the radiant team exist?
        // yes? move onto next step, no? stop and add the team
        if(!this.teamExists(m.radiant_team)){
            this.addTeam(m.radiant_team, this.getPlayersOfTeam(m, true));
            return;
        }

        if (this.teamExists(m.dire_team)){
            this.updateTeam (m.dire_team, this.getPlayersOfTeam(m, false));
            return;
        }

        if (this.teamExists(m.radiant_team)){
            this.updateTeam (m.radiant_team, this.getPlayersOfTeam(m, true));
            return;
        }

        else{
            console.log('Something went wrong in addUpdateTeam for teams '
            + m.dire_team.name + ' and ' + m.radiant_team.name + '.')
        }

    }

    // return a copy of the teamlist
    getTeamList() : Array<TeamList>{
        return [...this.teamList];
    }

    //takes in a player's ID, and finds which team they're on
    //returns a Team Obj
    findAPlayersTeam(id : string) : Team{
        let tempTeam! : Team;
        for (let t of this.teamList){
            for (let p of t.players){
                if (id == p.name){
                    tempTeam = t.team;
                }
            }
        }
        return tempTeam;
    }
 }