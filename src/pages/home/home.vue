<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-06 16:19:05
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 14:15:13
 -->
<template>
  <div class="homePage">
    <Scroll
      ref="home"
      class="home"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="merchant"
      @scroll="scroll"
    >
      <div class="home-content">
        <div class="logo">
          <Header />
        </div>
        <HomeIcon :list="iconList" />
        <Split />
        <Merchant :merchant="merchant" />
      </div>
      <div
        v-show="showBackTop"
        class="back-to-ceiling"
        @click="backTop"
      >
        <i class="icon-circle-up" />
      </div>
    </Scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import Scroll from 'components/scroll/scroll'
import Split from 'components/split/split'
import Header from './header'
import HomeIcon from './icons'
import Merchant from './merchant'

export default {
  name: 'Home',
  components: {
    Split,
    Header,
    HomeIcon,
    Scroll,
    Merchant
  },
  data() {
    return {
      iconList: [],
      merchant: [],
      scrollY: 0 // 实时滚动位置
    }
  },
  computed: {
    ...mapState({
      city: state => state.city
    }),
    showBackTop() {
      return this.scrollY < 0
    }
  },
  mounted() {
    this._getIcon()
    this._getMerchant()
  },
  created() {
    this.probeType = 3 // 不仅在屏幕滑动的过程中 ， 而且在 momentum 滚动动画运行过程中实时派发 scroll 事件 ( 实时滚动位置 )
    this.listenScroll = true // 监听滚动
    this.click = true // 能点击
  },
  methods: {
    async _getIcon() {
      const { status, data: { homes }} = await axios.get('/homes/getHome')
      if (status === 200) {
        this.iconList = homes
      }
    },
    async _getMerchant() {
      const { status, data: { merchants }} = await axios.get('/cmerchants/getMerchant')
      if (status === 200) {
        merchants.forEach((item) => {
          if (item.city === this.city) {
            this.merchant.push(item)
          }
        })
      }
    },
    scroll(pos) {
      this.scrollY = pos.y // 实时滚动位置
    },
    backTop() {
      this.$refs.home.scrollTo(0, 0, 500) // 滚动到指定位置
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>
