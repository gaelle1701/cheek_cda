export interface IProductDetail {
    id: number;
    stock: number;
    price_ht: number;
    price_ttc: number;
    // size: Size[]
}
export type IProductDeatils = IProductDetail[]