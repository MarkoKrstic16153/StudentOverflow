import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionsService } from 'src/services/QuestionsService';
import { LoginService } from 'src/services/LoginService';
import { Socket } from 'ngx-socket-io';

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
  subs$:Observable<string[]>;
  subQuestions:string[];

  constructor(private route : ActivatedRoute,private router: Router,private questionService:QuestionsService,private loginService:LoginService,private socket:Socket) {

   }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
    });
    this.fetchUserData();
    this.fetchQuestions();
    this.getSubs();
  }
  getSubs(){
    this.subs$=this.questionService.getUserSubs(this.loginService.loggedUser);
    this.subs$.subscribe((data)=>{this.subQuestions=data;console.log(this.subQuestions);this.stvoriAsyncPrijem()});
  }
  stvoriAsyncPrijem(){
    this.socket.removeAllListeners();
    this.subQuestions.forEach((sub) => {
      let poruka:Observable<any>=this.socket.fromEvent<any>(sub);
              poruka.subscribe((data)=>{
                console.log("User :" + data.username + " Pitanje : "+data.pitanje);
                  if(data.username!=this.loginService.loggedUser)
                    this.questionService.obavestenja.push(data);
      })
    });
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
  unSub(naslov:string){
    console.log(naslov);
    this.questionService.postUnsub(this.loginService.loggedUser,naslov).subscribe(()=>{
      this.getSubs();
    });
  }
}

