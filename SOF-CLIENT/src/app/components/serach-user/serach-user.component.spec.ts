import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachUserComponent } from './serach-user.component';

describe('SerachUserComponent', () => {
  let component: SerachUserComponent;
  let fixture: ComponentFixture<SerachUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerachUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
