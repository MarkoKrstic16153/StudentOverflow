import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuestionsService } from 'src/services/QuestionsService';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  allquestions:string[]=[];
  filteredQuestions: Observable<string[]>;
  
  constructor(private httpService:QuestionsService,private router: Router) { }

  async ngOnInit() {
    await this.httpService.getAllQuestions().subscribe(data=>{
      console.log(data)
      this.allquestions=data
    });
    //await fetch("http://localhost:3000/allquestions").then(res=>res.json()).then(data=>this.allquestions=data);
    this.filteredQuestions = this.myControl.valueChanges
      .pipe(
        startWith('/[a-zA-Z]/'),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(value.length>2)
    return this.allquestions.filter(question => question.toLowerCase().includes(filterValue)).slice(0,5);
  }

  pretraziTrenutno(){
    console.log(this.myControl.value);
    //pretrazi iz baze pitanje sa to ime
    this.router.navigate(["pitanje",this.myControl.value]);
  }

}
