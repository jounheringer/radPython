import {Component, OnInit} from '@angular/core';
import {Student} from "../../shared/models/student";
import {EventService} from "../../shared/services/EventService";
import {ApiService} from "../../shared/services/api.service";
import {AddStudentFormComponent} from "./add-student-form/add-student-form.component";
import {StudentFilterComponent} from "./student-filter/student-filter.component";
import {StudentListComponent} from "./student-list/student-list.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    AddStudentFormComponent,
    StudentFilterComponent,
    StudentListComponent
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  items: Student[] = [];

  constructor(events: EventService, private apiService: ApiService) {
    events.listen('removeStudent', (student: Student) => {
      let index = this.items.indexOf(student)
      this.items.splice(index, 1);
    })
  }

  ngOnInit() {
    this.apiService.getStudents().subscribe(
      (data) => {
        {
          this.items = data
        }
      })
  }

  filter: any = () => {
  }
}
