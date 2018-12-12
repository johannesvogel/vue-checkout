<template>
  <div class="credit-card-icon">
    <img :src="`${baseUrl}static/cc-icons/${this.creditCardType}.png`" class="credit-card-icon-image" />
  </div>
</template>

<script>

export default {
  name: 'credit-card-icon',
  components: {},
  props: {
    creditCardType: {
      type: String,
      default: null,
    },
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL
    }
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
