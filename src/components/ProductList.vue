<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="@/assets/spinner.gif" />
    <ul v-else>
      <li
        v-for="product in products"
        v-bind:key="product.name"
      >{{product.title}} - {{product.price}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  }
};
</script>