<template>
  <div class="checkout">
    <TopHeader />
    <CreditCardSwiper
      :creditCards="creditCards"
      @creditCardChanged="onCreditCardChanged"
      @addNewCreditCard="onAddNewCreditCard"
    />
    <CreditCardForm :activeCreditCard="activeCreditCard" />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';
import CreditCardSwiper from '@/components/CreditCardSwiper.vue';
import CreditCardForm from '@/components/CreditCardForm.vue';

export default {
  name: 'checkout',
  components: {
    TopHeader,
    CreditCardSwiper,
    CreditCardForm,
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
          ccType: 'mc',
          ccNumber: '5105105105105100',
          ccName: 'John Doe',
          ccExpiry: '03/19',
        },
        {
          id: 2,
          ccType: 'mc',
          ccNumber: '5555555555554444',
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
