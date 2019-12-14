import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
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
      if (product.inventory > 0) {
        let cartItem = context.state.cart.find(
          product => product.id === product.id
        );
        if (cartItem) {
          context.commit("incrementItemQuantity", cartItem);
        } else {
          context.commit("pushProductToCart", product.id);
        }
        context.commit("decrementProductInventory", product);
      }
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
    }
  }
});

export default store;
