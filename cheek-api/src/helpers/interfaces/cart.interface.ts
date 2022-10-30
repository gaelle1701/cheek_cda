export type CartItem = {
  productId: number;
  stock: number;
  priceHt: number; // the ttc is calculate in cart.totalTtc
  size: number;
};

export interface ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;
}
