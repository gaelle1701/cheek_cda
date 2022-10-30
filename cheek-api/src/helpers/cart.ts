import { CartItem, ICart } from './interfaces/cart.interface';

export const INITIAL_CART: ICart = {
  items: [],
  totalHt: 0.0,
  totalTtc: 0.0,
  shippingFees: false,
};

const VAT_RATE = 20; // TAX FOR FRENCH COUNTRY

export class Cart implements ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;

  addProductToCart(item: CartItem, cart: ICart) {
    if (!this.productIsInCart(item.productId, item.size, cart)) {
      cart.items?.push(item);
      this.calculateTotal(cart);
    } else {
      this.updateProductToCart(item.productId, item.stock, item.size, cart);
    }
    return cart;
  }

  updateProductToCart(
    productId: number,
    stock: number,
    size: number,
    cart: ICart,
  ) {
    cart.items = cart.items.map((item) => {
      if (item.productId === productId && item.size === size) {
        return {
          ...item,
          stock: (item.stock += stock),
        };
      }
      return item;
    });
    this.calculateTotal(cart);
    return cart;
  }

  deleteProductToCart(productId: number, sizeId: number, cart: ICart) {
    const itemToDelete = cart.items.findIndex(
      (item) => item.productId === productId && item.size === sizeId,
    );
    cart.items.splice(itemToDelete, 1);
    this.calculateTotal(cart);
    return cart;
  }

  calculateTotal(cart: ICart) {
    cart.totalHt = cart.items.reduce(
      (acc, val) => acc + val.priceHt * val.stock,
      0,
    );
    cart.totalTtc = cart.totalHt * (1 + VAT_RATE / 100);
    cart.shippingFees = cart.totalTtc >= 70;

    if (!cart.items.length) {
      this.resetCart(cart);
    }

    return cart;
  }

  resetCart(cart: ICart) {
    cart.items = [];
    cart.totalHt = 0;
    cart.totalTtc = 0;
    cart.shippingFees = false;
    return cart;
  }

  private productIsInCart(productId: number, sizeId: number, cart: ICart) {
    return cart.items?.find(
      (itm) => itm.productId === productId && itm.size === sizeId,
    )
      ? 1
      : 0;
  }
}

export default new Cart();
