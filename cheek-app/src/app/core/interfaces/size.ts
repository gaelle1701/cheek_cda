import { IProductDetail } from './product-detail';

export interface ISize {
  id?: number;
  label: string;
  details: IProductDetail[];
}

export type ISizes = ISize[];

export type CreateResponse = ISize & {
  message?: string;
};

export type UpdateResponse = ISize & {
  message?: string;
}