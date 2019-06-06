<template>
  <transition name="move">
    <div
      v-show="showFlag"
      ref="food"
      class="food"
    >
      <div class="food-content">
        <div class="image-header">
          <img
            :src="food.image"
            alt="food.image"
          >
          <div
            class="back"
            @click="hide"
          >
            <i class="icon-arrow_lift" />
          </div>
        </div>
        <div class="content">
          <h1 class="title">
            {{ food.name }}
          </h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span
              v-show="food.oldPrice"
              class="old"
            >￥{{ food.oldPrice }}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl
              :food="food"
              @add="addFood"
            />
          </div>
          <transition name="fade">
            <div
              v-show="!food.count || food.count === 0"
              class="buy"
              @click.stop.prevent="addFirst($event)"
            >
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info" />
        <div
          v-show="food.info"
          class="info"
        >
          <h1 class="title">
            商品信息
          </h1>
          <p class="text">
            {{ food.info }}
          </p>
        </div>
        <split />
        <div class="rating">
          <h1 class="title">
            商品评价
          </h1>
          <ratingSelect
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @select="onSelect"
            @toggle="onToggle"
          />
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-for="(rating, index) in food.ratings"
                v-show="needShow(rating.rateType, rating.text)"
                :key="index"
                class="rating-item border-1px"
              >
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img
                    class="avatar"
                    :src="rating.avatar"
                    alt="avatar"
                  >
                </div>
                <!-- <div class="time">{{rating.rateTime | formatDate}}</div> -->
                <div class="time">
                  {{ formatDate(rating.rateTime) }}
                </div>
                <p class="text">
                  <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" />
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div
              v-show="!food.ratings || food.ratings.length === 0"
              class="no-rating"
            >
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartcontrol'
import split from 'components/split/split.vue'
import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
import ratingMixin from 'utils/mixins/rating'
const ALL = 2
const EVENT_ADD = 'add'

export default {
  name: 'Food',
  components: {
    cartControl,
    ratingSelect,
    split
  },
  mixins: [ratingMixin],
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL, /* ratingSelect.vue: Product evaluation init */
      onlyContent: true, /* Whether to open the '只看评论内容' */
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      /* better-scroll at PC will trigger twice event, stop this */
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, event.target)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    addFood(target) {
      this.$emit(EVENT_ADD, target)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'food.scss';
</style>
