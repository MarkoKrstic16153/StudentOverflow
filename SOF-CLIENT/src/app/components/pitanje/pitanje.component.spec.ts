import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitanjeComponent } from './pitanje.component';

describe('PitanjeComponent', () => {
  let component: PitanjeComponent;
  let fixture: ComponentFixture<PitanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
