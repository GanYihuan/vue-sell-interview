<template>
  <div class="bottom">
    <ul class="bottom-bar">
      <router-link
        :class="[my, btnItem]"
        to="/home"
        tab="li"
      >
        <div class="icon" />
        <div>首页</div>
      </router-link>
      <router-link
        :class="[order, btnItem]"
        to="/my"
        tab="li"
      >
        <div class="icon" />
        <div>我的</div>
      </router-link>
      <router-link
        :class="[home, btnItem]"
        to="/shop"
        tab="li"
      >
        <div class="icon" />
        <div>首页</div>
      </router-link>
    </ul>
    <router-view />
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

<style rel="stylesheet/scss" lang="scss">
@import './navbar.scss'
</style>
