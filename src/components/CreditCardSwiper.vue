<template>
  <div class="credit-card-swiper-container">
    <a href="#" class="add-cc-button" @click.prevent="onAddCreditCardButtonClicked">+</a>
    <swiper
      :options="swiperOptions"
      class="credit-card-swiper"
      ref="creditCardSwiper"
      @slideChange="onSlideChanged"
    >
      <swiper-slide class="swiper-item" v-for="creditCard in creditCards" :key="creditCard.id">
        <CreditCard :creditCard="creditCard" />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import CreditCard from '@/components/CreditCard.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'credit-card-swiper',
  components: {
    swiper,
    swiperSlide,
    CreditCard,
  },
  props: {
    creditCards: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.creditCardSwiper.swiper;
    },
  },
  methods: {
    updateActiveCreditCard() {
      const creditCardIndex = this.swiper.activeIndex;
      const creditCard = this.creditCards[creditCardIndex];
      this.$emit('creditCardChanged', creditCard.id);
    },
    onAddCreditCardButtonClicked() {
      this.$emit('addNewCreditCard');
    },
    onSlideChanged() {
      this.updateActiveCreditCard();
    },
  },
  mounted() {
    this.updateActiveCreditCard();
  },
  watch: {
    creditCards() {
      // There is no "slideAdded" event, so we wait a bit until the slide has been added
      window.setTimeout(() => this.swiper.slideTo(this.creditCards.length, 500), 150);
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-card-swiper-container {
  position: relative;
  background-image: linear-gradient(to bottom right, #835FFE, #36BBFE);
  padding: 50px 20px 20px 20px;
  overflow: hidden;
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
.credit-card-swiper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.swiper-item {
  height: 100%;
  text-align: center;
  font-size: 18px ;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-pagination {
  bottom: 0;
}
</style>

<style lang="scss">
.swiper-pagination {
  position: relative;
  margin: auto;
}

.swiper-pagination-bullet {
  border-radius: 0;
  margin: 0 5px;
  height: 2px;
  width: 25px;
  background-color: #7FBCFE;
  transition: background-color 300ms linear;
  opacity: 1;

  &-active {
    background-color: #4449D8;
    transition: background-color 300ms linear;
  }
}
</style>
