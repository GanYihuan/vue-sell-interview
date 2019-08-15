<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-08-28 09:53:38
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 14:41:59
 -->
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

<script>
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
  watch: { // 监听更改执行，生成值，不建议更改原始值
    keyword() {
      if (!this.keyword) {
        this.list = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => { // 节流功能
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
    this.listenScroll = true // 监听滚动
    this.click = true // 能点击
  },
  methods: {
    ...mapMutations({
      changeCity: 'SET_CITY'
    }),
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
