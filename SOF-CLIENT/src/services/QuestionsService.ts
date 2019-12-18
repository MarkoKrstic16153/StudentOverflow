import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pitanje } from 'src/models/Pitanje';
import { Observable } from 'rxjs';
import { Odgovor } from 'src/models/Odgovor';

@Injectable({providedIn: 'root'})
export class QuestionsService {
    ulrQuestionPost="http://localhost:3000/addquestion";
    urlGetTags="http://localhost:3000/tags";
    urlGetQuestion="http://localhost:3000/question/";
    urlAllQuestions="http://localhost:3000/allquestions";
    urlUserQuestions="http://localhost:3000/userquestions/";
    urlDeleteQuestion="http://localhost:3000/deletequestion";
    urlPostAnswer="http://localhost:3000/addanswer";
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
    getUserQuestions(username:string):Observable<string[]>{
        return this.httpClient.get<string[]>(this.urlUserQuestions+username);
    }
    getTags():Observable<string[]>{
        return this.httpClient.get<string[]>(this.urlGetTags);
    }
    getQuestion(naslov:string):Observable<any>{
        return this.httpClient.post<any>(this.urlGetQuestion,{naslov:naslov});
    }
    getAllQuestions():Observable<string[]>
    {
        return this.httpClient.get<string[]>(this.urlAllQuestions)
    }
    deleteQuestion(question:string){
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
          this.httpClient.post<any>(this.urlDeleteQuestion,{naslov:question},{headers:headers})
          .subscribe(data => {
             console.log(data);
           })
    }
    addAnswer(answer:Odgovor,naslov:string){
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
          this.httpClient.post<any>(this.urlPostAnswer,{odgovor:answer,naslov:naslov},{headers:headers})
          .subscribe(data => {
             console.log(data);
           })
    }
}