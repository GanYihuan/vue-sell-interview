<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-08-28 09:53:38
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 14:52:07
 -->
<template>
  <div>
    <div
      ref="wrapper"
      class="list"
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
          :ref="key"
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Bscroll from 'better-scroll'

export default {
  name: 'List',
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
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    ...mapMutations({
      setCity: 'SET_CITY'
    }),
    handleCityClick(city) {
      this.setCity(city)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './list.styl';
</style>
