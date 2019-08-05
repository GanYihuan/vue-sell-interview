<template>
  <div>
    <div class="shopCart">
      <div
        class="content"
        @click="toggleList"
      >
        <div class="content-left">
          <div class="logo-wrapper">
            <div
              class="logo"
              :class="{'highlight': totalCount>0}"
            >
              <i
                class="icon-shopping_cart"
                :class="{'highlight': totalCount>0}"
              />
            </div>
            <div
              v-show="totalCount>0"
              class="num"
            >
              {{ totalCount }}
            </div>
          </div>
          <div
            class="price"
            :class="{'highlight': totalPrice>0}"
          >
            ￥{{ totalPrice }}
          </div>
          <div class="desc">
            另需配送费￥{{ deliveryPrice }}元
          </div>
        </div>
        <div
          class="content-right"
          @click.stop.prevent="pay"
        >
          <div
            class="pay"
            :class="payClass"
          >
            {{ payDesc }}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div
          v-show="listShow"
          class="shopCart-list"
        >
          <div class="list-header">
            <h1 class="title">
              购物车里面
            </h1>
            <span
              class="empty"
              @click="empty"
            >清空</span>
          </div>
          <div
            ref="listContent"
            class="list-content"
          >
            <ul>
              <li
                v-for="(food, index) in selectFoods"
                :key="index"
                class="shopCart-food"
              >
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl
                    :food="food"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div
        v-show="listShow"
        class="list-mask"
        @click="hideList"
      />
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import { Notyf } from 'notyf' // 纯 js 消息通知插件
import cartControl from 'components/cartControl/cartcontrol'

export default {
  name: 'ShopCart',
  components: {
    cartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fold: true
    }
  },
  computed: {
    ...mapState({
      sellerName: state => state.sellerName,
      sellerImage: state => state.sellerImage
    }),
    totalCount() {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    totalPrice() {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    listShow() {
      if (!this.totalCount) {
        /* eslint-disable vue/no-side-effects-in-computed-properties */
        this.fold = true
        return false
      }
      const show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hideList() {
      this.fold = true
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      axios
        .post('/orders/pay', {
          sellerName: this.sellerName,
          sellerImage: this.sellerImage,
          menu: this.selectFoods,
          number: this.totalCount,
          price: this.totalPrice
        })
        .then(({ status, data }) => {
          const notyf = new Notyf()
          if (status === 200) {
            if (data && data.code === 0) {
              notyf.success(`${data.msg} 需要支付${this.totalPrice}元 到评价界面给个评价!`)
            } else {
              notyf.error(`${data.msg}`)
            }
          } else {
            notyf.error(`服务器出错，错误码:${status}`)
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './shopCart.styl'
</style>
