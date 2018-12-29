<template>
  <div class="order-summary">
    <table class="summary-table">
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
  </div>
</template>

<script>

export default {
  name: 'order-summary',
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.summary-table {
  border-spacing: 5px;
  width: 100%;

  .total td,
  .shipping td {
    padding-top: 10px;
  }
}
</style>
