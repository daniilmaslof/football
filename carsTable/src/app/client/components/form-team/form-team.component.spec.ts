import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeamComponent } from './form-team.component';

describe('FormTeamComponent', () => {
  let component: FormTeamComponent;
  let fixture: ComponentFixture<FormTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
