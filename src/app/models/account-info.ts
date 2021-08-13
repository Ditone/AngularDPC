export interface AccountInfo{
    competitive_rank : string,
    leaderboard_rank : number,
    mmr_estimate : { 
        estimate : number
    },
    profile : {
        account_id : number,
        avatarfull : string,
        loccountrycode : string,
        name : string
     }
}