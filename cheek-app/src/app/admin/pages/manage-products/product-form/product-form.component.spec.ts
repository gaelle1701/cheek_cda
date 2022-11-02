import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesService } from 'src/app/products/services/categories.service';
import { PictureService } from 'src/app/products/services/pictures/picture.service';
import { ProductService } from 'src/app/products/services/product.service';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ ProductFormComponent ],
      providers: [ ProductService, PictureService, SizesService, CategoriesService ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //********** PRODUCT FORM**************** */

  it('should product form validity', () => {
    const form = component.productForm;
    const categorySelect = form.controls['category'];
    const nameInput = form.controls['name'];
    const descriptionInput = form.controls['description'];

    categorySelect.setValue('T-shirt');
    nameInput.setValue('New product');
    descriptionInput.setValue('Test new product');
    expect(form.valid).toBeTruthy();
  });

  it('should product form is invalid when empty', () => {
    const form = component.productForm;
    const categorySelect = form.controls['category'];
    const nameInput = form.controls['name'];
    const descriptionInput = form.controls['description'];

    categorySelect.setValue('');
    nameInput.setValue('');
    descriptionInput.setValue('');
    expect(form.valid).toBeFalsy()
  });

  it('should input product validity', () => {
    const form = component.productForm;
    const categorySelect = form.controls['category'];
    const nameInput = form.controls['name'];
    const descriptionInput = form.controls['description'];

    expect(categorySelect.valid).toBeFalsy();
    expect(nameInput.valid).toBeFalsy();
    expect(descriptionInput.valid).toBeFalsy();

    categorySelect.setValue('Autres');
    expect(categorySelect.valid).toBeTruthy();

    nameInput.setValue('New amazing product');
    expect(nameInput.valid).toBeTruthy();

    descriptionInput.setValue('Test amazing product');
    expect(descriptionInput.valid).toBeTruthy();
  });

  it('should input product errors', () => {
    const form = component.productForm;
    const categorySelect = form.controls['category'];
    const nameInput = form.controls['name'];
    const descriptionInput = form.controls['description'];

    expect(categorySelect?.errors?.['required']).toBeTruthy();
    expect(nameInput?.errors?.['required']).toBeTruthy();
    expect(descriptionInput?.errors?.['required']).toBeTruthy();

    categorySelect.setValue('T-shirt');
    expect(categorySelect.errors).toBeNull();

    categorySelect.setValue('A-B-C');
    expect(categorySelect.errors).toBeFalsy();

    nameInput.setValue('New super product');
    expect(nameInput.errors).toBeNull();
    
    descriptionInput.setValue('Test super new product');
    expect(descriptionInput.errors).toBeNull();
  });

  it('should show name category T-shirt as option in category select', () => {
    fixture.whenStable().then(() => {
      spyOn(component, 'onChangeCategory');
      const categorySelect = fixture.debugElement.nativeElement.querySelector('select');
      categorySelect.value = categorySelect.options[1].value;
      categorySelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(categorySelect.onChangeCategory).toHaveBeenCalled();
      expect(categorySelect.onChangeCategory).toHaveBeenCalledWith('T-shirt');
      expect(categorySelect.onChangeCategory).not.toEqual('Shoes')
    });
  });


//********** DETAILS FORM**************** */

  it('should details form validity', () => {
    const form = component.detailsForm;
    const sizeSelect = form.controls['size'];
    const price_htInput = form.controls['price_ht'];
    const stockInput = form.controls['stock'];

    sizeSelect.setValue('L');
    price_htInput.setValue('50.87');
    stockInput.setValue('3');
    expect(form.valid).toBeTruthy();
  });

  it('should details form is invalid when empty', () => {
    const form = component.detailsForm;
    const sizeSelect = form.controls['size'];
    const price_htInput = form.controls['price_ht'];
    const stockInput = form.controls['stock'];

    sizeSelect.setValue('');
    price_htInput.setValue('');
    stockInput.setValue('');
    expect(form.valid).toBeFalsy()
  });


  it('should input details validity', () => {
    const form = component.detailsForm;
    const sizeSelect = form.controls['size'];
    const price_htInput = form.controls['price_ht'];
    const stockInput = form.controls['stock'];

    sizeSelect.setValue('M');
    expect(sizeSelect.valid).toBeTruthy();

    price_htInput.setValue('100');
    expect(price_htInput.valid).toBeTruthy();

    stockInput.setValue('50');
    expect(stockInput.valid).toBeTruthy();
  });

  it('should input details errors and min length', () => {
    const form = component.detailsForm;
    const sizeSelect = form.controls['size'];
    const price_htInput = form.controls['price_ht'];
    const stockInput = form.controls['stock'];

    sizeSelect.setValue('XL');
    expect(sizeSelect.errors).toBeNull();
    sizeSelect.setValue(''); //minLength
    expect(sizeSelect.errors).toBeTruthy();
    sizeSelect.setValue('A-B-C');
    expect(sizeSelect.errors).toBeFalsy();

    price_htInput.setValue('New product');
    expect(price_htInput.errors).toBeNull();
    price_htInput.setValue(''); //minLength
    expect(price_htInput.errors).toBeTruthy();
    
    stockInput.setValue('Test new product');
    expect(stockInput.errors).toBeNull();
    stockInput.setValue(''); //minLength
    expect(stockInput.errors).toBeTruthy();
  });

  it('should show size M as option in size select', () => {
    fixture.whenStable().then(() => {
      spyOn(component, 'onChangeSize');
      const sizeSelect = fixture.debugElement.nativeElement.querySelector('select');
      sizeSelect.value = sizeSelect.options[1].value;
      sizeSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(sizeSelect.onChangeCategory).toHaveBeenCalled();
      expect(sizeSelect.onChangeCategory).toHaveBeenCalledWith('M');
      expect(sizeSelect.onChangeCategory).not.toEqual('S')
    });
  });

});

