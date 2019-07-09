<template>
  <div class="header">
    城市选择
    <router-link to="/home">
      <div class="iconfont header-back">
        <i class="icon-arrow_lift" />
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
@import './Header.styl';
</style>
