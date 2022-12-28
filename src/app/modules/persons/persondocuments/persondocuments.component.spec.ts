import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersondocumentsComponent } from './persondocuments.component';

describe('PersondocumentsComponent', () => {
  let component: PersondocumentsComponent;
  let fixture: ComponentFixture<PersondocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersondocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersondocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
