import { Component, OnInit, Inject } from '@angular/core';
import { Korisnik } from 'src/models/korisnik';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/LoginService';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Inject({
  
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername:string="";
  loginPassword:string="";
  signUpName:string="";
  signUpSurname:string="";
  signUpUsername:string="";
  signUpPassword:string="";
  loginError:boolean=false;
  signUpError:boolean=false;
  loginMessage:string="";
  signUpMessage:string="";
  userPassword$:Observable<string>;
  
  constructor(private httpService:LoginService,private router: Router,private location:Location) { }

  ngOnInit() {
  }

  login() {
    if(this.loginUsername.trim().length>3 && this.loginPassword.trim().length>3)
    {
      this.userPassword$=this.httpService.getKorisnik(this.loginUsername);
      this.userPassword$.subscribe((response:any) => {console.log(response.password);if(response.password==this.loginPassword){ this.httpService.login(this.loginUsername);this.router.navigate(["profil",this.loginUsername]);}else {this.loginMessage="Ne postoji takva Username/Password kombinacija.";this.loginError=true;}});
    }
    else
    {
      this.loginError=true;
      this.loginMessage="Nevalidan unos!";
    }
  }

  signUp() {
    if(this.signUpName.trim().length>2 && this.signUpSurname.trim().length>2 && this.signUpUsername.trim().length>3 && this.signUpPassword.trim().length>3)
    {
      this.userPassword$=this.httpService.getKorisnik(this.signUpUsername);
      this.userPassword$.subscribe((response:any) => {if(response.password==null){
        let noviKorisnik:Korisnik={Ime:this.signUpName,Prezime:this.signUpSurname,Sifra:this.signUpPassword,Username:this.signUpUsername,Rank:0};
        this.httpService.postKorisnik(noviKorisnik);
      }
      else{ this.signUpError=true;
        this.signUpMessage="Taj username je zauzet!";}
    });
    }
    else
    {
      this.signUpError=true;
      this.signUpMessage="Nevalidan unos!";
    }
  }

  onKey0(event:any){
    this.loginUsername=event.target.value;
    this.loginError=false;
  }
  onKey1(event:any){
    this.loginPassword=event.target.value; 
    this.loginError=false;
  }
  onKey2(event:any){
    this.signUpName=event.target.value; 
    this.signUpError=false;
  }
  onKey3(event:any){
    this.signUpSurname=event.target.value;
    this.signUpError=false;
  }
  onKey4(event:any){
    this.signUpUsername=event.target.value;
    this.signUpError=false;
  }
  onKey5(event:any){
    this.signUpPassword=event.target.value;
    this.signUpError=false;
  }
  goBack(){
    this.location.back();
  }
}
