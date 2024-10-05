import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import events from "./../../shared/services/EventService"

@Component({
  selector: 'app-student-list-item',
  standalone: true,
  imports: [],
  templateUrl: './student-list-item.component.html',
  styleUrl: './student-list-item.component.css'
})
export class StudentListItemComponent implements OnInit {
  @Input() name : string = "";

  @Input() approved: boolean = false;
  @Output() approvedChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {

  }

  removeStudent() {
    events.emit('removeStudent', this.name);
  }

  toogleApproved(){
    this.approved = !this.approved
    this.approvedChange.emit(this.approved)
  }
}
