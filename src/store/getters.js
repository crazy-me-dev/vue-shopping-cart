export default {
  availableProducts(state) {
    return state.products.filter(product => product.inventory > 0);
  },
  cartProducts(state) {
    return state.cart.map(item => {
      const product = state.products.find(p => p.id === item.id);
      return {
        title: product.title,
        price: product.price,
        quantity: item.quantity
      };
    });
  },
  cartTotal(state, getters) {
    let total = 0;
    getters.cartProducts.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  },
  productIsInStock() {
    return product => product.inventory > 0;
  }
};
