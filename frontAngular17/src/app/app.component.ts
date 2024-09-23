import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { Student } from '../shared/models/student';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from "./student-list/student-list.component";
import { AddStudentFormComponent } from "./add-student-form/add-student-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule, StudentListComponent, AddStudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items : Student[] = [];
  title = "Alunos";
  
  listFilter: String = "0";

  newStudentText = "";
  
  addNewStudent(student: Student) {
    this.items.push(student)
    this.newStudentText = ""
  }

  get visibleList(): Student[] {
    let value = this.listFilter
      switch (value){
        case "0":
          return this.items
        case "1":
          return this.items.filter(item => item.aproved)
        case "2":
          return this.items.filter(item => !item.aproved)
        default:
          return [];
    }
  }
}
// export class  AppComponent implements OnInit {
//   message: string = "";

//   constructor(private apiService: ApiService) {}

//   ngOnInit() {
//     this.apiService.getMessage().subscribe(data => {
//       this.message = data.message
//     })
//   }
// }
