import { Component, Input } from '@angular/core';
import { Student } from '../../shared/models/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() items: Student[] = []

  toogleStudent(student: Student) {
    student.aproved = !student.aproved;
  }
}
