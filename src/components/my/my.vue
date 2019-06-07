<template>
  <div class="my">
    <div class="header">
      <div class="icon" />
      <div class="nickname">
        美团小骑手
      </div>
    </div>
    <div class="content">
      <ul class="items">
        <li class="address">
          收货地址管理
        </li>
        <li class="money">
          商家代金券
        </li>
      </ul>
      <ul class="items">
        <li class="email">
          意见反馈
        </li>
        <li class="question">
          常见问题
        </li>
      </ul>
      <p class="tel">
        客服电话:&nbsp;101-097-77
      </p>
      <p class="time">
        服务时间:&nbsp;9:00-23:00
      </p>
    </div>
    <Navbar />
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from '../navbar/navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="stylus" scoped>
@import './my.styl'
</style>
