import { IProductDetail } from './product-detail';

export interface IPicture {
  label: string;
  url: string;
  productDetail: IProductDetail;
}

export type Pictures = IPicture[];
