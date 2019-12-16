import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaPitanjaComponent } from './pretraga-pitanja.component';

describe('PretragaPitanjaComponent', () => {
  let component: PretragaPitanjaComponent;
  let fixture: ComponentFixture<PretragaPitanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragaPitanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaPitanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
