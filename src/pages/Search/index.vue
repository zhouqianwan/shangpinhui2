<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- categoryName的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategory">×</i></li>
            <!-- keyword的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 点击brand，添加面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeBrand">×</i></li>
            <!-- 属性面包屑，可以有多个，遍历数组 -->
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">{{attr.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>
        <!--selector-->
        <SearchSelector @getBrand='getBrand' @getAttr='getAttr'></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="orderChange(1)">
                  <a>综合 <span v-if="isOne&&isAsc">↑</span><span v-if="isOne&&isDesc">↓</span></a>
                </li>
                <li :class="{active:isTwo}" @click="orderChange(2)">
                  <a>价格<span v-if="isTwo&&isAsc">↑</span><span v-if="isTwo&&isDesc">↓</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="index">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" style="width:150px;height:180px;margin-top:40px" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i style="margin-left:3px">{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 先通过自定义属性，往子组件中传递几条固定的假数据 -->
        <!-- 通过自定义事件，将pageNo的值传递更新 -->
        <Pagination :total="total" :pageNo='this.searchParams.pageNo' :continues='5' :pageSize='this.searchParams.pageSize' @getPageNo='getPageNo'></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        // 一二三级分类
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分类名称
        categoryName: '',
        // 关键字
        keyword: '',
        // 商品属性的数组: ["属性ID:属性值:属性名"]  示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        props: [],
        // 品牌  "ID:品牌名称"
        trademark: '',
        // 排序方式
        order: '1:desc',
        // 当前页码
        pageNo: '1',
        // 每页数量
        pageSize: '10'
      },
      brandName: ''
    }
  },
  components: {
    SearchSelector
  },
  mounted() {
    this.getData()
  },
  beforeMount() {
    // 在结构没挂载完毕之前，将传递过来的数据，合并到一个对象中
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  methods: {
    // 把获取商品信息的数据封装成一个方法，信息更新后就能快速重新调用，获取最新的数据
    getData() {
      this.$store.dispatch('getSearchInfo', this.searchParams)
    },
    // 点击叉号，关闭categoryName
    removeCategory() {
      // 置空categoryName   置为undefined,发起请求，不再携带这个参数，优化
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 将$router中的query中的参数删掉   最好的方法就是重新发一次请求，不带query就好
      this.$router.push({ name: 'search', params: this.$route.params })
      this.getData()
    },
    // 点击叉号，删除keyword
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.$router.push({ name: 'search', query: this.$route.query })
      this.getData()
    },
    // 点击子组件中的brand,点击的按钮信息传递过来  "ID:品牌名称"
    getBrand(value) {
      let str = `${value.tmId}:${value.tmName}`
      this.searchParams.trademark = str
      this.getData()
    },
    // 点击属性，将属性的信息传递过来
    getAttr(item, attrs) {
      let str = `${attrs.attrId}:${item}:${attrs.attrName}`
      // 如果数组中已经有了这个数据之后，就不再push
      if (this.searchParams.props.indexOf(str) == -1) {
        this.searchParams.props.push(str)
      }
      this.getData()
    },
    // 清除品牌名的面包屑
    removeBrand() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 清除属性attr
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    orderChange(value) {
      // 获取之前存在searchParams中的数据
      let originOrder = this.searchParams.order
      // 方向
      let originSort = originOrder.split(':')[1]
      // 排序方式
      let originFlag = originOrder.split(':')[0]
      let newOrder = ''
      // 如果点击的和之前的是同一个，排序方式不变，方向相反
      // 如果点击的和之前不同，排序方式改变，方向变为降序
      if (value == originFlag) {
        newOrder = `${originFlag}:${originSort == 'asc' ? 'desc' : 'asc'}`
      } else {
        newOrder = `${value}:desc`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    // 点击分页器更新pageNo的值   子传给父
    getPageNo(value) {
      this.searchParams.pageNo = value
      this.getData()
    }
  },
  computed: {
    // 获取仓库中的数据
    ...mapGetters(['goodsList']),
    // 使用计算属性，算出是升序还是降序  是综合还是价格
    // 是不是综合 (包不包含1)
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    // 看是不是价格（包不包含2）
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    // 是不是升序
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    // 是不是降序
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      total: state => state.search.searchInfo.total
    })
  },
  // 在search页面中按条件搜索，需要监听$router的变化
  watch: {
    $route() {
      // 如果$route中的数据有变化，就重新合并对象
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      // 为了防止冲突，每次请求完，都清空一二三级分类的数据
      this.category1Id = ''
      this.category2Id = ''
      this.category3Id = ''
      // 重新发起请求，获取操作后的数据
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background-color: red;
}
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>