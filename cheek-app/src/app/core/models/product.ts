import { CategoryI } from "../interfaces/category";
import { ProductI } from "../interfaces/product.ts";

export class Product implements ProductI {
    map(arg0: (product: any) => any): never[] {
      throw new Error('Method not implemented.');
    }
    name!: string;
    description!: string;
    slug!: string;
    category!: CategoryI;
}
