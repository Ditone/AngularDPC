import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from '../models/account-info';

@Injectable({
  providedIn: 'root'
})
export class AccountRetrieval {
  constructor (private http : HttpClient) {}

  retrieveAccount ( accId : number ) : Observable<AccountInfo>{
    //return this.http.get<FullMatch>('https://api.opendota.com/api/matches/' + accId + '/?api_key=3ca47c01-644c-48fc-b81c-ca2032313edc');
    return this.http.get<AccountInfo>('https://api.opendota.com/api/players/' + accId + '/?api_key=3ca47c01-644c-48fc-b81c-ca2032313edc').pipe(delay(1000));
  }
}