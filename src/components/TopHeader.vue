<template>
  <div class="header">
    <a href="#" class="back-button">&lt;</a>
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
.back-button {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  font-size: 15px;
}
.headline {
  flex-grow: 1;
  text-align: center;
  color: #fff;
  font-size: 15px;
  font-weight: normal;
}
</style>
