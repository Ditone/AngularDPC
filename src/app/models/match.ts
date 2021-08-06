import { Player } from "./player";
import { Team } from "./team";

export interface Match{
    match_id : number;
    radiant_team : Team;
    dire_team : Team;
    players : Array<Player>;

}