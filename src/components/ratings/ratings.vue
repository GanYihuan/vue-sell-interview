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
</template>

<script type="text/ecmascript-6">
import ApiServer from 'api'
import moment from 'moment'
import BScroll from 'better-scroll'
import star from 'components/star/star.vue'
import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
import split from 'components/split/split.vue'
const ALL = 2

export default {
  components: {
    star,
    split,
    ratingSelect
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
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created() {
    this._fetch()
  },
  methods: {
    _fetch() {
      if (!this.fetched) {
        this.fetched = true
        const params = {
          id: this.seller.id
        }
        ApiServer
          .getRatings(params)
          .then(res => {
            this.ratings = res
            this.$nextTick(() => {
              this._initScroll()
            })
          })
          .catch(err => { console.log(err) })
      }
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    },
    selectRating(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
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
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'ratings.scss';
</style>
