import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Pitanje } from 'src/models/Pitanje';
import { Odgovor } from 'src/models/Odgovor';
import { LoginService } from 'src/services/LoginService';

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
  constructor(private route : ActivatedRoute,private router: Router,private location: Location,private questionService:QuestionsService,private loginService:LoginService) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.title=Params["data"];
      console.log(this.title);
    });
    this.getAnswers();
  }
  getAnswers(){
    this.question$=this.questionService.getQuestion(this.title);
    this.question$.subscribe((q)=>{this.question={KoJePitao:q.KoJePitao,Naslov:this.title,Odgovori:JSON.parse(q.Odgovori),Tagovi:JSON.parse(q.Tagovi),TekstPitanje:q.Tekst,Upvotes:q.Upvotes}});
  }

  onKeyText(text){
    this.odgovor=text.target.value;
  }
  dodajOdgovor(){
    let noviOdgovor:Odgovor={KoJeOdgovorio:this.loginService.loggedUser,Tekst:this.odgovor,Upvotes:0};
    console.log(noviOdgovor);
    this.questionService.addAnswer(noviOdgovor,this.title).subscribe(()=>{this.getAnswers();});
    this.question=null;
  }
  auth():Boolean{
    return this.loginService.loggedUser!="";
  }
  goBack(){
    this.location.back();
  }
}
