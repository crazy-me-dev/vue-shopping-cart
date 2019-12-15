import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
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
  },
  actions: {
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
  },
  mutations: {
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
  }
});

export default store;
