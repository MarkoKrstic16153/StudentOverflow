import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Pitanje } from 'src/models/Pitanje';
import { Odgovor } from 'src/models/Odgovor';
import { LoginService } from 'src/services/LoginService';
import { BindingFlags } from '@angular/compiler/src/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-pitanje',
  templateUrl: './pitanje.component.html',
  styleUrls: ['./pitanje.component.css']
})
export class PitanjeComponent implements OnInit {
  title:string;
  question$:Observable<any>;
  question:Pitanje;
  odgovor:string="";
  likedQuestions:string[]=[];
  subs$:Observable<string[]>;
  subQuestions:string[];
  constructor(private route : ActivatedRoute,private router: Router,private questionService:QuestionsService,private loginService:LoginService,private socket:Socket) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.title=Params["data"];
      console.log(this.title);
    });
    this.getAnswers();
    this.getSubs();
  }
  getSubs(){
    this.subs$=this.questionService.getUserSubs(this.loginService.loggedUser);
    this.subs$.subscribe((data)=>{this.subQuestions=data;console.log(this.subQuestions)});
  }
  getAnswers(){
    if(this.auth()){
      this.questionService.getLikedQuestions(this.loginService.loggedUser).subscribe((data)=>{this.likedQuestions=data;
      this.daLiJeLajkovao();
      });
    }
    this.question$=this.questionService.getQuestion(this.title);
    this.question$.subscribe((q)=>{
      this.question={
        KoJePitao:q.KoJePitao,
        Naslov:this.title,
        Odgovori:JSON.parse(q.Odgovori),
        Tagovi:JSON.parse(q.Tagovi),
        TekstPitanje:q.Tekst,
        Upvotes:q.Upvotes
      }
      });
  }
  tagClicked(tag:string){
    this.router.navigate(["tag",tag]);
  }

  onKeyText(text){
    this.odgovor=text.target.value;
  }
  dodajOdgovor(){
    let noviOdgovor:Odgovor={
      KoJeOdgovorio:this.loginService.loggedUser,Tekst:this.odgovor
    };
    console.log(noviOdgovor);
    if(!this.subQuestions.includes(this.title)){
    let poruka:Observable<any>=this.socket.fromEvent<any>(this.title);
              poruka.subscribe((data)=>{
                console.log("User :" + data.username + " Pitanje : "+ data.naslov);
                  if(data.username!=this.loginService.loggedUser)
                    this.questionService.obavestenja.push(data);
              });
            }
    this.question=null;
    this.questionService.postPublishOnTopic(this.title,this.loginService.loggedUser);
    this.questionService.addAnswer(noviOdgovor,this.title).subscribe(()=>{this.getAnswers();});
  }
  auth():Boolean{
    return this.loginService.loggedUser!="";
  }
  vidiProfil(user:string){
    console.log(user);
    this.router.navigate(["profil",user]);
  }
  upvote(naslov:string){
    console.log(naslov);
    this.questionService.postUpvote(naslov,this.loginService.loggedUser).subscribe(()=>{this.getAnswers()});
  }
  daLiJeLajkovao():Boolean{
    let flag=false;
    this.likedQuestions.forEach((pitanje)=>{
      if(this.title==pitanje)
      flag=true;
    });
    return flag;
  }
  sub(){
    this.questionService.postSub(this.loginService.loggedUser,this.title).subscribe(()=>{
      this.getSubs();
      let poruka:Observable<any>=this.socket.fromEvent<any>(this.title);
              poruka.subscribe((data)=>{
                console.log("User :" + data.username + " Pitanje : "+data.pitanje);
                  if(data.username!=this.loginService.loggedUser)
                    this.questionService.obavestenja.push(data);
      });
    })
  }
  daLiJeSubovan():Boolean{
    return this.subQuestions.includes(this.title);
  }
}
