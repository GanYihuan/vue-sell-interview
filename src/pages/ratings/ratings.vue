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
        :only-content="onlyContent"
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
                >{{ rating.deliveryTime }}</span>
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

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import ratingMixin from 'utils/mixins/rating'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
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
      onlyContent: true
    }
  },
  computed: {
    ...mapState({
      badComment: state => state.badComment
    })
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios
      .get('/api/ratings')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.ratings = data
        }
        this.$nextTick(() => {
          this._initScroll()
        })
      }).catch(() => {
      })
  },
  methods: {
    ...mapMutations({ setbadcomment: 'SET_BADCOMMENT' }),
    selectRating(type) {
      if (type === NEGATIVE) {
        this.setbadcomment(true) // 只看差评
      } else if (type === POSITIVE) {
        this.setbadcomment(false)
      }
      console.log(this.badComment, 'this.comment....1')
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
      this.onlyContent === true ? this.setbadcomment(true) : this.setbadcomment(false)
      this.$nextTick(() => {
        this.scroll.refresh()
      })
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
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './ratings.styl'
</style>
