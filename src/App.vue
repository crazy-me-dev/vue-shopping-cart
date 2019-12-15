<template>
  <div id="app">
    <ProductList msg="Welcome to Your Vue.js App" />
    <hr />
    <ShoppingCart></ShoppingCart>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

export default {
  name: "app",
  components: {
    ProductList,
    ShoppingCart
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
