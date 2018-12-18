<template>
  <form class="checkout-form">
    <div class="form-group">
      <label for="cc-number">Card number</label>
      <input
        type="text"
        id="card-number"
        v-model="creditCard.ccNumber"
        :class="{ invalid: ccNumberInvalid, valid: ccNumberValid }"
      >
    </div>
    <div class="form-group">
      <label for="cc-name">Cardholder name</label>
      <input type="text" id="cc-name" v-model="creditCard.ccName">
    </div>
    <div class="row">
      <div class="form-group">
        <label for="cc-expiry">Expiry date</label>
        <input type="text" id="cc-expiry" v-model="creditCard.ccExpiry">
      </div>
      <div class="form-group">
        <label for="cc-cvv">CVV</label>
        <input type="password" id="cc-cvv" autocomplete="off">
      </div>
    </div>
    <button class="fullwidth-button">Pay 123€</button>
  </form>
</template>

<script>
const cardValidator = require('card-validator');

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
    return {
      creditCard: {
        id: null,
        ccType: '',
        ccNumber: '',
        ccName: '',
        ccExpiry: '',
      },
      ccNumberInvalid: false,
      ccNumberValid: false,
    };
  },
  methods: {
    formatCreditCardNumber(value) {
      if (!value) return '';
      const ccNumber = value.toString();
      return ccNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
    },
  },
  watch: {
    activeCreditCard: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.creditCard = newVal;
        }
      },
    },
    creditCard: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && newVal.ccNumber) {
          const ccValidation = cardValidator.number(newVal.ccNumber);
          this.ccNumberInvalid = !ccValidation.isPotentiallyValid;
          this.ccNumberValid = ccValidation.isValid;
          this.creditCard.ccType = ccValidation.card ? ccValidation.card.type : null;
          this.creditCard.ccNumber = this.formatCreditCardNumber(newVal.ccNumber);
        }
      },
    },
  },
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
}
.form-group {
  margin-bottom: 30px;

  label {
    display: block;
    color: #D7D9E1;
    font-size: 13px;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #D7D9E1;
    transition: border-bottom-color 300ms linear;
    font-size: 20px;
    font-weight: bold;
    color: #0133B5;
    padding: 5px 0;

    &:focus {
      outline: none;
    }

    &.invalid {
      border-bottom-color: red;
      transition: border-bottom-color 300ms linear;
    }

    &.valid {
      border-bottom-color: green;
      transition: border-bottom-color 300ms linear;
    }
  }
}
.row {
  display: flex;
  justify-content: space-between;

  .form-group {
    flex-grow: 1;
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
