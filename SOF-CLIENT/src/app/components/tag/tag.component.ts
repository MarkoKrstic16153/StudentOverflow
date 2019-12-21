import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/services/QuestionsService';
import { LoginService } from 'src/services/LoginService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  Tagname:string="";
  questions$:Observable<string[]>;
  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private questionService:QuestionsService,
    private loginService:LoginService,
    ) {}

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.Tagname=Params["tag"];
    });
    this.questions$=this.questionService.getTagQuestions(this.Tagname);
  }
  Click(question:string)
  {
    this.router.navigate(["pitanje",question]);
  }
}
