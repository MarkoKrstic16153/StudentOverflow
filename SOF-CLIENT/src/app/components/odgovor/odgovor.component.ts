import { Component, OnInit, Input } from '@angular/core';
import { Odgovor } from 'src/models/Odgovor';

@Component({
  selector: 'odgovor',
  templateUrl: './odgovor.component.html',
  styleUrls: ['./odgovor.component.css']
})
export class OdgovorComponent implements OnInit {
  @Input() odgovor: Odgovor;
  constructor() { }

  ngOnInit() {
  }

}
