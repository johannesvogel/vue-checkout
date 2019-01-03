<template>
  <form class="checkout-form">
    <h2 class="headline">Your order:</h2>
    <OrderSummary :order="order" />
    <button class="button fullwidth">
      Pay {{ order.total }}&euro;<br>
      <span class="subline">with this card</span>
    </button>
  </form>
</template>

<script>
import OrderSummary from '@/components/OrderSummary.vue';

export default {
  name: 'checkout-form',
  components: {
    OrderSummary,
  },
  props: {
    activeCreditCard: {
      type: Object,
    },
    order: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-form {
  padding: 20px;
  width: 85%;
  flex-grow: 1;
  max-width: 290px;
  margin: 0 auto;
}

.button {
  margin: 0 auto 20px auto;
  padding: 10px 0;
  color: $color-white;
  font-size: 20px;
  background-image: linear-gradient(to bottom right, $color-purple, $color-blue);
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 20px 0px $color-light-grey;
  cursor: pointer;
  transition: all 300ms linear;

  &.fullwidth {
    width: 100%;
  }

  .subline {
    margin-top: 5px;
    font-size: 15px;
  }
}
</style>
