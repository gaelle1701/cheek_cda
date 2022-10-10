import { ISize } from './size';

export interface IProductDetail {
  id: number;
  stock: number;
  price_ht: number;
  price_ttc: number;
  size: ISize;
}
export type IProductDetails = IProductDetail[];
