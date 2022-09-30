import { IProduct, IProducts } from "./product";

export interface ICategory {
    name: string;
    slug: string;
    products: IProducts
}

export type ICategories = ICategory[]