type CartItem = {
  id: number; // id de quoi ???
  stock: number;
  price: number; // price_ht ou ttc ???
  size: string;
};

export interface ICart {
  items: CartItem[];
  total_ht: number;
  total_ttc: number;
  shippingFees: boolean;
}

export const INITIAL_CART: ICart = {
  items: [],
  total_ht: 0.0,
  total_ttc: 0.0,
  shippingFees: false,
};

const VAT_RATE = 0.2; // ????

export class Cart implements ICart {
  items: CartItem[];
  total_ht: number;
  total_ttc: number;
  shippingFees: boolean;

  addProductToCart(item: CartItem, cart: ICart) {
    if (!this.productIsInCart(item.id, cart)) {
      cart.items?.push(item);
      this.calculateTotal(cart);
    } else {
      this.updateProductToCart(item.id, item.stock, item.size, cart);
    }
    return cart;
  }

  updateProductToCart(productId: number, stock: number, size: string, cart) {
    cart.items = cart.items.map((item) => {
      if (item.id === productId && item.size === size) {
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

  deleteProductToCart(productId: number, cart: ICart) {
    cart.items = cart.items?.filter((item) => item.id !== productId);
    this.calculateTotal(cart);
    return cart;
  }

  calculateTotal(cart: ICart) {
    const totalHt = cart.items.reduce(
      (acc, val) => acc + val.price * val.stock,
      0,
    );
    const totalTtc = cart.items.reduce(
      (acc, val) => (acc + val.price * VAT_RATE) * val.stock,
      0,
    );
    cart.total_ht = totalHt;
    cart.total_ttc = totalTtc;
    cart.shippingFees = totalTtc >= 70;

    if (!cart.items.length) {
      this.resetCart(cart);
    }

    return cart;
  }

  resetCart(cart: ICart) {
    cart.items = [];
    cart.total_ht = 0;
    cart.total_ttc = 0;
    cart.shippingFees = false;
    return cart;
  }

  private productIsInCart(productId: number, cart) {
    return cart.items?.find((itm) => itm.id === productId) ? 1 : 0;
  }
}

export default new Cart();
