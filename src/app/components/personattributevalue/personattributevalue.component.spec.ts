import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonattributevalueComponent } from './personattributevalue.component';

describe('PersonattributevalueComponent', () => {
  let component: PersonattributevalueComponent;
  let fixture: ComponentFixture<PersonattributevalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonattributevalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonattributevalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
