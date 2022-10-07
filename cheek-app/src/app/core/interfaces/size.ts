import { IProductDetail } from './product-detail';

export interface ISize {
  label: string;
  details: IProductDetail[];
}

export type Sizes = ISize[];
