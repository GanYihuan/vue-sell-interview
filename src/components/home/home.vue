<template>
  <div
    ref="home"
    class="home"
  >
    <div class="home-content">
      <Header />
      <HomeIcon :list="iconList" />
      <Split />
      <Merchant :merchant="merchant" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import BScroll from 'better-scroll'
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
      merchant: []
    }
  },
  created() {
    axios
      .get('/api/home')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.iconList = data
        }
        this.$nextTick(() => {
          this._initScroll()
        })
      }).catch(() => {
      })
    axios
      .get('/api/merchant')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.merchant = data
        }
        this.$nextTick(() => {
          this._initScroll()
        })
      }).catch(() => {
      })
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.home, {
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
@import './home.scss';
</style>
