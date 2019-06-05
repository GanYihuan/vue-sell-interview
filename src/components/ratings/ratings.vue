<template>
  <div
    ref="seller"
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
      <div class="bulletin">
        <h1 class="title">
          公告与活动
        </h1>
        <div class="content-wrapper border-1px">
          <p class="content">
            {{ seller.bulletin }}
          </p>
        </div>
        <ul
          v-if="seller.supports"
          class="supports"
        >
          <li
            v-for="(item, index) in seller.supports"
            :key="index"
            class="support-item border-1px"
          >
            <span
              class="icon"
              :class="classMap[seller.supports[index].type]"
            />
            <span class="text">{{ seller.supports[index].description }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
import ApiServer from 'api'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
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
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  watch: {
    seller() { /* seller async data, at first is null */
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this._fetch()
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
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
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh() /* prevent route switch scroll no work */
      }
    },
    _fetch() {
      console.log('fetch')
      if (!this.fetched) {
        this.fetched = true
        const params = {
          id: this.seller.id
        }
        ApiServer.getRatings(params)
          .then(res => {
            this.ratings = res
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import './ratings.scss';
</style>
