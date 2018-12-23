<template>
  <form class="creditcard-form">
    <div class="creditcard-form-container">
      <h2 class="headline">Add new credit card</h2>
      <div class="form-group">
        <label for="cc-number">Card number</label>
        <input
          type="text"
          id="card-number"
          v-model="creditCard.ccNumber"
          :class="{
            invalid: !cardNumberValidator.isPotentiallyValid,
            valid: cardNumberValidator.isValid
          }"
        >
      </div>
      <div class="form-group">
        <label for="cc-name">Cardholder name</label>
        <input
          type="text"
          id="cc-name"
          v-model="creditCard.ccName"
          :class="{ valid: ccNameValid }"
        >
      </div>
      <div class="row">
        <div class="form-group">
          <label for="cc-expiry">Expiry date</label>
          <input
            type="text"
            id="cc-expiry"
            v-model="creditCard.ccExpiry"
            :class="{
              invalid: !expirationValidator.isPotentiallyValid,
              valid: expirationValidator.isValid
            }"
          >
        </div>
        <div class="form-group">
          <label for="cc-cvv">CVV</label>
          <input
            type="password"
            id="cc-cvv"
            v-model="cvv"
            :class="{
              invalid: !cvvValidator.isPotentiallyValid,
              valid: cvvValidator.isValid
            }"
            autocomplete="off"
          >
        </div>
      </div>
      <div class="row">
        <button class="button" @click.prevent="saveCreditCard" :disabled="!formValid">Save</button>
        <button class="button cancel" @click.prevent="closeForm">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
const cardValidator = require('card-validator');

export default {
  name: 'creditcard-form',
  components: {},
  props: {},
  data() {
    return {
      creditCard: {
        id: null,
        ccType: '',
        ccNumber: '',
        ccName: '',
        ccExpiry: '',
      },
      cvv: '',
    };
  },
  computed: {
    cardNumberValidator() {
      return cardValidator.number(this.creditCard.ccNumber);
    },
    ccNameValid() {
      return this.creditCard.ccName.length > 0;
    },
    expirationValidator() {
      return cardValidator.expirationDate(this.creditCard.ccExpiry);
    },
    cvvValidator() {
      return cardValidator.cvv(this.cvv);
    },
    formValid() {
      return this.cardNumberValidator.isValid
        && this.ccNameValid
        && this.expirationValidator.isValid
        && this.cvvValidator.isValid;
    },
  },
  methods: {
    formatCreditCardNumber(value) {
      if (!value) return '';
      const ccNumber = value.toString();
      return ccNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
    },
    saveCreditCard() {
      this.$emit('saveCreditCardForm', this.creditCard);
    },
    closeForm() {
      this.$emit('closeForm');
    },
  },
  watch: {
    activeCreditCard: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.creditCard = newVal;
          this.cvv = '';
        }
      },
    },
    creditCard: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && 'ccNumber' in newVal) {
          this.creditCard.ccNumber = this.formatCreditCardNumber(newVal.ccNumber);
          if (this.cardNumberValidator.card) {
            this.creditCard.ccType = this.cardNumberValidator.card.type;
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.creditcard-form {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}
.creditcard-form-container {
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  max-width: 290px;
  margin: auto;
  color: #333;
}
.headline {
  margin: 0 0 30px 0;
  font-size: 20px;
  text-align: center;
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

  .button {
    flex-grow: 1;
    margin-right: 30px;
    padding: 10px 0;
    color: #ffffff;
    font-size: 20px;
    background-image: linear-gradient(to bottom right, #9272FE, #38B8FF);
    border: 0;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 20px 0px #C0CFFA;
    cursor: pointer;
    transition: all 300ms linear;

    &:disabled {
      filter: grayscale(100%);
      transition: all 300ms linear;
    }

    &:last-child {
      margin-right: 0;
    }

    &.cancel {
      background-image: linear-gradient(to bottom right, darkred, red);
    }
  }
}
</style>
