import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export interface ITableHeader{
  key: string;
  label: string;
  editPath?: (id: number) => void;
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

  @Output() updateAction = new EventEmitter<number>()
  @Output() deleteAction = new EventEmitter<number>()

  faEdit = faPenToSquare;
  faDelete = faTrashCan;

  constructor() { }

  ngOnInit(): void { console.log("table datas", this.datas);
  }

  onEdit(id: number) {
    this.updateAction.emit(id)
  }

  onDelete(id: number) {
    this.deleteAction.emit(id)
  }
}
