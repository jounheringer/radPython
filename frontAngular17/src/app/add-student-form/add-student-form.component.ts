import { Component, Output, EventEmitter } from '@angular/core';
import { Student } from '../../shared/models/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student-form.component.html',
  styleUrl: './add-student-form.component.css'
})
export class AddStudentFormComponent {
  @Output() addStudent = new EventEmitter<Student>()
  newStudentText = "";

  addNewStudent(student: string) {
    // this.addStudent.emit(new Student(student, false))
    this.newStudentText = ""
  }
}
