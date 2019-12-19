import { Component, OnInit, Inject } from '@angular/core';
import { Korisnik } from 'src/models/korisnik';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/LoginService';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Inject({
  
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrorMessage:string=null;
  signUpErrorMessage:string=null;
  loginFormGroup:FormGroup;
  createAccFormGroup:FormGroup;
  
  constructor(private httpService:LoginService,private router: Router,private location:Location) { }

  ngOnInit() {
    this.loginFormGroup=new FormGroup(
      {
        'username':new FormControl('',Validators.required),
        'password':new FormControl('',Validators.required)
      }
    )
    this.createAccFormGroup=new FormGroup(
      {
        'username':new FormControl('',
        [
          Validators.minLength(3),
          Validators.required,
          Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
        ],),
        'password':new FormControl('',
        [
          Validators.minLength(8),
          Validators.required,
          Validators.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
        ]),
        'name':new FormControl('',[Validators.required,Validators.minLength(3)]),
        'surname':new FormControl('',[Validators.required,Validators.minLength(3)])
      }
    )
  }

  login() {
      let userPassword$=this.httpService.getKorisnik(this.loginFormGroup.get('username').value);
      console.log(this.loginFormGroup.get('username').value);
      console.log(this.loginFormGroup.get('password').value);
      userPassword$.subscribe((response:any) => {
        console.log(response.password);
        if(response.password==this.loginFormGroup.get('password').value)
        { 
          this.httpService.login(this.loginFormGroup.get('username').value);this.router.navigate(["profil",this.loginFormGroup.get('username').value]);
          this.loginErrorMessage=null;
        }
        else 
        {
          this.loginErrorMessage="Ne postoji takva Username/Password kombinacija.";
        }
      });
  }

  signUp() {
      let userPassword$=this.httpService.getKorisnik(this.createAccFormGroup);
      userPassword$.subscribe((response:any) => 
      {
        if(response.password==null)
        {
          this.signUpErrorMessage=null;
          let noviKorisnik:Korisnik={
            Ime:this.createAccFormGroup.get('name').value,
            Prezime:this.createAccFormGroup.get('surname').value,
            Sifra:this.createAccFormGroup.get('password').value,
            Username:this.createAccFormGroup.get('username').value,
            Rank:0
          };
          this.httpService.postKorisnik(noviKorisnik);
          console.table(noviKorisnik);
        }
        else
        {
          this.signUpErrorMessage="Taj username je zauzet!";
        }
    });
  }

   goBack(){
     this.location.back();
   }
}
