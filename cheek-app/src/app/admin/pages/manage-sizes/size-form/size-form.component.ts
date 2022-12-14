import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ISize } from 'src/app/core/interfaces/size';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.css']
})
export class SizeFormComponent implements OnInit {
  title = "Ajouter une taille";

  @Input() sizeId!: number
  @Output() sizeAction = new EventEmitter<ISize>()

  /**** ICONS ****/
  faAdd = faCirclePlus;

  sizeForm: FormGroup = new FormGroup({
    label: new FormControl('')
  });

  isCreated: boolean = false;
  isUpdated: boolean = false;
  msgSuccessCreate: string = '';
  msgSuccessUpdate: string = '';
  msgError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private sizeService: SizesService
  ) { }

  ngOnInit(): void {    
    this.sizeForm = this.formBuilder.group({
      label: ['', [Validators.required]]
    })
    
    if(this.sizeId){    
      this.sizeService.getOne(this.sizeId).subscribe(size => {
        this.sizeForm = this.formBuilder.group({
          label: [size.label, [Validators.required]]
        })
      })
    }

  }

  get f() {
    return this.sizeForm.controls;
  }

  onSubmit() {
    const formValues = this.sizeForm.value;

    if(this.sizeId && this.sizeForm.valid) {
      this.sizeService.update(this.sizeId, formValues).subscribe({    
        next: (res) => {
          this.isUpdated = true;
          this.msgSuccessUpdate = res.message as string;
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      })
    } else if(this.sizeForm.valid) {
      this.sizeService.create(formValues).subscribe({
        next: (size) => {
          this.isCreated = true;
          this.msgSuccessCreate = size.message as string;
          this.sizeAction.emit(size)
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      })
    }}

}
