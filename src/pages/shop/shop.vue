<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link
          :to="{name: 'goods', params: {id: params}}"
        >
          点菜
        </router-link>
      </div>
      <div class="tab-item">
        <router-link
          :to="{name: 'ratings', params: {id: params}}"
        >
          评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link
          :to="{name: 'seller', params: {id: params}}"
        >
          商家
        </router-link>
      </div>
    </div>
    <!--
      keep-alive: 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
      当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated
      这两个生命周期钩子函数将会被对应执行
    -->
    <!-- <keep-alive exclude="Detail"> Detail 组件不缓存处理 -->
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import axios from 'axios'

export default {
  name: 'Shop',
  components: {
    VHeader
  },
  data() {
    return {
      seller: {},
      params: ''
    }
  },
  created() {
    this.params = this.$route.params.id
    this.$router.push({
      name: 'goods',
      params: { id: `${this.params}` }
    })
  },
  async mounted() {
    if (this.params === '深圳麦当劳前海二餐厅') {
      const { status, data: { sellers }} = await axios.get('/csellers/getSeller')
      if (status === 200) {
        this.seller = sellers
      }
    }
    if (this.params === '尊宝比萨') {
      const { status, data: { sellers }} = await axios.get('/sellers/getSeller')
      if (status === 200) {
        this.seller = sellers
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './shop.styl'
</style>
