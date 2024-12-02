import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearStudentDataComponent } from './clear-student-data.component';

describe('ClearStudentDataComponent', () => {
  let component: ClearStudentDataComponent;
  let fixture: ComponentFixture<ClearStudentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearStudentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
