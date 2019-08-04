<template>
  <div class="search-wrapper">
    <div class="search">
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        placeholder="输入城市名或拼音"
      >
    </div>
    <Scroll
      v-show="keyword"
      ref="search"
      class="search-content"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
    >
      <ul>
        <li
          v-for="item of list"
          :key="item.id"
          class="search-item border-bottom"
          @click="handleCityClick(item.name)"
        >
          {{ item.name }}
        </li>
        <li
          v-show="hasNoData"
          class="search-item border-bottom"
        >
          没有找到匹配数据
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import Scroll from 'components/scroll/scroll'

export default {
  name: 'Search',
  components: {
    Scroll
  },
  props: {
    cities: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData() {
      return !this.list.length
    }
  },
  watch: { // listen change to execute, generate value, not recommend to change original value
    keyword() {
      if (!this.keyword) {
        this.list = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => { // Throttling function
        const result = []
        for (const i in this.cities) {
          this.cities[i].forEach(value => {
            if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  created() {
    this.probeType = 3 // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    this.listenScroll = true
    this.click = true
  },
  methods: {
    ...mapMutations({ changeCity: 'SET_CITY' }),
    handleCityClick(city) {
      this.changeCity(city)
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './search.styl';
</style>
