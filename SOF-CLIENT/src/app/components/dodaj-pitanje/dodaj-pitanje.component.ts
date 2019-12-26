import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pitanje } from 'src/models/Pitanje';
import { QuestionsService } from 'src/services/QuestionsService';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { LoginService } from 'src/services/LoginService';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-dodaj-pitanje',
  templateUrl: './dodaj-pitanje.component.html',
  styleUrls: ['./dodaj-pitanje.component.css']
})
export class DodajPitanjeComponent implements OnInit {
  username:string="";
  currentTag:string="";
  tags:string[]=[];
  title:string="";
  questionText:string="";
  addQError:Boolean=false;
  addQMessage:string="";
  question$:Observable<any>;
  subs$:Observable<string[]>;
  subQuestions:string[];
  constructor(private route : ActivatedRoute,private router : Router,private questionService: QuestionsService,private location: Location,private loginService:LoginService,private socket:Socket) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
    });
    this.subs$=this.questionService.getUserSubs(this.loginService.loggedUser);
    this.subs$.subscribe((data)=>{this.subQuestions=data;console.log(this.subQuestions)});
  }
  onKeyTag(event:any){
    this.currentTag=event.target.value;
  }
  onKeyText(event:any){
    this.questionText=event.target.value;
    this.addQError=false;
  }
  onKeyNaslov(event:any){
    this.title=event.target.value;
    this.addQError=false;
  }
  addTag(){
    let flag:Boolean=false;
    this.tags.forEach((element)=>{if(element==this.currentTag)flag=true;});
    if(flag==false){
    this.tags.push(this.currentTag);
    this.addQError=false;
    }
  }
  deleteTag(index:number){
    this.tags.splice(index,1);
  }

  addQuestion(){
    if(this.tags.length==0 || this.title=="" || this.questionText=="")
    {
      this.addQError=true;
      this.addQMessage="Nevalidan Unos!";
    }
    else
    {
        let novoPitanje:Pitanje= {KoJePitao:this.username,Naslov:this.title,Odgovori:[],Tagovi:this.tags,TekstPitanje:this.questionText,Upvotes:0};
        console.log(novoPitanje);
        this.question$=this.questionService.getQuestion(novoPitanje.Naslov);
        this.question$.subscribe((question)=>{
          if(question==null){
              if(!this.subQuestions.includes(novoPitanje.Naslov)){
              let poruka:Observable<any>=this.socket.fromEvent<any>(this.title);
              poruka.subscribe((data)=>{
                console.log("User :" + data.username + " Pitanje : "+data.naslov);
                  if(data.username!=this.loginService.loggedUser)
                    this.questionService.obavestenja.push(data);
              });
            }
              console.log('sad publishuje');
              this.questionService.postCreatePublishTopic(this.loginService.loggedUser,this.title);
            this.questionService.postQuestion(novoPitanje).subscribe(()=>{this.router.navigate(["pitanje",this.title]);})
          }
          else{
            this.router.navigate(["pitanje",this.title]);
          }
        });
    }
  }
}
