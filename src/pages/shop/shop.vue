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
        <router-link to="/ratings">
          评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
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
      <!-- url match 'seller' will render here -->
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
  async mounted() {
    const { status, data: { sellers }} = await axios.get('/sellers/getSeller')
    if (status === 200) {
      this.seller = sellers
    }
  },
  created() {
    this.params = this.$route.params.id
    // this.$router.push(`/goods/${this.params}`)
    this.$router.push('/seller')
  //   this.$router.push('/goods')
  //   axios
  //     .get('/api/seller')
  //     .then((res) => {
  //       const { status, data } = res.data
  //       if (status === 1) {
  //         this.seller = data
  //       }
  //     }).catch(() => {
  //     })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './shop.styl'
</style>
