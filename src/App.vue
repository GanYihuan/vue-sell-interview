<template>
  <div id="app">
    <v-header :seller="seller" />
    <keep-alive>
      <!-- url match 'seller' will render here -->
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
// import { getSeller } from 'api'
import ApiServer from 'api'

export default {
  components: {
    VHeader
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      const params = {
        id: this.seller.id
      }
      ApiServer.getSeller(params)
        .then(res => { // pass id => seller?id=2
          this.seller = Object.assign({}, this.seller, res)
        })
        .catch(err => { console.log(err) })
    }
    // _getSeller() {
    //   getSeller().then((seller) => {
    //     this.seller = seller
    //   })
    // }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import './assets/scss/_mixin.scss';
@import './assets/scss/app.scss';
</style>
