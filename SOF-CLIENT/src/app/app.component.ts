import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Overflow';
  currentURL:Observable<any>;
  constructor(private route : ActivatedRoute,private router:Router) {
    
  }
  ngOnInit() {
    this.currentURL=this.route.url;
  }
}
