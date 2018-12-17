<template>
  <div class="credit-card-swiper-container">
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
    onSlideChanged() {
      this.updateActiveCreditCard();
    },
  },
  mounted() {
    this.updateActiveCreditCard();
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
