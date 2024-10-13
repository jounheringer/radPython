import { Component, Input } from '@angular/core';
import { Student } from '../../../shared/models/student';
import { StudentListItemComponent } from "../student-list-item/student-list-item.component";
import { FormsModule } from '@angular/forms';
import {NgForOf} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";
import {EventService} from "../../../shared/services/EventService";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, StudentListItemComponent, NgForOf, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() items: Student[] = []

  constructor(private api: ApiService, private events: EventService) { }

  removeStudent(student: Student) {
    this.events.emit('removeStudent', student.id);
    this.api.removeStudent(student.id).subscribe()
  }

  toogleApproved(student: Student){
    student.aproved = !student.aproved
  }
}
