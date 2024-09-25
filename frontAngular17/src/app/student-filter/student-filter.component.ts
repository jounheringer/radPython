import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() filter: any
  @Output() filterChange = new EventEmitter<any>();
  constructor() { }

  listFilter: String = "0";

  ngOnInit(): void { 
    this.updateFilter('0')
  }

  updateFilter(value: any) {
    this.filter = filters[value]
    this.filterChange.emit(this.filter)
  }
}
