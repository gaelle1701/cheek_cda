import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export interface ITableHeader{
  key: string;
  label: string;
  editPath?: string;
  subHeaders?: ITableSubHeader[]
}

export interface ITableSubHeader{
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() datas?: any[] = []
  @Input() headers?: ITableHeader[];

  @Output() deleteAction = new EventEmitter<number>()

  faEdit = faPenToSquare;
  faDelete = faTrashCan;

  constructor() { }

  ngOnInit(): void {
    console.log( "data: ",this.datas);
  }

  onDelete(id: number) {
    this.deleteAction.emit(id)
  }
}
