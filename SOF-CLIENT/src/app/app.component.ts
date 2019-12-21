import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { LoginService } from 'src/services/LoginService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Overflow';
  currentURL:Observable<any>;
  constructor(private route : ActivatedRoute,private router:Router,private login:LoginService,private location:Location) {
    
  }
  ngOnInit() {
    this.currentURL=this.route.url;
  }
  logout()
  {
    this.login.loggedUser=null;
  }
  goBack()
  {
    this.location.back()
  }
}
