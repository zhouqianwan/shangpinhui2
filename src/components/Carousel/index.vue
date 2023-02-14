<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carousellist" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  watch: {
    handler() {
      this.$nextTick(() => {
        Swiper.use([Navigation, Pagination, Autoplay])
        var mySwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          direction: 'horizontal' /*横向滑动*/,

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          autoplay: {
            delay: 1000 //1秒切换一次
          }
        })
      })
    }
  },
  props: ['carousellist']
}
</script>

<style lang="less" scoped>
</style>
