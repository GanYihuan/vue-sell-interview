<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-12-18 18:39:46
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 15:08:06
 -->
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
        <div class="comment">
          <div class="ratingcomment">
            商品评价
          </div>
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

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartControl from 'components/cartControl/cartcontrol'
import split from 'components/split/split'
import ratingSelect from 'components/ratingSelect/ratingSelect'
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
      selectType: ALL,
      onlyContent: true, // '只看评论内容' 控制
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
      if (!event._constructed) { // better-scroll 在 PC 上将触发两个事件，停止此操作
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './food.styl'
</style>
