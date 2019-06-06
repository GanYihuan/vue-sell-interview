<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link
          to="/goods"
        >
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
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
import ApiServer from 'api'
import qs from 'query-string'

export default {
  name: 'Shop',
  components: {
    VHeader
  },
  data() {
    return {
      seller: {
        id: qs.parse(location.search.slice(1)).id
      }
    }
  },
  created() {
    this._getSeller()
    this.$router.push('/goods')
  },
  methods: {
    _getSeller() {
      const params = {
        id: this.seller.id
      }
      ApiServer
        .getSeller(params)
        .then(res => { // pass id => seller?id=2
          this.seller = Object.assign({}, this.seller, res)
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../assets/scss/_mixin.scss';
@import '../../assets/scss/app.scss';
</style>
