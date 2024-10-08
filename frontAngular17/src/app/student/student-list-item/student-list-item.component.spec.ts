import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListItemComponent } from './student-list-item.component';

describe('StudentListItemComponent', () => {
  let component: StudentListItemComponent;
  let fixture: ComponentFixture<StudentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
