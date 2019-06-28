<template>
  <div class="homePage">
    <Scroll
      ref="home"
      class="home"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      @scroll="scroll"
    >
      <div class="home-content">
        <router-link
          class="logo"
          to="/login"
          tab="li"
        >
          <Header />
        </router-link>
        <HomeIcon :list="iconList" />
        <Split />
        <Merchant :merchant="merchant" />
      </div>
      <div
        v-show="scrollY < 0"
        class="back-to-ceiling"
        @click="backTop"
      >
        <i class="icon-circle-up" />
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import axios from 'axios'
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
      iconList: [],
      merchant: [],
      scrollY: 0 // real time roll position
    }
  },
  computed: {
    showBackTop() {
      return this.scrollY < -50
    }
  },
  mounted() {
    this.getUerAccount()
    this.getUserPermissions()
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.click = true
    // this.loadData()
  },
  methods: {
    async getUerAccount() {
      const { status, data: { homes }} = await axios.get('/homes/getHome')
      if (status === 200) {
        this.iconList = homes
      }
    },
    async getUserPermissions() {
      const { status, data: { merchants }} = await axios.get('/merchants/getMerchant')
      if (status === 200) {
        this.merchant = merchants
      }
    },
    // loadData() {
    //   axios
    //     .all([axios.get('/api/home'), axios.get('/api/merchant')])
    //     .then(axios.spread((acc, pers) => {
    //       const getacc = () => {
    //         const { data } = acc.data
    //         this.iconList = data
    //       }
    //       const getmerchant = () => {
    //         const { data } = pers.data
    //         this.merchant = data
    //       }
    //       getacc()
    //       getmerchant()
    //     }))
    // },
    scroll(pos) {
      this.scrollY = pos.y
    },
    backTop() {
      this.$refs.home.scrollTo(0, 0, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>
