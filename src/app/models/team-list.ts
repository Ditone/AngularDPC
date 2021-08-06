import { Team } from "./team";

export class TeamList{
    constructor(
        public team: Team, 
        public pNames : Array<string>
    ){}
}