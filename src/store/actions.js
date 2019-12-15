import shop from "@/api/shop";

export default {
  fetchProducts(context) {
    return new Promise(resolve => {
      shop.getProducts(products => {
        context.commit("setProducts", products);
        resolve();
      });
    });
  },
  addProductToCart(context, product) {
    if (context.getters.productIsInStock(product)) {
      let cartItem = context.state.cart.find(p => p.id === product.id);
      if (cartItem) {
        context.commit("incrementItemQuantity", cartItem);
      } else {
        context.commit("pushProductToCart", product.id);
      }
      context.commit("decrementProductInventory", product);
    }
  },
  checkout(context) {
    shop.buyProducts(
      context.state.cart,
      () => {
        context.commit("emptyCart");
        context.commit("setCheckoutStatus", "Success");
      },
      () => {
        context.commit("setCheckoutStatus", "Fail");
      }
    );
  }
};
