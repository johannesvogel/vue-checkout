<template>
  <transition name="fade">
    <div class="overlay" @click="closeOverlay">
      <div class="overlay-content" @click.stop>
        <a class="close-button" @click.prevent="closeOverlay">x</a>
        <h2 class="overlay-headline">{{ headline }}</h2>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'overlay',
  props: {
    headline: {
      type: String,
      default: null,
    },
    closeHandler: {
      type: Function,
    },
  },
  methods: {
    closeOverlay() {
      this.closeHandler();
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-content {
  position: relative;
  border-radius: 25px;
  background-color: $color-white;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  max-width: 80%;
  margin: auto;
  color: #333;
}

.overlay-headline {
  margin: 0 0 30px 0;
  font-size: 20px;
  text-align: center;
}

.close-button {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  padding: 15px 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
