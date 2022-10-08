export interface CartItem {
  id: number;
  stock: number;
  price: number;
  size: string;
}

export interface ICart {
  items: CartItem[];
  total_ht: number;
  total_ttc: number;
  shippingFees: boolean;
}
