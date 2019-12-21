import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/LoginService';
import { Location } from '@angular/common';

@Component({
  selector: 'serach-user',
  templateUrl: './serach-user.component.html',
  styleUrls: ['./serach-user.component.css']
})
export class SerachUserComponent implements OnInit {
  myControl = new FormControl();
  allUsers:string[]=[];
  filteredUsers: Observable<string[]>;
  
  constructor(private httpService:LoginService,private router: Router,private location:Location) { }

  async ngOnInit() {
    await this.httpService.getAllUsers().subscribe(data=>{
      console.log(data)
      this.allUsers=data
    });
    //await fetch("http://localhost:3000/allquestions").then(res=>res.json()).then(data=>this.allquestions=data);
    this.filteredUsers = this.myControl.valueChanges
      .pipe(
        startWith('/[a-zA-Z]/'),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(value.length>2)
    return this.allUsers.filter(question => question.toLowerCase().includes(filterValue)).slice(0,5);
  }

  pretraziTrenutno(){
    this.router.navigate(["profil",this.myControl.value]);
  }

  goBack(){
    this.location.back();
  }
}
