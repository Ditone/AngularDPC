export interface Player{
    account_id : number;
    name : string;
    pings : number;

    //necessary for looking up team ids
    isRadiant : boolean;
}