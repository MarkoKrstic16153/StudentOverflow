import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Pitanje } from 'src/models/Pitanje';
import { Odgovor } from 'src/models/Odgovor';
import { LoginService } from 'src/services/LoginService';
import { BindingFlags } from '@angular/compiler/src/core';

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
  constructor(private route : ActivatedRoute,private router: Router,private questionService:QuestionsService,private loginService:LoginService) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.title=Params["data"];
      console.log(this.title);
    });
    this.getAnswers();
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
    this.question=null;
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
}
