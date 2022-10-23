import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import MicroModal from 'micromodal';

import { ISize, ISizes } from 'src/app/core/interfaces/size';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';
import { ITableHeader } from '../../components/table/table.component';

@Component({
  selector: 'app-manage-sizes',
  templateUrl: './manage-sizes.component.html',
  styleUrls: ['./manage-sizes.component.css']
})
export class ManageSizesComponent implements OnInit {
  title = "";
  sizes: ISizes = [];

  sizeId!: number;
  msgSuccess: string = "";
  isDeleted: boolean = false;
  isOpenModal: boolean = false;

  //icons
  faEdit = faPenToSquare;
  faDelete = faTrashCan;
  faAdd = faCirclePlus;
  faEye = faEye;

  //table
  headers?: ITableHeader[] = [
    { label: 'Taille', key: "label" },
    { label: 'Actions', key: "actions" }
  ]

  constructor(private sizesService: SizesService) { }

  ngOnInit(): void {
    this.getSizes();

    if(this.sizes.length > 0) {
      MicroModal.init({openTrigger: 'data-custom-open'})
    }

    if(!this.sizeId) {
      this.title = "Ajouter une taille"
    }
  }

  getSizes(){
    this.sizesService.getAll(). subscribe( sizes => {
      this.sizes = sizes;
    })
  }

  editSize(sizeId: number) {
    this.title = "Modifier la taille";
    this.sizeId = sizeId;
    this.isOpenModal = true;
    this.openModal()
  }

  deleteSize(sizeId: number) {
    this.sizesService.delete(sizeId).subscribe((size: any) => {
      this.msgSuccess = size.message;
      this.isDeleted = true;
      this.getSizes()
    })
  }

  openModal() {
    if(this.sizeId) {
      MicroModal.show(`modal-${this.sizeId}`)
    } else {
      MicroModal.show(`modal-999`)
    }
  }

  onCreate(size: ISize) {
    if (size) {
      this.getSizes()
      MicroModal.close()
    }
  }
}
