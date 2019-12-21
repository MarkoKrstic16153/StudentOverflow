import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/models/korisnik';

@Injectable({providedIn: 'root'})
export class LoginService {
    urlGet = 'http://localhost:3000/login/';
    urlPost='http://localhost:3000/register';
    loggedUser:string;
    constructor(private httpClient: HttpClient) { 
      
    }
    getKorisnik(param:any):Observable<string> {
        return this.httpClient.get<string>(this.urlGet+param);
    }
    postKorisnik(noviKorisnik:Korisnik){
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
     this.httpClient.post<Korisnik>(this.urlPost,noviKorisnik,{headers:headers})
     .subscribe(data => {
        console.log(data);
      })
    }
    login(username:string){
      this.loggedUser=username;
    }
}