import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { QuestionsService } from 'src/services/QuestionsService';
import { LoginService } from 'src/services/LoginService';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  username:string;
  pitnja:string[];
  korisnikovaPitanja$:Observable<any>;
  constructor(private route : ActivatedRoute,private router: Router,private location: Location,private questionService:QuestionsService,private loginService:LoginService) {
   }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
      console.log(this.username);
    });
    this.fetchQuestions();
  }

  fetchQuestions(){
    this.korisnikovaPitanja$=this.questionService.getUserQuestions(this.username);
    this.korisnikovaPitanja$.subscribe((pitanja)=>{
      this.pitnja=pitanja;
    });
  }
  dodajtePitanje(){
    this.router.navigate(["dodajPitanje",this.username]);
  }
  goBack(){
    this.location.back();
  }
  pretrazitePitanja(){
    this.router.navigate(["pretragapitanja",this.username]);
  }
  auth():Boolean{
    return this.loginService.loggedUser==this.username;
  }
  deleteQuestion(question:string){
    console.log(question);
    this.questionService.deleteQuestion(question);
    this.fetchQuestions();
  }
  showQuestion(question:string){
    this.router.navigate(["pitanje",question]);
  }
}

