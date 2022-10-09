import { IProductDetail } from './product-detail';

export interface IPicture {
  label: string;
  url: string;
  path: string;
  productDetail: IProductDetail;
}

export type IPictures = IPicture[];
