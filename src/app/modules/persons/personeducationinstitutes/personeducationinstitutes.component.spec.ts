import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneducationinstitutesComponent } from './personeducationinstitutes.component';

describe('PersoneducationinstitutesComponent', () => {
  let component: PersoneducationinstitutesComponent;
  let fixture: ComponentFixture<PersoneducationinstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneducationinstitutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneducationinstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
