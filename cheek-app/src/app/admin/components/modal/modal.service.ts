import { Injectable } from '@angular/core';
import MicroModal from 'micromodal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {
    MicroModal.init({
      onClose: this.onClose,
      onShow: this.onShow
    })
  }

  show(targetId: string) {    
    return MicroModal.show(targetId)
  }

  close() {
    return MicroModal.close()
  }

  onShow(modal: any) {
    console.log(modal);
  }

  onClose(modal: any) {
    console.log(modal);
  }
}
