import { ICategory } from "../interfaces/category";
import { IProducts } from "../interfaces/product";

export class Category implements ICategory {
    products!: IProducts;
    name!: string;
    slug!: string;
    
}
