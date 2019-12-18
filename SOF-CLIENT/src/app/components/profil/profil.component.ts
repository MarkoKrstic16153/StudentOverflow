import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  username:string;
  constructor(private route : ActivatedRoute,private router: Router,private location: Location) {
   }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      this.username=Params["username"];
      console.log(this.username);
    });
  }

  dodajtePitanje(){
    this.router.navigate(["dodajPitanje",this.username]);
  }
  goBack(){
    this.location.back();
  }
  pretrazitePitanja(){
    this.router.navigate(["pretragapitanja",this.username]);
  }
}
