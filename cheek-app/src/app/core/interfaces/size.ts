import { IProductDetail } from './product-detail';

export interface ISize {
  id?: number;
  label: string;
  details: IProductDetail[];
}

export type ISizes = ISize[];
