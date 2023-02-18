<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="goods in cartInfoList" :key="goods.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='goods.isChecked == 1' @change='updataChecked(goods,$event)'>
          </li>
          <li class="cart-list-con2">
            <img :src="goods.imgUrl">
            <div class="item-msg">{{goods.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{goods.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum($event,'subtract',goods)">-</a>
            <input autocomplete="off" type="text" :value="goods.skuNum" minnum="1" class="itxt" @change="changeNum($event,'entry',goods)">
            <a href="javascript:void(0)" class="plus" @click="changeNum($event,'add',goods)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{goods.skuNum*goods.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(goods)">删除</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='totalChecked&&cartInfoList.length>0' @change="selectAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartInfo']),
    // 解决假报错现象
    cartInfoList() {
      return this.cartInfo.cartInfoList || []
    },
    // 计算是不是全不选中
    totalChecked() {
      return this.cartInfoList.every(item => {
        return item.isChecked == 1
      })
    },
    // 全部商品数量
    totalNum() {
      let sum = 0
      this.cartInfoList.forEach(element => {
        return (sum += element.skuNum)
      })
      return sum
    },
    // 计算总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.cartPrice * item.skuNum
      })
      return sum
    }
  },
  methods: {
    // 重新发请求，获取新数据
    getData() {
      this.$store.dispatch('getShopcartInfo')
    },
    // 改变购物车中商品的数量，发起请求
    changeNum: _.throttle(async function (e, value, goods) {
      // 设置差值，默认为0
      let disnum = 0
      switch (value) {
        case 'subtract':
          if (goods.skuNum <= 1) {
            disnum = 0
          } else {
            disnum = -1
          }
          break
        case 'add':
          disnum = 1
          break
        case 'entry':
          // 判断是否合法
          if (isNaN(e.target.value) || e.target.value < 1) {
            disnum = 0
          }
          disnum = parseInt(e.target.value) - goods.skuNum
          break
      }
      try {
        await this.$store.dispatch('addToShopcart', { skuId: goods.skuId, skuNum: disnum })
      } catch (error) {
        alert(error.message)
      }
      this.getData()
    }, 1000),
    // 删除商品
    async deleteGoods(goods) {
      try {
        await this.$store.dispatch('deleteGoods', goods.skuId)
      } catch (error) {
        alert(error.message)
      }
      this.getData()
    },
    // 更新商品选中状态
    async updataChecked(goods, e) {
      let isChecked = e.target.checked ? 1 : 2
      let skuid = goods.skuId
      try {
        await this.$store.dispatch('updataChecked', { skuid, isChecked })
      } catch (error) {
        alert(error.message)
      }
      this.getData()
    },
    // 删除全部已选中的商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch('deleteAllChecked')
      } catch (error) {
        alert(error.message)
      }
      this.getData()
    },
    // 全选按钮
    async selectAll(e) {
      let isChecked = e.target.checked ? '1' : '2'
      try {
        await this.$store.dispatch('selectAll', isChecked)
      } catch (error) {
        alert(error.message)
      }
      this.getData()
    },
    // 点击结算 跳转到trade页面中
    goTrade() {
      this.$router.push('/trade')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
          input {
            margin-top: 30px;
            line-height: 103px;
          }
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
            margin-top: 15px;
          }
        }

        .cart-list-con4 {
          width: 15%;
          line-height: 83px;
        }

        .cart-list-con5 {
          width: 15%;
          margin-top: 20px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            margin-left: 60px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;
          line-height: 83px;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 15%;
          margin-top: 20px;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>