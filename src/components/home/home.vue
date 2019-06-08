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
    // axios
    //   .get('/api/home')
    //   .then((res) => {
    //     const { status, data } = res.data
    //     console.log(res.data, 'home--')
    //     if (status === 1) {
    //       this.iconList = data
    //     }
    //     this.$nextTick(() => {
    //       this._initScroll()
    //     })
    //   }).catch(() => {
    //   })
    // axios
    //   .get('/api/merchant')
    //   .then((res) => {
    //     const { status, data } = res.data
    //     console.log(res.data, 'merchant--')
    //     if (status === 1) {
    //       this.merchant = data
    //     }
    //     this.$nextTick(() => {
    //       this._initScroll()
    //     })
    //   }).catch(() => {
    //   })
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
        this.scroll = new BScroll(this.$refs.home)
        this.scroll.on('touchend', (pos) => {
          if (pos.y > 1) {
            console.log('下拉动作')
            this.loadData()
          }
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
