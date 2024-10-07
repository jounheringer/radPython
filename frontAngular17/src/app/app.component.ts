import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StudentModule} from "./student/student.module";
import {EventService} from "../shared/services/EventService"
import {ContactModule} from "./contact/contact.module";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [EventService],
  imports: [
    RouterOutlet,
    FormsModule,
    StudentModule,
    ContactModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
