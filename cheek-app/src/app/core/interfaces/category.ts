import { IProduct, IProducts } from './product';

export interface ICategory {
  id: number,
  name: string;
  slug: string;
  products: IProducts;
}

export type ICategories = ICategory[];
