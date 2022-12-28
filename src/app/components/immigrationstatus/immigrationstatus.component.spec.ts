import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationstatusComponent } from './immigrationstatus.component';

describe('ImmigrationstatusComponent', () => {
  let component: ImmigrationstatusComponent;
  let fixture: ComponentFixture<ImmigrationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmigrationstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
