<template>
  <div
    ref="home"
    class="home"
  >
    <div>
      <Header />
      <HomeIcon :list="iconList" />
      <Split />
      <Merchant :merchant="merchant" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import HomeIcon from './icons'
import Header from './header'
import axios from 'axios' // Ajax
import Split from '../split/split'
import Merchant from './merchant'

export default {
  name: 'Home',
  components: {
    Header,
    HomeIcon,
    Split,
    Merchant
  },
  data() {
    return {
      iconList: [],
      merchant: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  created() {
    axios
      .get('/api/home')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.iconList = data
          // this.$nextTick(() => {
          //   this._initScroll()
          // })
        }
      }).catch(() => {
      })
    axios
      .get('/api/merchant')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.merchant = data
          // this.$nextTick(() => {
          //   this._initScroll()
          // })
        }
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

<style lang="stylus" scoped>
@import './home.styl'
</style>

