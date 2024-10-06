import { Component, Input } from '@angular/core';
import { Student } from '../../../shared/models/student';
import { StudentListItemComponent } from "../student-list-item/student-list-item.component";
import { FormsModule } from '@angular/forms';
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, StudentListItemComponent, NgForOf],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() items: Student[] = []

  toogleStudent(student: Student) {
    student.aproved = !student.aproved;
  }
}
