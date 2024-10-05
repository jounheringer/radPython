import { Component, Input, OnInit } from '@angular/core';
import {EventService} from "../../shared/services/EventService"
import {Student} from "../../shared/models/student";

@Component({
  selector: 'app-student-list-item',
  standalone: true,
  imports: [],
  templateUrl: './student-list-item.component.html',
  styleUrl: './student-list-item.component.css'
})
export class StudentListItemComponent implements OnInit {
  @Input() student! : Student;

  constructor(private events: EventService) {}

  ngOnInit(): void {

  }

  removeStudent() {
    this.events.emit('removeStudent', this.student.name);
  }

  toogleApproved(){
    this.student.aproved = !this.student.aproved
  }
}
