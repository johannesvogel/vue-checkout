<template>
  <div class="checkout">
    <TopHeader />
    <CreditCardSwiper
      :creditCards="creditCards"
      @creditCardChanged="onCreditCardChanged"
      @addNewCreditCard="onAddNewCreditCard"
    />
    <CheckoutForm :activeCreditCard="activeCreditCard" />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';
import CreditCardSwiper from '@/components/CreditCardSwiper.vue';
import CheckoutForm from '@/components/CheckoutForm.vue';

export default {
  name: 'checkout',
  components: {
    TopHeader,
    CreditCardSwiper,
    CheckoutForm,
  },
  data() {
    return {
      creditCards: [
        {
          id: 0,
          ccType: 'visa',
          ccNumber: '1234456798765432',
          ccName: 'Max Mustermann',
          ccExpiry: '06/21',
        },
        {
          id: 1,
          ccType: 'mc',
          ccNumber: '1111222233334444',
          ccName: 'John Doe',
          ccExpiry: '03/19',
        },
        {
          id: 2,
          ccType: 'mc',
          ccNumber: '9999888877776666',
          ccName: 'Monsieur Dupont',
          ccExpiry: '12/23',
        },
      ],
      activeCreditCardId: null,
    };
  },
  computed: {
    activeCreditCard() {
      return this.creditCards.find(cc => cc.id === this.activeCreditCardId);
    },
  },
  methods: {
    onCreditCardChanged(creditCardId) {
      this.activeCreditCardId = creditCardId;
    },
    onAddNewCreditCard() {
      this.creditCards.push({
        id: null,
        ccType: '',
        ccNumber: '',
        ccName: '',
        ccExpiry: '',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
