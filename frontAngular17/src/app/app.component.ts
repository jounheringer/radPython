import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Student} from '../shared/models/student';
import {FormsModule} from '@angular/forms';
import {StudentListComponent} from "./student-list/student-list.component";
import {AddStudentFormComponent} from "./add-student-form/add-student-form.component";
import {StudentFilterComponent} from "./student-filter/student-filter.component";
import {EventService} from "../shared/services/EventService"
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [EventService],
  imports: [RouterOutlet,
    FormsModule, StudentListComponent, AddStudentFormComponent, StudentFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items: Student[] = [
  ];

  constructor(events: EventService, private apiService: ApiService) {
    events.listen('removeStudent', (student: Student) => {
      let index = this.items.indexOf(student)
      this.items.splice(index, 1);
    })
  }

  ngOnInit() {
    this.apiService.getStudents().subscribe(
      (data) => {
        this.items = data
        console.log(data)
      })
  }

  filter: any = () => {
  }
}
