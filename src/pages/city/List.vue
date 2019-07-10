<template>
  <div>
    <Scroll
      ref="wrapper"
      class="list"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
    >
      <div>
        <div class="area">
          <div class="title border-topbottom">
            当前城市
          </div>
          <div class="button-list current">
            <div class="button-wrapper">
              <div class="button">
                {{ city }}
              </div>
            </div>
          </div>
        </div>
        <div class="area">
          <div class="title border-topbottom">
            热门城市
          </div>
          <div class="button-list">
            <div
              v-for="item of hot"
              :key="item.id"
              class="button-wrapper"
              @click="handleCityClick(item.name)"
            >
              <div class="button">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="(item, key) of cities"
          :key="key"
          class="area cities"
        >
          <div class="title border-topbottom">
            {{ key }}
          </div>
          <div class="item-list">
            <div
              v-for="innerItem of item"
              :key="innerItem.id"
              class="item border-bottom"
              @click="handleCityClick(innerItem.name)"
            >
              {{ innerItem.name }}
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import Scroll from 'components/scroll/scroll'

export default {
  name: 'List',
  components: {
    Scroll
  },
  props: {
    hot: {
      type: Array,
      default() {
        return []
      }
    },
    cities: {
      type: Object,
      default() {
        return {}
      }
    },
    letter: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    ...mapState({
      city: state => state.city
    })
  },
  // watch: {
  //   letter() {
  //     if (this.letter) {
  //       const element = this.$refs[this.letter][0]
  //       this.scroll.scrollToElement(element)
  //     }
  //   }
  // },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.click = true
  },
  methods: {
    ...mapMutations({ setCity: 'SET_CITY' }),
    handleCityClick(city) {
      this.setCity(city)
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './List.styl';
</style>
