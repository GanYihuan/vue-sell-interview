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

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      home: 'home',
      my: 'my',
      btnItem: 'btn-item'
    }
  },
  mounted() {
    this.$router.push('/home')
  }
}
</script>

<style lang="stylus" scoped>
@import './navbar.styl'
</style>
