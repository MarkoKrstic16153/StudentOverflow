import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Pitanje } from 'src/models/Pitanje';

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
  constructor(private httpService:QuestionsService) { }

  ngOnInit() {
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
}
