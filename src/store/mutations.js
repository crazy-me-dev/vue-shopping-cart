export default {
  setProducts(state, products) {
    state.products = products;
  },
  incrementItemQuantity(state, product) {
    product.quantity++;
  },
  pushProductToCart(state, productId) {
    state.cart.push({
      id: productId,
      quantity: 1
    });
  },
  decrementProductInventory(state, product) {
    product.inventory--;
  },
  emptyCart(state) {
    state.cart = [];
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  }
};
