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
            // 在 Vue 模板中列表渲染还没完成时，是没有生成列表 DOM 元素的，所以需要在确保列表渲染完成以后，才能创建 BScroll 实例，因此在 Vue 中，初始化 BScroll 的最佳时机是 mouted 的 nextTick。
            this._initScroll()
          })
        }))
    },
    _initScroll() {
      if (!this.scroll) {
        const options = {
          click: true
        }
        options.pullUpLoad = {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        }
        this.scroll = new BScroll(this.$refs.home, options)
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
