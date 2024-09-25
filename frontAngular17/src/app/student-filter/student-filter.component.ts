import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Student } from '../../shared/models/student';
import { FormsModule } from '@angular/forms';

const filters = [
  (item: Student) => item,
  (item: Student) => item.aproved,
  (item: Student) => !item.aproved,
];

@Component({
  selector: 'app-student-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-filter.component.html',
  styleUrl: './student-filter.component.css'
})
export class StudentFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();
  constructor() { }

  listFilter: String = "0";

  ngOnInit(): void { 
    this.changeFilter('0')
  }

  changeFilter(value: any) {
    this.filter.emit(filters[value])
  }
}
