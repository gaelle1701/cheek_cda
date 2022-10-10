import { ICategory } from './category';
import { IPictures } from './picture';
import { IProductDetails } from './product-detail';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  slug: string;
  category: ICategory;
  pictures: IPictures;
  details: IProductDetails;

  // orderLines: OrderLines[];
}

export type IProducts = IProduct[];
