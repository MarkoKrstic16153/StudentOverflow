import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  username:string;
  constructor(private route : ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
      console.log(this.username);
    });
  }

}
