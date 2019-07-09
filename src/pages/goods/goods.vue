<template id="ratings">
  <div>
    <div class="goods">
      <div
        ref="menuWrapper"
        class="menu-wrapper"
      >
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="menu-item"
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index, $event)"
          >
            <span class="text border-1px">
              <span
                v-show="item.type>0"
                class="icon"
                :class="classMap[item.type]"
              />{{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div
        ref="foodsWrapper"
        class="foods-wrapper"
      >
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="food-list food-list-hook"
          >
            <h1 class="title">
              {{ item.name }}
            </h1>
            <ul>
              <li
                v-for="(food, index2) in item.foods"
                :key="index2"
                class="food-item border-1px"
                @click="selectFood(food, $event)"
              >
                <div class="icon">
                  <img :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">
                    {{ food.name }}
                  </h2>
                  <p class="desc">
                    {{ food.description }}
                  </p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span
                      v-show="food.oldPrice"
                      class="old"
                    >￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      />
    </div>
    <food
      ref="food"
      :food="selectedFood"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import BScroll from 'better-scroll'
import shopCart from 'components/shopCart/shopCart'
import cartControl from 'components/cartControl/cartcontrol'
import food from 'pages/food/food'

export default {
  name: 'Goods',
  components: {
    shopCart,
    food,
    cartControl
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [], /* 计算菜品集合的高度 */
      scrollY: 0, /* foodsScroll Real-time scroll position scrollY */
      selectedFood: {}
    }
  },
  computed: {
    // 当前菜品的下标
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i] /* The height of the current index value */
        const height2 = this.listHeight[i + 1] /* Next height */
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    /* 所有单独的菜肴的集合. */
    selectFoods() {
      const foods = []
      /* http://localhost:8088/api/goods */
      /* good -> 左侧栏的单个项目 */
      this.goods.forEach(good => {
        /* food -> 项目中的单个菜品. */
        good.foods.forEach(food => {
          /* food.count: cartcontrol.vue Vue.set() */
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  async mounted() {
    const { status, data: { goods }} = await axios.get('/goods/getGood')
    if (status === 200) {
      this.goods = goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        /*
        probeType: 1，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
        probeType: 2，会在屏幕滑动的过程中实时的派发 scroll 事件
        probeType: 3，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件(实时滚动位置)
        */
        probeType: 3
      })
      /* 2. Real-time scroll position */
      /* foodsScroll Real-time scroll position scrollY */
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算菜品集合的高度
    _calculateHeight() {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      /* better-scroll */
      /* On the PC will trigger two events, stop this */
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      const el = foodList[index]
      /* better-scroll: target: element, duration: 300ms */
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood(food, event) {
      /* better-scroll */
      /* at PC will trigger twice event, stop this */
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './goods.styl';
</style>
