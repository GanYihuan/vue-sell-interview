<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-06 15:43:50
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 04:55:45
 -->
<template>
  <div>
    <router-view />
    <ul class="bottom-bar">
      <router-link
        :class="[home, btnItem]"
        to="/home"
        tab="li"
      >
        <div class="icon" />
        <div class="des">
          首页
        </div>
      </router-link>
      <router-link
        :class="[order, btnItem]"
        to="/order"
        tab="li"
      >
        <div class="icon" />
        <div class="des">
          订单
        </div>
      </router-link>
      <router-link
        :class="[my, btnItem]"
        to="/my"
        tab="li"
      >
        <div class="icon" />
        <div class="des">
          我的
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: 'home',
      my: 'my',
      order: 'order',
      btnItem: 'btn-item'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './navbar.styl'
</style>
