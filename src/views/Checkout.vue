<template>
  <div class="checkout">
    <TopHeader />
    <a href="#" class="add-cc-button" @click.prevent="showCreditCardForm = true">+</a>
    <CreditCardSwiper
      :creditCards="creditCards"
      @creditCardChanged="onCreditCardChanged"
    />
    <Overlay
      v-if="showError"
      :closeHandler="closeError"
      headline="Error"
    >
      <p>{{ errorMessage }}</p>
    </Overlay>
    <Overlay
      v-if="showCreditCardForm"
      :closeHandler="closeCreditCardForm"
      headline="Add new credit card"
    >
      <CreditCardForm
        @saveCreditCardForm="onSaveCreditCardForm"
        :closeHandler="closeCreditCardForm"
      />
    </Overlay>
    <CheckoutForm
      :activeCreditCard="activeCreditCard"
      :order="order"
    />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';
import Overlay from '@/components/Overlay.vue';
import CreditCardSwiper from '@/components/CreditCardSwiper.vue';
import CreditCardForm from '@/components/CreditCardForm.vue';
import CheckoutForm from '@/components/CheckoutForm.vue';

const cardValidator = require('card-validator');

export default {
  name: 'checkout',
  components: {
    TopHeader,
    Overlay,
    CreditCardSwiper,
    CreditCardForm,
    CheckoutForm,
  },
  data() {
    return {
      creditCards: [
        {
          id: 0,
          ccType: 'visa',
          ccNumber: '4012888888881881',
          ccName: 'Max Mustermann',
          ccExpiry: '06/21',
        },
        {
          id: 1,
          ccType: 'mastercard',
          ccNumber: '5105105105105100',
          ccName: 'John Doe',
          ccExpiry: '03/19',
        },
        {
          id: 2,
          ccType: 'mastercard',
          ccNumber: '5555555555554444',
          ccName: 'Monsieur Dupont',
          ccExpiry: '12/23',
        },
      ],
      activeCreditCardId: null,
      showCreditCardForm: false,
      errorMessage: '',
      showError: false,
      order: {
        items: [
          {
            id: 0,
            name: 'Product #1',
            price: 29.99,
          },
          {
            id: 1,
            name: 'Product #2',
            price: 45.99,
          },
        ],
        shipping: 4.99,
        total: 80.97,
      },
    };
  },
  computed: {
    activeCreditCard() {
      return this.creditCards.find(cc => cc.id === this.activeCreditCardId);
    },
  },
  methods: {
    onSaveCreditCardForm(creditCard) {
      const ccNumberValidator = cardValidator.number(creditCard.ccNumber);
      const ccExpiryValidator = cardValidator.expirationDate(creditCard.ccExpiry);
      const ccNameValid = creditCard.ccName.length > 0;
      const creditCardValid = ccNumberValidator.isValid && ccExpiryValidator.isValid && ccNameValid;

      if (creditCardValid) {
        const newCard = creditCard;
        newCard.id = this.creditCards.length;
        this.creditCards.push(newCard);
      } else {
        this.errorMessage = 'This credit card is not valid.';
        this.showError = true;
      }
    },
    onCreditCardChanged(creditCardId) {
      this.activeCreditCardId = creditCardId;
    },
    closeError() {
      this.showError = false;
    },
    closeCreditCardForm() {
      this.showCreditCardForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.add-cc-button {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  padding: 20px 20px;
  text-decoration: none;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
</style>
