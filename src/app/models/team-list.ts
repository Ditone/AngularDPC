import { Player } from "./player";
import { Team } from "./team";

export class TeamList{
    constructor(
        public team: Team, 
        public players : Array<Player>
    ){}
}