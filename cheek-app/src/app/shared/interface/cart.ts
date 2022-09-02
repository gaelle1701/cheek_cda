export interface CartItem {
  id: number;
  quantity: number;
  price: any;
}

export interface ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;
}
