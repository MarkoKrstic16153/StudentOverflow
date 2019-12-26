import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { LoginService } from 'src/services/LoginService';
import { Socket } from 'ngx-socket-io';
import { QuestionsService } from 'src/services/QuestionsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Overflow';
  currentURL:Observable<any>;
  
  constructor(private route : ActivatedRoute,private router:Router,private qService:QuestionsService,private login:LoginService,private location:Location,private socket:Socket) {
    
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
  goProfile()
  {
    this.router.navigate(["profil",this.login.loggedUser]);
  }
  getMessage() {
    return this.socket
        .fromEvent("message").subscribe((data)=>{console.log(data)});
        
}
getObavestenja():any[]
{
  return this.qService.obavestenja;
}
removeNotification(index:number)
{ 
  this.qService.obavestenja.splice(index,1);
}
}
