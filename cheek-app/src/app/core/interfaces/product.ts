import { ICategory } from "./category";
import { IProductDetail, IProductDetails } from "./product-detail";


export interface IProduct {
    id: number;
    name: string;
    description: string;
    slug: string;
    category: ICategory;
    details: IProductDetails;

    // orderLines: OrderLines[];
}

export type IProducts = IProduct[]