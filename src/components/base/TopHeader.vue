<template>
  <div class="header">
    <h1 class="headline">Checkout</h1>
  </div>
</template>

<script>
export default {
  name: 'top-header',
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  margin-top: 10px;
  opacity: 0.8;
}

.headline {
  flex-grow: 1;
  text-align: center;
  color: $color-white;
  font-size: 15px;
  font-weight: normal;
}
</style>
