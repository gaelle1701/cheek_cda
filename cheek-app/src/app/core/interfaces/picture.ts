import { IProduct } from './product';

export interface IPicture {
  label: string;
  url: string;
  path: string;
  product: IProduct;
}

export type IPictures = IPicture[];
