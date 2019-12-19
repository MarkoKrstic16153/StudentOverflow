import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Pitanje } from 'src/models/Pitanje';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pretraga-pitanja',
  templateUrl: './pretraga-pitanja.component.html',
  styleUrls: ['./pretraga-pitanja.component.css']
})
export class PretragaPitanjaComponent implements OnInit {
  tags$:Observable<string[]>;
  selected:any="";
  selectedTags:string[]=[];
  question$:Observable<any>;
  isLogged:Boolean;
  newQuestions$:Observable<string[]>;
  constructor(private route : ActivatedRoute,private httpService:QuestionsService,private location:Location,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      let param=Params["username"];
      if(param=="#")
        this.isLogged=false;
      else
        this.isLogged=true;
      console.log(this.isLogged);
    });
    this.tags$=this.httpService.getTags();
  }

  onChangeSelect(){
    if(this.selected!=""){
    let flag:Boolean=false;
    this.selectedTags.forEach((element)=>{if(element==this.selected)flag=true;});
    if(flag==false)   
      this.selectedTags.push(this.selected);
    }
  }

  deleteTag(index:number){
    this.selectedTags.splice(index,1);
    this.question$=this.httpService.getQuestion(" Kako ovo u Javi(Eclipse)?");
    this.question$.subscribe((question)=>{console.log(question);
      let fetchedQuestion:Pitanje= {KoJePitao:question.KoJePitao,Upvotes:question.Upvotes,TekstPitanje:question.Tekst,Tagovi:JSON.parse(question.Tagovi),Odgovori:JSON.parse(question.Odgovori),Naslov:" Kako ovo u Javi(Eclipse)?"};
      console.log(fetchedQuestion);
    });
  }

  goBack(){
    this.location.back();
  }
  fetchNewest(){
    this.newQuestions$=this.httpService.getNewQuestions();
  }
  pogledajPitanje(naslov:any){
    console.log(naslov);
    this.router.navigate(["pitanje",naslov]);
  }
}
