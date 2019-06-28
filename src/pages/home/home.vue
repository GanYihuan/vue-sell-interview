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
        <svg
          width="16"
          height="16"
          viewBox="0 0 17 17"
          xmlns="http://www.w3.org/2000/svg"
          class="Icon Icon--backToTopArrow"
          aria-hidden="true"
        >
          <g>
            <path
              d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
              fill-rule="evenodd"
            />
          </g>
        </svg>
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
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.click = true
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
        }))
    },
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
