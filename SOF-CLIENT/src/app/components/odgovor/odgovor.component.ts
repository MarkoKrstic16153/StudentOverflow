import { Component, OnInit, Input } from '@angular/core';
import { Odgovor } from 'src/models/Odgovor';
import { Router } from '@angular/router';

@Component({
  selector: 'odgovor',
  templateUrl: './odgovor.component.html',
  styleUrls: ['./odgovor.component.css']
})
export class OdgovorComponent implements OnInit {
  @Input() odgovor: Odgovor;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  vidiProfil(user:string){
    console.log(user);
    this.router.navigate(["profil",user]);
  }
}
