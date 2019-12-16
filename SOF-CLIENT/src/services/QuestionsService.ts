import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pitanje } from 'src/models/Pitanje';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {
    ulrQuestionPost="http://localhost:3000/addquestion";
    urlGetTags="http://localhost:3000/tags";
    urlGetQuestion="http://localhost:3000/question/";
    constructor(private httpClient: HttpClient) { }
    
    postQuestion(newQuestion:Pitanje){
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
     this.httpClient.post<Pitanje>(this.ulrQuestionPost,newQuestion,{headers:headers})
     .subscribe(data => {
        console.log(data);
      })
    }
    getTags():Observable<string[]>{
        return this.httpClient.get<string[]>(this.urlGetTags);
    }
    getQuestion(naslov:string):Observable<any>{
        return this.httpClient.post<any>(this.urlGetQuestion,{naslov:naslov});
    }
}