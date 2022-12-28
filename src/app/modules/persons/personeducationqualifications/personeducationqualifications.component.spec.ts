import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneducationqualificationsComponent } from './personeducationqualifications.component';

describe('PersoneducationqualificationsComponent', () => {
  let component: PersoneducationqualificationsComponent;
  let fixture: ComponentFixture<PersoneducationqualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneducationqualificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneducationqualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
