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
        @click="gotCity"
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

<script type="text/ecmascript-6">
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState({
      city: state => state.city
    })
  },
  methods: {
    gotCity() {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './header.styl'
</style>
