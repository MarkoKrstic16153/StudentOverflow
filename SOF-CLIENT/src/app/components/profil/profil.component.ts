import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  data:any;
  pitnja:string[];
  korisnikovaPitanja$:Observable<any>;
  userData$:Observable<Object>;
  constructor(private route : ActivatedRoute,private router: Router,private questionService:QuestionsService,private loginService:LoginService) {

   }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
    });
    this.fetchUserData();
    this.fetchQuestions();
  }
  fetchUserData()
  {
    this.userData$=this.loginService.getUserData(this.username);
    this.userData$.subscribe((d)=>{
      this.data=d;
    });
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
  pretraziteKorisnike(){
    this.router.navigate(["profilSearch"]);
  }
}

