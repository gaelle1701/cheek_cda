import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ISize, ISizes } from 'src/app/core/interfaces/size';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';
import { ModalService } from '../../components/modal/modal.service';
import { ITableHeader } from '../../components/table/table.component';

@Component({
  selector: 'app-manage-sizes',
  templateUrl: './manage-sizes.component.html',
  styleUrls: ['./manage-sizes.component.css']
})
export class ManageSizesComponent implements OnInit {
  title = "Ajouter une taille";
  sizes: ISizes = [];
  msgSuccess: string = "";
  isDeleted: boolean = false;

   //icons
   faEdit = faPenToSquare;
   faDelete = faTrashCan;
   faAdd = faCirclePlus;
   faEye = faEye;

   //table
   headers?: ITableHeader[] = [
     { label: 'Taille', key: "label" },
     { label: 'ID', key: "id" },
     { label: 'Actions', key: "actions", editPath: "/admin/gestion-tailles/editer" }
   ]
  constructor(private sizesService: SizesService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getSizes();
  }

 getSizes(){
    this.sizesService.getAll(). subscribe( sizes => {
      this.sizes = sizes
      })
  }

  deleteSize(sizeId: number) {
    this.sizesService.delete(sizeId).subscribe((size: any) => {
      this.msgSuccess = size.message;
      this.isDeleted = true;
    })
  }

  openModal() {
    this.modalService.show('modal-1')
  }

  onCreate(size: ISize) {
    if (size.id) {
      this.getSizes()
      this.modalService.close()
    }
  }
}
