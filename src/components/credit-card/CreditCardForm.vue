<template>
  <form class="creditcard-form">
    <div class="form-group">
      <label for="cc-number">Card number</label>
      <input
        type="text"
        id="cc-number"
        placeholder="1111 2222 3333 4444 5555"
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
        placeholder="John Doe"
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
          placeholder="02/24"
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
          placeholder="123"
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
      <button
        class="button save"
        @click.prevent="saveCreditCard"
        :disabled="!formValid"
      >
        Save
      </button>
      <button
        class="button cancel"
        @click.prevent="closeHandler()"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
const cardValidator = require('card-validator');

export default {
  name: 'creditcard-form',
  props: {
    closeHandler: {
      type: Function,
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
      this.closeHandler();
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
.form-group {
  margin-bottom: 30px;

  label {
    display: block;
    font-size: 13px;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid $color-grey;
    transition: border-bottom-color 300ms linear;
    font-size: 20px;
    font-weight: bold;
    color: $color-dark-blue;
    padding: 5px 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $color-grey;
    }

    &.invalid {
      border-bottom-color: $color-red;
      transition: border-bottom-color 300ms linear;
    }

    &.valid {
      border-bottom-color: $color-green;
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
    color: $color-white;
    font-size: 20px;
    background-image: linear-gradient(to bottom right, $color-purple, $color-blue);
    border: 0;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 20px 0px $color-light-grey;
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
      background-image: linear-gradient(to bottom right, $color-dark-red, $color-red);
    }
  }
}
</style>
