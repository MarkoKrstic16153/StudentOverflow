import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdgovorComponent } from './odgovor.component';

describe('OdgovorComponent', () => {
  let component: OdgovorComponent;
  let fixture: ComponentFixture<OdgovorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdgovorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdgovorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
