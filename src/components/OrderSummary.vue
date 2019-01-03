<template>
  <table class="order-summary">
    <tbody>
      <tr v-for="item in order.items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }} &euro;</td>
      </tr>
      <tr class="shipping">
        <td><i>Shipping &amp; Handling</i></td>
        <td><i>{{ order.shipping }} &euro;</i></td>
      </tr>
      <tr class="total">
        <td><strong>Total</strong></td>
        <td><strong>{{ order.total }} &euro;</strong></td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'order-summary',
  props: {
    order: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.order-summary {
  border-spacing: 5px;
  width: 100%;
  margin-bottom: 20px;

  .total td,
  .shipping td {
    padding-top: 10px;
  }
}
</style>
