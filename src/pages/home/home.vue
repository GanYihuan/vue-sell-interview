<template>
  <div
    ref="home"
    class="home"
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
    this.loadData()
  },
  methods: {
    loadData() {
      axios
        .all([axios.get('/api/home'), axios.get('/api/merchant')])
        .then(axios.spread((acc, pers) => {
          const getacc = () => {
            const { data } = acc.data
            this.iconList = data
          }
          const getmerchant = () => {
            const { data } = pers.data
            this.merchant = data
          }
          getacc()
          getmerchant()
          this.$nextTick(() => {
            this._initScroll()
          })
        }))
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.home, {
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
@import './home.styl';
</style>
