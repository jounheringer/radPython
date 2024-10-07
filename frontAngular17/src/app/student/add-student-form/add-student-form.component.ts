import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-student-form.component.html',
  styleUrl: './add-student-form.component.css'
})
export class AddStudentFormComponent { }
