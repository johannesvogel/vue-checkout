<template>
  <div class="checkout">
    <CreditCardSwiper :creditCards="creditCards" />
  </div>
</template>

<script>
// @ is an alias to /src
import CreditCardSwiper from '@/components/CreditCardSwiper.vue';

export default {
  name: 'home',
  components: {
    CreditCardSwiper,
  },
  data() {
    return {
      creditCards: [
        {
          id: 0,
          ccType: 'visa',
          ccNumber: '1234456798765432',
          ccName: 'Max Mustermann',
          ccValidity: '06/21',
        },
        {
          id: 1,
          ccType: 'mc',
          ccNumber: '1111222233334444',
          ccName: 'John Doe',
          ccValidity: '03/19',
        },
        {
          id: 2,
          ccType: 'mc',
          ccNumber: '9999888877776666',
          ccName: 'Monsieur Dupont',
          ccValidity: '12/23',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
