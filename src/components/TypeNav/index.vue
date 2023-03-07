<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派，当鼠标移出这两个之后再执行 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 除了home首页之外，其他页面下边默认是隐藏的 -->
        <!-- 加上过渡效果 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)" :data-categoryname="c1.categoryName" :class="{cur:currentIndex == index}" :data-category1id="c1.categoryId">
                  <a>{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category2id="c2.categoryId" :data-categoryname="c2.categoryName">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category3id="c3.categoryId" :data-categoryname="c3.categoryName">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: '',
  data() {
    return {
      currentIndex: -1,
      // 三级列表默认是展开的
      show: true
    }
  },
  methods: {
    // 鼠标移动到以及一级分类上
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标移出一级分类和’全部商品’
    leaveIndex() {
      this.currentIndex = -1
      // 如果跳转到的页面不是home页面，让三级列表的下面隐藏
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 鼠标移入三级列表，让下方展开
    enterShow() {
      this.show = true
    },
    // 利用事件委派，点击分类列表中的分类后，跳转到search组件中
    goSearch(e) {
      let { categoryname, category1id, category2id, category3id } = e.target.dataset
      let location = {
        name: 'search'
      }
      // 把点击的categoryName传过去
      let query = { categoryName: categoryname }
      if (category1id) {
        query.category1Id = category1id
      } else if (category2id) {
        query.category2Id = category2id
      } else if (category3id) {
        query.category3Id = category3id
      }
      location.query = query
      // 如果有params参数，把他也一起传过去
      if (this.$route.params) {
        location.params = this.$route.params
      }
      this.$router.push(location)
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  mounted() {
    // 如果不是home页面，隐藏三级列表的下方
    if (this.$route.path != '/home') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.cur {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow: hidden;

      .all-sort-list2 {
        .item {
          text-align: left;
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 1s linear;
    }
  }
}
</style>
