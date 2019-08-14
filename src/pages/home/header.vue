<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-07 03:16:24
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 05:28:27
 -->
<template>
  <div class="header">
    <div class="search-bar">
      <div class="bar-location">
        <div class="location-icon" />
        <div class="location-text">
          {{ city }}
        </div>
      </div>
      <div
        class="search-btn"
        @click="changeCity"
      >
        <input
          class="place-holder"
          type="text"
          placeholder="搜索"
        >
      </div>
    </div>
    <div class="banner-img" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState({
      city: state => state.city
    })
  },
  methods: {
    changeCity() {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './header.styl'
</style>
