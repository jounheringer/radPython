import { Component, Output } from '@angular/core';
import { Student } from '../../shared/models/student';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student-form.component.html',
  styleUrl: './add-student-form.component.css'
})
export class AddStudentFormComponent {
  // @Output() addStudent = new EventEmitter<>();
  newStudentText = "";
  
  addNewStudent() {
    // this.items.push(new Student(this.newStudentText, false))
    this.newStudentText = ""
  }
}
