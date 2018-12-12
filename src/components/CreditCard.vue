<template>
  <div class="credit-card">
    <CreditCardIcon :creditCardType="creditCard.ccType" class="credit-card-icon" />
    <div class="credit-card-number">{{ ccNumber }}</div>
    <div class="credit-card-details">
      <div class="name">{{ creditCard.ccName }}</div>
      <div class="validity">{{ creditCard.ccValidity }}</div>
    </div>
  </div>
</template>

<script>
import CreditCardIcon from '@/components/CreditCardIcon.vue';

export default {
  name: 'credit-card',
  components: {
    CreditCardIcon,
  },
  props: {
    creditCard: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    ccNumber() {
      if (this.creditCard.ccNumber) {
        const ccNumberMasked = this.creditCard.ccNumber.replace(/.(?=.{4,}$)/g, '•');
        const ccNumberWithSpaces = ccNumberMasked.replace(/[^\dA-Z•]/g, '').replace(/(.{4})/g, '$1 ').trim();
        return ccNumberWithSpaces;
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-card {
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 100%;
  text-align: left;
  color: #ffffff;
  background-image: linear-gradient(to bottom right, #946EFF, #5BB1FE);
  border-radius: 20px;
  box-shadow: 10px 10px 40px 0px #835FFE;
  margin: 10px 30px 30px 10px;
  padding: 20px;
}

.credit-card-icon {
  flex-grow: 1;
}

.credit-card-number {
  font-family: Consolas, Courier, monospace;
  letter-spacing: 2px;
  font-size: 18px;
  margin-bottom: 30px;
}

.credit-card-details {
  font-size: 14px;
  display: flex;

  .name {
    text-transform: uppercase;
    flex-grow: 1;
  }
}
</style>
