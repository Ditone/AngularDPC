import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';

//json is a result of this query on the OpenDotA Match Browser:
/* SELECT matches.match_id 
    FROM matches
    JOIN match_patch using(match_id)
    JOIN leagues using(leagueid)
    JOIN player_matches using(match_id)
    JOIN heroes on heroes.id = player_matches.hero_id
    LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
    LEFT JOIN teams using(team_id)
    WHERE TRUE
    AND kills IS NOT NULL 
    AND (matches.leagueid = 13117 OR matches.leagueid = 13116 OR matches.leagueid = 13115 OR matches.leagueid = 13114 OR matches.leagueid = 12964 OR matches.leagueid = 12906 OR matches.leagueid = 13120 OR matches.leagueid = 13107 OR matches.leagueid = 13108 OR matches.leagueid = 13109 OR matches.leagueid = 13113 OR matches.leagueid = 13112 OR matches.leagueid = 13110 OR matches.leagueid = 13119 OR matches.leagueid = 12723 OR matches.leagueid = 12735 OR matches.leagueid = 12720 OR matches.leagueid = 12705 OR matches.leagueid = 12727 OR matches.leagueid = 12718)
    AND matches.start_time >= extract(epoch from timestamp '2019-05-08T05:00:00.000Z')
    GROUP BY matches.match_id
    HAVING count(distinct matches.match_id) >= 1
*/
//import matchIds from 'src/app/local-data/na_match_ids.json';
import testIds from 'src/app/local-data/test_ids.json';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchRetrieval {
  constructor (private http : HttpClient) {}

    // don't want anyone touching the ID list unless necessary
    private onlyIds : Array<number> = [];
    private matchList : Array<Match> = [];

    retrieveMatch ( matchId : number ) : Observable<Match>{
    //return this.http.get<FullMatch>('https://api.opendota.com/api/matches/' + matchId + '/?api_key=3ca47c01-644c-48fc-b81c-ca2032313edc');
      return this.http.get<Match>('https://api.opendota.com/api/matches/' + matchId + '/?api_key=3ca47c01-644c-48fc-b81c-ca2032313edc').pipe(delay(1000));
    }

    // breaks apart the the na_match_ids.json file into just the match_ids
    // hard coding location, but is supposed to emulate working with a JSON
    populateMatchIds () : void {
      this.onlyIds = [];
      for (const index in testIds){
        this.onlyIds.push(testIds[index].match_id);
        //this.onlyIds.push(matchIds[index].match_id);
      }
    }

    addMatch(m : Match) : void{
      this.matchList.push(m);
    }

    getIds() : Array<number> {
      return this.onlyIds;
    }

    getMatchList() : Array<Match> {
      return [...this.matchList];
    }
}