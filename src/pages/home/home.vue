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

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import axios from 'axios'
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
      scrollY: 0 // real time roll position
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
    this.getHome()
    this.getMerchant()
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.click = true
  },
  methods: {
    async getHome() {
      const { status, data: { homes }} = await axios.get('/homes/getHome')
      if (status === 200) {
        this.iconList = homes
      }
    },
    async getMerchant() {
      const { status, data: { merchants }} = await axios.get('/cmerchants/getMerchant')
      const itemArray = []
      merchants.forEach((item) => {
        if (status === 200) {
          if (item.city === this.city) {
            itemArray.push(item)
            this.merchant = itemArray
          }
        }
      })
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    backTop() {
      this.$refs.home.scrollTo(0, 0, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>
