import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListProductComponent } from './page-list-product.component';

describe('PageListProductComponent', () => {
  let component: PageListProductComponent;
  let fixture: ComponentFixture<PageListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
