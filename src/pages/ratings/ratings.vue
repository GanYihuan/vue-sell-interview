<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-17 10:28:18
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 14:05:25
 -->
<template>
  <div
    ref="ratings"
    class="ratings"
  >
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">
            {{ seller.score }}
          </h1>
          <div class="title">
            综合评分
          </div>
          <div class="rank">
            高于周边商家{{ seller.rankRate }}%
          </div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star
              :size="36"
              :score="seller.serviceScore"
            />
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star
              :size="36"
              :score="seller.foodScore"
            />
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split />
      <ratingSelect
        :select-type="selectType"
        :ratings="ratings"
        @select="selectRating"
        @toggle="toggleContent"
      />
      <div class="rating-wrapper border-1px">
        <ul>
          <li
            v-for="(rating, index) in ratings"
            v-show="needShow(rating.rateType, rating.text)"
            :key="index"
            class="rating-item"
          >
            <div class="avatar">
              <img
                :src="rating.avatar"
                alt="avatar"
                width="28"
                height="28"
              >
            </div>
            <div class="content">
              <h1 class="name">
                {{ rating.username }}
              </h1>
              <div class="star-wrapper">
                <star
                  :size="24"
                  :score="rating.score"
                />
                <span
                  v-show="rating.deliveryTime"
                  class="delivery"
                >{{ rating.deliveryTime }}分钟送到</span>
              </div>
              <p class="text">
                {{ rating.text }}
              </p>
              <div
                v-show="rating.recommend && rating.recommend.length"
                class="recommend"
              >
                <span class="icon-thumb_up" />
                <span
                  v-for="(item, index2) in rating.recommend"
                  :key="index2"
                  class="item"
                >{{ item }}</span>
              </div>
              <div class="time">
                {{ formatDate(rating.rateTime) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
import ratingMixin from 'utils/mixins/rating'

const ALL = 2
const NEGATIVE = 1
const POSITIVE = 0

export default {
  name: 'Ratings',
  components: {
    star,
    split,
    ratingSelect
  },
  mixins: [ratingMixin],
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
      ratings: [],
      selectType: ALL,
      badContent: false
    }
  },
  computed: {
    ...mapState({
      sellerName: state => state.sellerName
    })
  },
  async mounted() {
    const { status, data: { ratings }} = await axios.get('/ratings/getRating')
    if (status === 200) {
      const resultArray = ratings.filter((item) => {
        return item.sellername === this.sellerName
      })
      this.ratings = resultArray.reverse()
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    ...mapMutations({
      setbadcomment: 'SET_BADCOMMENT'
    }),
    selectRating(type) {
      if (type === NEGATIVE) {
        this.setbadcomment(true) // 只看差评
        this.badContent = true
      }
      if (type === POSITIVE) {
        this.setbadcomment(false)
        this.badContent = false
      }
      if (type === ALL) {
        this.setbadcomment(false)
        this.badContent = false
      }
      this.selectType = type
    },
    toggleContent() {
      this.badContent = !this.badContent
      if (this.badContent === true) {
        this.setbadcomment(true)
        this.selectType = NEGATIVE
      }
      if (this.badContent === false) {
        this.setbadcomment(false)
        this.selectType = ALL
      }
    },
    needShow(type, text) {
      if (!text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './ratings.styl'
</style>
