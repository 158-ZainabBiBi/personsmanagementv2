import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoncommunicationsmssComponent } from './personcommunicationsmss.component';

describe('PersoncommunicationsmssComponent', () => {
  let component: PersoncommunicationsmssComponent;
  let fixture: ComponentFixture<PersoncommunicationsmssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoncommunicationsmssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoncommunicationsmssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
