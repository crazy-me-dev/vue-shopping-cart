import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // context.commit, we deconstruct context to commit
      return new Promise(resolve => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  }
});

export default store;
