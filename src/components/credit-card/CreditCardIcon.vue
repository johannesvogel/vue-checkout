<template>
  <div class="credit-card-icon">
    <img
      :src="iconUrl"
      v-if="validCreditCardTypes.includes(creditCardType)"
      class="credit-card-icon-image"
    />
  </div>
</template>

<script>

export default {
  name: 'credit-card-icon',
  props: {
    creditCardType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      validCreditCardTypes: [
        'mastercard',
        'visa',
      ],
    };
  },
  computed: {
    iconUrl() {
      return `${this.baseUrl}static/cc-icons/${this.creditCardType}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-card-icon {
  text-align: right;
}

.credit-card-icon-image {
  height: 30px;
}
</style>
