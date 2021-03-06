<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-12-18 18:39:46
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 01:38:02
 -->
<template>
  <div
    ref="seller"
    class="seller"
  >
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">
          {{ seller.name }}
        </h1>
        <div class="desc border-1px">
          <star
            :size="36"
            :score="seller.score"
          />
          <span class="text">{{ seller.score }}</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <div
          class="favorite"
          @click="toggleFavorite"
        >
          <span
            class="icon-favorite"
            :class="{'active':favorite}"
          />
          <span class="text">{{ favoriteText }}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
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
      <split />
      <div class="pics">
        <h1 class="title">
          商家实景
        </h1>
        <div
          ref="picWrapper"
          class="pic-wrapper"
        >
          <ul
            ref="picList"
            class="pic-list"
          >
            <li
              v-for="(pic, index) in seller.pics"
              :key="index"
              class="pic-item"
            >
              <img
                :src="pic"
                alt="pic"
              >
            </li>
          </ul>
        </div>
      </div>
      <split />
      <div class="info">
        <h1 class="title border-1px">
          商家信息
        </h1>
        <ul>
          <li
            v-for="(info, index) in seller.infos"
            :key="index"
            class="info-item"
          >
            {{ info }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { saveToLocal, loadFromLocal } from 'utils/storage'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'

export default {
  name: 'Seller',
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
      favorite: (() => { // 立即运行函数
        return loadFromLocal(this.$route.params.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  watch: {
    seller() { // seller 异步数据，最初为空
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
      this._initPics()
    })
  },
  methods: {
    toggleFavorite(event) {
      this.favorite = !this.favorite
      saveToLocal(this.$route.params.id, 'favorite', this.favorite)
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        const width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true, // 水平滚动
              eventPassthrough: 'vertical' // 忽略垂直滚动
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './seller.styl'
</style>
