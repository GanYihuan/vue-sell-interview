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
      <div class="ball-container">
        <div
          v-for="(ball, index) in balls"
          :key="index"
        >
          <transition
            name="drop"
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <div
              v-show="ball.show"
              class="ball"
            >
              <div class="inner inner-hook" />
            </div>
          </transition>
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
                  <!-- <cartControl
                    :food="food"
                    @add="addFood"
                  /> -->
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
import BScroll from 'better-scroll'
// import cartControl from 'components/cartControl/cartControl.vue'

export default {
  components: {
    // cartControl
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
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
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
        /*
        async 更新数据
        在下次 DOM 更新循环结束之后执行延迟回调。
        在修改数据之后立即使用这个方法，获取更新后的 DOM。
        */
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
      window.alert('支付' + this.totalPrice + '元')
    },
    addFood(target) {
      this.drop(target)
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect() /* getBoundingClientRect: Get the element relative viewport location */
          const x = rect.left - 32 /* ball size = 32 */
          const y = -(window.innerHeight - rect.top - 22)
          el.style.display = '' /* 让小球显示 */
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) {
      /* Trigger browser refactoring. */
      /* eslint-disable no-unused-vars */
      const rf = el.offsetHeight
      this.$nextTick(() => {
        /* reset */
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'shopCart.scss';
</style>
