<template>
  <form class="checkout-form">
    <h2 class="headline">Your order:</h2>
    <OrderSummary :order="order" />
    <button class="fullwidth-button">
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
      default: () => {},
    },
    order: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  flex-grow: 1;
  max-width: 290px;
  margin: 0 auto;
}
.headline {
  margin-bottom: 0;
}
.fullwidth-button {
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 10px 0;
  color: #ffffff;
  font-size: 20px;
  background-image: linear-gradient(to bottom right, #9272FE, #38B8FF);
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 20px 0px #C0CFFA;
  cursor: pointer;
  transition: all 300ms linear;

  .subline {
    margin-top: 5px;
    font-size: 15px;
  }
}
</style>
