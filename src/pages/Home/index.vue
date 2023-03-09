<template>
  <div>
    <TypeNav></TypeNav>
3333333333333
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :floor='item'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Branch'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    // 获取floorList的数据，对立面的两个floor进行遍历
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    // 获取floor的数据
    this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less" scoped>
</style>
