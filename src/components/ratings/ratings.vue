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
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
// import { saveToLocal, loadFromLocal } from 'common/js/store'

export default {
  components: {
    star,
    split
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
      /* immediately run function */
      favorite: (() => {
        // return loadFromLocal(this.seller.id, 'favorite', false)
      })()
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
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      // saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh() /* prevent route switch scroll no work */
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import './ratings.scss';
</style>
