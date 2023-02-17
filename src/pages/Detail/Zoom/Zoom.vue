<template>
  <div class="spec-preview" ref="big">
    <img :src="imgObj.imgUrl">
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="mirror" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Zoom',
  data() {
    return {
      num: 0
    }
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.num] || {}
    }
  },
  props: ['skuImageList'],
  mounted() {
    this.$bus.$on('reqIndex', value => {
      this.num = value
    })
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask
      let big = this.$refs.big
      let mirror = this.$refs.mirror
      let left = e.offsetX
      let top = e.offsetY
      let TrueLeft = left - mask.offsetWidth / 2
      let TrueTop = top - mask.offsetHeight / 2
      // 不能让mask的跑出边框
      TrueLeft < 0 ? (TrueLeft = 0) : ''
      TrueTop < 0 ? (TrueTop = 0) : ''
      TrueLeft > big.offsetWidth - mask.offsetWidth ? (TrueLeft = big.offsetWidth - mask.offsetWidth) : ''
      TrueTop > big.offsetHeight - mask.offsetHeight ? (TrueTop = big.offsetHeight - mask.offsetHeight) : ''
      // 将TrueLeft和TrueTop赋值给mask
      mask.style.left = TrueLeft + 'px'
      mask.style.top = TrueTop + 'px'
      mirror.style.left = -2 * TrueLeft + 'px'
      mirror.style.top = -2 * TrueTop + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>