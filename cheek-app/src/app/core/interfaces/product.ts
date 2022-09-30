import { ICategory } from "./category";
import { IProductDetail } from "./product-detail";


export interface IProduct {
    id: number;
    name: string;
    description: string;
    slug: string;

    category: ICategory;
  
    details: IProductDetail[];

    // orderLines: OrderLines[];
}
export type IProducts = IProduct[]