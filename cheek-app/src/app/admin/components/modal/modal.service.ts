import { Injectable } from '@angular/core';
import MicroModal from 'micromodal';

MicroModal.init({
  onShow: modal => console.info(`${modal?.id} is shown`), 
  onClose: modal => console.info(`${modal?.id} is hidden`),
})

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {

  }

  show(targetId: string) {  
    console.log(targetId)  
    MicroModal.show(targetId)
  }

  close() {
    MicroModal.close()
  }

  onShow(modal: any) {
    console.log(modal);
  }

  onClose(modal: any) {
    console.log(modal);
  }
}
