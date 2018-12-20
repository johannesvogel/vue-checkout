<template>
  <form class="checkout-form">
    <button class="fullwidth-button">Pay 125€<div class="subline">with this card</div></button>
  </form>
</template>

<script>
export default {
  name: 'checkout-form',
  components: {},
  props: {
    activeCreditCard: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.checkout-form {
  padding: 20px;
  max-width: 290px;
  margin: auto;
}
.fullwidth-button {
  width: 100%;
  margin: auto;
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
