import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {
  constructor(private http: HttpClient) {}

  getDiscordUser(tokenType: string | null, accessToken: string | null): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `${tokenType} ${accessToken}`});
    return this.http.get(`https://discord.com/api/users/@me`, {
      headers: headers
    });
  }

  getTotalUsersOnDiscordServer(): Observable<any> {
    return this.http.get(environment.BACK_URL + 'getDiscordUsers');
  }
}
