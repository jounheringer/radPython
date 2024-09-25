import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { Student } from '../shared/models/student';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from "./student-list/student-list.component";
import { AddStudentFormComponent } from "./add-student-form/add-student-form.component";
import { StudentFilterComponent } from "./student-filter/student-filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule, StudentListComponent, AddStudentFormComponent, StudentFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items : Student[] = [];
  title = "Alunos";
  
  filter: any = () => {}
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
