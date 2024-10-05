import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Student } from '../shared/models/student';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from "./student-list/student-list.component";
import { AddStudentFormComponent } from "./add-student-form/add-student-form.component";
import { StudentFilterComponent } from "./student-filter/student-filter.component";
import {EventService} from "../shared/services/EventService"

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [EventService],
  imports: [RouterOutlet,
    FormsModule, StudentListComponent, AddStudentFormComponent, StudentFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items : Student[] = [
    new Student("joao", false),
    new Student("maria", true),
    new Student("edu", false),
    new Student("thiago", true)
  ];
  title = "Alunos";

  constructor(events: EventService) {
    events.listen('removeStudent', (student: Student) => {
      let index = this.items.indexOf(student)
      this.items.splice(index, 1);
    })
  }

  filter: any = () => {}
}
