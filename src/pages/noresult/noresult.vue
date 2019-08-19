<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-07 18:38:40
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 15:10:23
 -->
<template>
  <div class="no-result">
    <div
      class="no-result-icon"
      @click="toMy"
    />
    <p class="no-result-text">
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Error: 404'
    }
  },
  methods: {
    toMy() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './noresult.styl'
</style>
