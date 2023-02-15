<template>
  <!-- 封装自定义的分页器 -->
  <div class="pagination">

    <button :disabled="getStartAndEnd.start==1" @click="getPageNo(pageNo-1)">上一页</button>
    <!-- 如果start>1,才能显示 -->
    <button v-show="getStartAndEnd.start>1" @click="getPageNo(1)">1</button>
    <!-- 如果start>2,才能显示 -->
    <button v-show=" getStartAndEnd.start>2">···</button>

    <button v-for="(page,index) in getStartAndEnd.end" :key="index" v-show="page>=getStartAndEnd.start" :class="{active:page==pageNo}" @click="getPageNo(page)">{{page}}</button>

    <button v-if="getStartAndEnd.end<totalPage-1">···</button>
    <!-- 如果end,才能显示 -->
    <button v-if="getStartAndEnd.end<totalPage" @click="getPageNo(totalPage)">{{totalPage}}</button>
    <button :disabled="getStartAndEnd.end==totalPage" @click="getPageNo(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 获取自定义属性传递过来的数据    pageSize:一页展示多少条数据      总页数 = 向上取整（总数据/一页展示多少数据）
  props: ['total', 'pageNo', 'continues', 'pageSize'],
  computed: {
    // 通过 总页数 = 向上取整（总数据/一页展示多少数据） 计算出总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续页码的起始页和结尾页
    getStartAndEnd() {
      let { totalPage, continues, pageNo } = this
      let start = 0
      let end = 0
      // 不正常的情况：连续页>总页数
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 能到这里，说明 总页数指定大于连续页码数
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 不正常情况2：start<1,连续页码数出现0或负数的情况
        start < 1 ? ((start = 1), (end = continues)) : ''
        // 不正常情3：连续页码数的end>totalPage的情况
        end > totalPage ? ((end = totalPage), (start = totalPage - continues + 1)) : ''
      }
      return { start, end }
    }
  },
  methods: {
    // 点击之后，发请求，将pageNo的值进行更新
    getPageNo(value) {
      this.$emit('getPageNo', value)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
