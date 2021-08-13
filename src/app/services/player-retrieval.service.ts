import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Match } from "src/app/models/match";
import { Player } from "../models/player";

@Injectable({
    providedIn: 'root'
})
export class PlayerRetrieval {
    constructor (private http : HttpClient) {}

    private completePlayerList : Array<Player> = [];

    /* This function is a private helper function which will 
    ** Input: player obj
    ** Output: void
    ** Use case: Update existing player pings, otherwise save new player
    */
    private addUpdatePlayer (p : Player) : void {
        for (let pIndex of this.completePlayerList){
            if (pIndex.account_id == p.account_id){
               pIndex.pings += p.pings;
                return;
            }
        }
        this.completePlayerList.push(p);    
    }

    addUpdatePlayers (m : Match) : void{
        //add all players from the match to the full player list
        for (let p of m.players){
            if (p.pings == undefined){
                p.pings = 0;
            }
            this.addUpdatePlayer(p);
        }
    }

    addPlayersOneTeam (newP : Array<Player>) : Array<Player> {
        let newPlayers : Array<Player> = [];

        for (let np in newP){
            for (let p in this.completePlayerList){
                if (newP[np].account_id == this.completePlayerList[p].account_id){
                    newP[np].pings += this.completePlayerList[p].pings;
                    newPlayers.push(newP[np]);
                }
            }
        }
        
        if (newPlayers.length==0){
            console.log('Something went terribly wrong at addPlayersOneTeam. ' + newP[0].name);
        }

        return newPlayers;
    }

    //does player list exist
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

    // clear existing player list
    clearPlayers () : void{
        this.completePlayerList = [];
    }
}