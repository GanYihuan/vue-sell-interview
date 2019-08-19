<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-08-28 09:53:38
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 12:53:02
 -->
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

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
@import './header.styl'
</style>
