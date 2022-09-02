type CartItem = {
  id: number;
  quantity: number;
  price: any;
};

export interface ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;
}

export const INITIAL_CART: ICart = {
  items: [],
  totalHt: 0.0,
  totalTtc: 0.0,
  shippingFees: false,
};

const VAT_RATE = 0.2;

export class Cart implements ICart {
  items: CartItem[];
  totalHt: number;
  totalTtc: number;
  shippingFees: boolean;

  addProductToCart(item: CartItem, cart: ICart) {
    if (!this.productIsInCart(item.id, cart)) {
      cart.items?.push(item);
      this.calculateTotal(cart);
    } else {
      this.updateProductToCart(item.id, item.quantity, cart);
    }

    return cart;
  }

  updateProductToCart(productId: number, qty: number, cart) {
    cart.items = cart.items.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: (item.quantity += qty),
        };
      }
      return item;
    });
    this.calculateTotal(cart);

    return cart;
  }

  deleteProductToCart(productId: number, cart: ICart) {
    cart.items = cart.items?.filter((item) => item.id !== productId);
    this.calculateTotal(cart);
    return cart;
  }

  calculateTotal(cart: ICart) {
    const totalHt = cart.items.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0,
    );
    const totalTtc = cart.items.reduce(
      (acc, val) => (acc + val.price * VAT_RATE) * val.quantity,
      0,
    );
    cart.totalHt = totalHt;
    cart.totalTtc = totalHt + totalTtc;
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

  private productIsInCart(productId: number, cart) {
    return cart.items?.find((itm) => itm.id === productId) ? 1 : 0;
  }
}

export default new Cart();
