import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pitanje } from 'src/models/Pitanje';
import { Observable, interval } from 'rxjs';
import { Odgovor } from 'src/models/Odgovor';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class QuestionsService {
    ulrQuestionPost="http://localhost:3000/addquestion";
    urlGetTags="http://localhost:3000/tags";
    urlGetQuestion="http://localhost:3000/question/";
    urlAllQuestions="http://localhost:3000/allquestions";
    urlUserQuestions="http://localhost:3000/userquestions/";
    urlDeleteQuestion="http://localhost:3000/deletequestion";
    urlPostAnswer="http://localhost:3000/addanswer";
    urlGetNewQuestions="http://localhost:3000/newquestions";
    urlGetTagQuestions="http://localhost:3000/tag/";
    urlGetTagIntersectQuestions="http://localhost:3000/tagintersect";
    urlPostUpvote="http://localhost:3000/upvote";
    urlGetLikedQuestions="http://localhost:3000/liked/";
    urlPostCreatePublishTopic="http://localhost:3000/createpub";
    urlPostPublishOnTopic="http://localhost:3000/pub";
    urlPostSubscribeTopic="http://localhost:3005/sub";
    urlGetUserSubs="http://localhost:3000/usersubs/";
    urlPostUnSub="http://localhost:3000/unsub";
    urlPostSub="http://localhost:3000/sub";
    obavestenja:any[]=[];

    constructor(private httpClient: HttpClient) { }
    
    postQuestion(newQuestion:Pitanje):Observable<any>{
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
      this.httpClient.post<Pitanje>(this.ulrQuestionPost,newQuestion,{headers:headers})
     .subscribe(data => {
       console.log(data);
      })
      const numbers = interval(200);
      const takeFourNumbers = numbers.pipe(take(1));
      return takeFourNumbers;
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
    addAnswer(answer:Odgovor,naslov:string):Observable<any>{
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
          this.httpClient.post<any>(this.urlPostAnswer,{odgovor:answer,naslov:naslov},{headers:headers})
          .subscribe(data => {
             console.log(data);
           })
           const numbers = interval(100);
      const takeFourNumbers = numbers.pipe(take(1));
      return takeFourNumbers;
    }
    getNewQuestions():Observable<string[]>{
      return this.httpClient.get<string[]>(this.urlGetNewQuestions);
    }
    getTagQuestions(tagName:string):Observable<string[]>
    {
      return this.httpClient.get<string[]>(this.urlGetTagQuestions+tagName)
    }
    getTagsQuestions(tagNames:string[]):Observable<string[]>
    {
      const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
      return this.httpClient.post<string[]>(this.urlGetTagIntersectQuestions,{tags:tagNames},{headers:headers});
    }
    postUpvote(naslov:string,username:string):Observable<any>{
      const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
      this.httpClient.post<any>(this.urlPostUpvote,{naslov:naslov,username:username},{headers:headers})
     .subscribe(data => {
       console.log(data);
      })
      const numbers = interval(100);
      const takeFourNumbers = numbers.pipe(take(1));
      return takeFourNumbers;
    }
    getLikedQuestions(user:string):Observable<string[]>{
      return this.httpClient.get<string[]>(this.urlGetLikedQuestions+user);
    }
    postCreatePublishTopic(username:string,naslov:string){
      const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
          this.httpClient.post<any>(this.urlPostCreatePublishTopic,{username:username,naslov:naslov},{headers:headers})
          .subscribe(data => {
             console.log(data);
           })
    }
    postSubscribeTopic(username:string,naslov:string):Observable<any>{
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.httpClient.post<any>(this.urlPostSubscribeTopic,{username:username,naslov:naslov},{headers:headers})
      .subscribe(data => {
         console.log(data);
       })
        const numbers = interval(100);
        const takeFourNumbers = numbers.pipe(take(1));
        return takeFourNumbers;
    }
    postPublishOnTopic(naslov:string,username:string){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.httpClient.post<any>(this.urlPostPublishOnTopic,{naslov:naslov,username:username},{headers:headers})
      .subscribe(data => {
         console.log(data);
       })
    }
    getUserSubs(username:string):Observable<string[]>{
      return this.httpClient.get<string[]>(this.urlGetUserSubs+username);
    }
    postUnsub(username:string,naslov:string):Observable<any>{
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.httpClient.post<any>(this.urlPostUnSub,{username:username,naslov:naslov},{headers:headers})
      .subscribe(data => {
         console.log(data);
       })
        const numbers = interval(100);
        const takeFourNumbers = numbers.pipe(take(1));
        return takeFourNumbers;
    }
    postSub(username:string,naslov:string):Observable<any>{
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.httpClient.post<any>(this.urlPostSub,{username:username,naslov:naslov},{headers:headers})
      .subscribe(data => {
         console.log(data);
       })
        const numbers = interval(100);
        const takeFourNumbers = numbers.pipe(take(1));
        return takeFourNumbers;
    }
}