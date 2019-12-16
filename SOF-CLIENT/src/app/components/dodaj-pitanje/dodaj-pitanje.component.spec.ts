import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPitanjeComponent } from './dodaj-pitanje.component';

describe('DodajPitanjeComponent', () => {
  let component: DodajPitanjeComponent;
  let fixture: ComponentFixture<DodajPitanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPitanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPitanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
